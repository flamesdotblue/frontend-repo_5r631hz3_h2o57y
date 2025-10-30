import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function App() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [showFavorites, setShowFavorites] = useState(false)
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')

  const fetchContacts = async (params = {}) => {
    try {
      const url = new URL(`${API_BASE}/contacts`)
      if (params.q) url.searchParams.set('q', params.q)
      if (params.favorite !== undefined) url.searchParams.set('favorite', params.favorite)
      const res = await fetch(url)
      const data = await res.json()
      setContacts(data)
    } catch (e) {
      setError('Failed to load contacts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts({})
  }, [])

  const handleSearch = (q) => {
    setQuery(q)
    fetchContacts({ q, favorite: showFavorites })
  }

  const handleToggleFavorites = (val) => {
    setShowFavorites(val)
    fetchContacts({ q: query, favorite: val })
  }

  const addContact = async (payload) => {
    setError('')
    try {
      const res = await fetch(`${API_BASE}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Create failed')
      const created = await res.json()
      setContacts((list) => [created, ...list])
    } catch (e) {
      setError('Could not add contact')
    }
  }

  const updateContact = async (id, payload) => {
    setError('')
    try {
      const res = await fetch(`${API_BASE}/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Update failed')
      const updated = await res.json()
      setContacts((list) => list.map((c) => (c.id === id ? updated : c)))
    } catch (e) {
      setError('Could not update contact')
    }
  }

  const deleteContact = async (contact) => {
    if (!confirm(`Delete ${contact.name}?`)) return
    setError('')
    try {
      const res = await fetch(`${API_BASE}/contacts/${contact.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setContacts((list) => list.filter((c) => c.id !== contact.id))
    } catch (e) {
      setError('Could not delete contact')
    }
  }

  const onSubmitForm = (data) => {
    if (editing) {
      updateContact(editing.id, data)
      setEditing(null)
    } else {
      addContact(data)
    }
  }

  const toggleFavorite = (contact) => {
    updateContact(contact.id, { favorite: !contact.favorite })
  }

  const sortedContacts = useMemo(() => {
    return [...contacts].sort((a, b) => Number(b.favorite) - Number(a.favorite) || a.name.localeCompare(b.name))
  }, [contacts])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <Header onSearch={handleSearch} showFavorites={showFavorites} onToggleFavorites={handleToggleFavorites} />

        <ContactForm onSubmit={onSubmitForm} editing={editing} onCancel={() => setEditing(null)} />

        {error && (
          <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
        )}

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <ContactList
            contacts={sortedContacts}
            onDelete={deleteContact}
            onEdit={setEditing}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </div>
    </div>
  )
}
