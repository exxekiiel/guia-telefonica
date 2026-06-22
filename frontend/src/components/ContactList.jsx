import ContactCard from './ContactCard'

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-3">
          <div className="skeleton-shimmer h-5 w-3/4 rounded" />
          <div className="skeleton-shimmer h-4 w-1/2 rounded" />
          <div className="skeleton-shimmer h-5 w-20 rounded-full" />
        </div>
        <div className="skeleton-shimmer h-14 w-20 rounded-xl" />
      </div>
    </div>
  )
}

export default function ContactList({ contacts, loading, isAdmin, onEdit, onDelete }) {
  // Estado vacío
  if (!loading && contacts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          <svg className="w-10 h-10 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
          No se encontraron contactos
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Probá con otro término de búsqueda o seleccioná otro piso.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Contador de resultados */}
      {!loading && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {contacts.length} {contacts.length === 1 ? 'contacto encontrado' : 'contactos encontrados'}
        </p>
      )}

      {/* Grid de contactos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : contacts.map((contacto) => (
              <ContactCard
                key={contacto.id}
                contacto={contacto}
                isAdmin={isAdmin}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
        }
      </div>
    </div>
  )
}
