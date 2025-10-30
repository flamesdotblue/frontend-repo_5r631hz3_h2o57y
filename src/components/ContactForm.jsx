import { useState, useEffect } from 'react'

export default function ContactForm({ onSubmit, editing, onCancel }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', notes: '', favorite: false })

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name || '',
        email: editing.email || '',
        phone: editing.phone || '',
        company: editing.company || '',
        notes: editing.notes || '',
        favorite: !!editing.favorite,
      })
    } else {
      setForm({ name: '', email: '', phone: '', company: '', notes: '', favorite: false })
    }
  }, [editing])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    onSubmit(form)
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-lg border shadow-sm p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="col-span-1 md:col-span-2">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded-md px-3 py-2" placeholder="Jane Cooper" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input name="email" value={form.email} onChange={handleChange} type="email" className="w-full border rounded-md px-3 py-2" placeholder="jane@company.com" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded-md px-3 py-2" placeholder="(555) 555-5555" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Company</label>
        <input name="company" value={form.company} onChange={handleChange} className="w-full border rounded-md px-3 py-2" placeholder="Acme Inc." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <input name="notes" value={form.notes} onChange={handleChange} className="w-full border rounded-md px-3 py-2" placeholder="Met at the conference..." />
      </div>
      <div className="flex items-center gap-2">
        <input id="favorite" name="favorite" type="checkbox" checked={form.favorite} onChange={handleChange} />
        <label htmlFor="favorite" className="text-sm">Favorite</label>
      </div>
      <div className="col-span-1 md:col-span-2 flex justify-end gap-2">
        {editing && (
          <button type="button" onClick={onCancel} className="px-3 py-2 rounded-md border hover:bg-gray-50">Cancel</button>
        )}
        <button type="submit" className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
          {editing ? 'Save Changes' : 'Add Contact'}
        </button>
      </div>
    </form>
  )
}
