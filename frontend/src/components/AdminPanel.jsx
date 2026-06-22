import { useState } from 'react'

export default function AdminPanel({ isAdmin, onLogin, onLogout, onAdd }) {
  const [showLogin, setShowLogin] = useState(false)
  const [password, setPassword] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [form, setForm] = useState({ nombre: '', area: '', piso: '', interno: '' })

  const handleLogin = (e) => {
    e.preventDefault()
    onLogin(password)
    setPassword('')
    setShowLogin(false)
  }

  const handleAdd = (e) => {
    e.preventDefault()
    if (!form.nombre || !form.area || !form.piso || !form.interno) {
      alert('Todos los campos son obligatorios')
      return
    }
    onAdd({
      nombre: form.nombre,
      area: form.area,
      piso: (form.piso),
      interno: form.interno
    })
    setForm({ nombre: '', area: '', piso: '', interno: '' })
    setShowAddForm(false)
  }

  if (!isAdmin) {
    return (
      <>
        <button
          onClick={() => setShowLogin(!showLogin)}
          className="px-3 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg text-sm font-medium hover:bg-white/30 transition-all active:scale-95"
          aria-label="Acceso administrador"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>

        {/* Modal de login */}
        {showLogin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowLogin(false)}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Acceso Admin</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Contraseña
                  </label>
                  <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-turquesa focus:outline-none"
                    placeholder="Ingresá la contraseña"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-manzana to-turquesa text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Ingresar
                </button>
              </form>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <button
        onClick={onLogout}
        className="px-3 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg text-sm font-medium hover:bg-white/30 transition-all active:scale-95"
        aria-label="Cerrar sesión admin"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>

      {/* Botón flotante para agregar */}
      <button
        onClick={() => setShowAddForm(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-manzana to-turquesa text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
        aria-label="Agregar contacto"
      >
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Modal para agregar contacto */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowAddForm(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Agregar Contacto</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label htmlFor="add-nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                <input
                  id="add-nombre"
                  type="text"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-turquesa focus:outline-none"
                  placeholder="Nombre completo"
                  autoFocus
                />
              </div>
              <div>
                <label htmlFor="add-area" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Área</label>
                <input
                  id="add-area"
                  type="text"
                  value={form.area}
                  onChange={(e) => setForm({ ...form, area: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-turquesa focus:outline-none"
                  placeholder="Departamento o área"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="add-piso" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Piso</label>
                  <input
                    id="add-piso"
                    type="text"
                    value={form.piso}
                    onChange={(e) => setForm({ ...form, piso: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-turquesa focus:outline-none"
                    placeholder="Ej: 3, PB, Entrepiso"
                  />
                </div>
                <div>
                  <label htmlFor="add-interno" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Interno</label>
                  <input
                    id="add-interno"
                    type="text"
                    value={form.interno}
                    onChange={(e) => setForm({ ...form, interno: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-turquesa focus:outline-none"
                    placeholder="Ej: 301"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-manzana to-turquesa text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2.5 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
