import ContactItem from './ContactItem'

export default function ContactList({ contacts, onDelete, onEdit, onToggleFavorite }) {
  if (!contacts.length) {
    return (
      <div className="text-center text-gray-500 py-12 border rounded-lg bg-white">
        No contacts yet. Add your first one!
      </div>
    )
  }

  return (
    <div className="grid gap-3">
      {contacts.map((c) => (
        <ContactItem
          key={c.id}
          contact={c}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
