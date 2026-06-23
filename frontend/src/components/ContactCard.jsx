import { useState } from 'react'

export default function ContactCard({ contacto, isAdmin, onEdit, onDelete }) {
  const [copied, setCopied] = useState(false)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    nombre: contacto.nombre,
    area: contacto.area,
    piso: contacto.piso,
    interno: contacto.interno
  })

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contacto.interno)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const textarea = document.createElement('textarea')
      textarea.value = contacto.interno
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSave = () => {
    onEdit(contacto.id, form)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border-2 border-turquesa dark:border-turquesa-light p-5">
        <div className="space-y-3">
          <input
            type="text"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:border-turquesa focus:outline-none"
            placeholder="Nombre"
            aria-label="Nombre"
          />
          <input
            type="text"
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:border-turquesa focus:outline-none"
            placeholder="Área"
            aria-label="Área"
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={form.piso}
              onChange={(e) => setForm({ ...form, piso: e.target.value })}
              className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:border-turquesa focus:outline-none"
              placeholder="Piso"
              aria-label="Piso"
            />
            <input
              type="text"
              value={form.interno}
              onChange={(e) => setForm({ ...form, interno: e.target.value })}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:border-turquesa focus:outline-none"
              placeholder="Interno"
              aria-label="Interno"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSave}
              className="flex-1 px-3 py-2 bg-manzana text-white rounded-lg text-sm font-medium hover:bg-manzana-dark transition-colors"
            >
              Guardar
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-3 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
              {contacto.nombre}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {contacto.area}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-turquesa/10 text-turquesa-dark dark:text-turquesa-light">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Piso {contacto.piso}
              </span>
            </div>
          </div>

          {/* Interno telefónico */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={handleCopy}
              className={`flex flex-col items-center px-4 py-2 rounded-xl font-bold text-lg transition-all duration-200 ${
                copied
                  ? 'bg-manzana/10 text-manzana-dark dark:text-manzana-light'
                  : 'bg-gradient-to-br from-manzana/10 to-turquesa/10 text-gray-800 dark:text-gray-200 hover:from-manzana/20 hover:to-turquesa/20 active:scale-95'
              }`}
              aria-label={`Copiar interno ${contacto.interno}`}
            >
              <span className="text-xs font-normal text-gray-500 dark:text-gray-400 mb-0.5">Interno</span>
              <span className="tracking-wider">{contacto.interno}</span>
            </button>
            {copied && (
              <span className="text-xs text-manzana-dark dark:text-manzana-light font-medium animate-pulse">
                ¡Copiado!
              </span>
            )}
          </div>
        </div>

        {/* Botones de admin */}
        {isAdmin && (
          <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={() => setEditing(true)}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-turquesa/10 text-turquesa-dark dark:text-turquesa-light rounded-lg text-sm font-medium hover:bg-turquesa/20 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar
            </button>
            <button
              onClick={() => onDelete(contacto.id)}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
