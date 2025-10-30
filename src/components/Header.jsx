import { useState } from 'react'
import { Search, Star } from 'lucide-react'

export default function Header({ onSearch, showFavorites, onToggleFavorites }) {
  const [term, setTerm] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch(term)
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <h1 className="text-2xl font-bold tracking-tight">Contacts</h1>
      <form onSubmit={submit} className="flex items-center gap-2 w-full md:w-auto">
        <div className="flex items-center gap-2 bg-white border rounded-md px-3 py-2 w-full md:w-80 shadow-sm">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search name, email, company"
            className="w-full outline-none text-sm"
          />
        </div>
        <button
          type="submit"
          className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          Search
        </button>
        <button
          type="button"
          onClick={() => { onToggleFavorites(!showFavorites) }}
          className={`px-3 py-2 rounded-md border text-sm font-medium flex items-center gap-1 transition ${showFavorites ? 'bg-yellow-50 border-yellow-300 text-yellow-800' : 'bg-white hover:bg-gray-50'}`}
          title="Show favorites only"
        >
          <Star className={`w-4 h-4 ${showFavorites ? 'fill-yellow-400 text-yellow-500' : 'text-gray-500'}`} />
          {showFavorites ? 'Favorites' : 'All'}
        </button>
      </form>
    </div>
  )
}
