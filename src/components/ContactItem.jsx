import { Star, Trash2, Pencil } from 'lucide-react'

export default function ContactItem({ contact, onDelete, onEdit, onToggleFavorite }) {
  return (
    <div className="flex items-start md:items-center justify-between gap-3 bg-white border rounded-lg p-4 shadow-sm">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold truncate">{contact.name}</h3>
          {contact.company && <span className="text-xs text-gray-500 truncate">• {contact.company}</span>}
        </div>
        <div className="text-sm text-gray-600 truncate">
          {contact.email || 'No email'}{contact.phone ? ` • ${contact.phone}` : ''}
        </div>
        {contact.notes && <div className="text-xs text-gray-500 mt-1 line-clamp-2">{contact.notes}</div>}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => onToggleFavorite(contact)}
          className={`p-2 rounded-md border hover:bg-gray-50 ${contact.favorite ? 'border-yellow-300 bg-yellow-50' : ''}`}
          title={contact.favorite ? 'Unfavorite' : 'Mark favorite'}
        >
          <Star className={`w-4 h-4 ${contact.favorite ? 'fill-yellow-400 text-yellow-500' : 'text-gray-600'}`} />
        </button>
        <button onClick={() => onEdit(contact)} className="p-2 rounded-md border hover:bg-gray-50" title="Edit">
          <Pencil className="w-4 h-4 text-gray-700" />
        </button>
        <button onClick={() => onDelete(contact)} className="p-2 rounded-md border hover:bg-red-50 border-red-200" title="Delete">
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>
  )
}
