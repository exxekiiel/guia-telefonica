import { useState, useEffect, useCallback } from 'react'
import SearchBar from './components/SearchBar'
import FloorFilter from './components/FloorFilter'
import ContactList from './components/ContactList'
import AdminPanel from './components/AdminPanel'
import DarkModeToggle from './components/DarkModeToggle'

const API_URL = 'http://localhost:3001/api'

function App() {
  const [contacts, setContacts] = useState([])
  const [floors, setFloors] = useState([])
  const [selectedFloor, setSelectedFloor] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true'
    }
    return false
  })

  // Efecto para modo oscuro
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedFloor) params.append('piso', selectedFloor)
      if (search) params.append('search', search)

      const res = await fetch(`${API_URL}/contactos?${params}`)
      const data = await res.json()
      setContacts(data)
    } catch (error) {
      console.error('Error al cargar contactos:', error)
    } finally {
      setLoading(false)
    }
  }, [selectedFloor, search])

  const fetchFloors = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/contactos/pisos`)
      const data = await res.json()
      setFloors(data)
    } catch (error) {
      console.error('Error al cargar pisos:', error)
    }
  }, [])

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  useEffect(() => {
    fetchFloors()
  }, [fetchFloors])

  const handleLogin = async (password) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      const data = await res.json()
      if (data.success) {
        setIsAdmin(true)
      } else {
        alert('Contraseña incorrecta')
      }
    } catch (error) {
      alert('Error al conectar con el servidor')
    }
  }

  const handleLogout = () => {
    setIsAdmin(false)
  }

  const handleAdd = async (contacto) => {
    try {
      const res = await fetch(`${API_URL}/contactos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contacto)
      })
      if (res.ok) {
        fetchContacts()
        fetchFloors()
      }
    } catch (error) {
      console.error('Error al agregar:', error)
    }
  }

  const handleEdit = async (id, contacto) => {
    try {
      const res = await fetch(`${API_URL}/contactos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contacto)
      })
      if (res.ok) {
        fetchContacts()
        fetchFloors()
      }
    } catch (error) {
      console.error('Error al editar:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este contacto?')) return
    try {
      const res = await fetch(`${API_URL}/contactos/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        fetchContacts()
        fetchFloors()
      }
    } catch (error) {
      console.error('Error al eliminar:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-gradient-to-r from-manzana to-turquesa dark:from-manzana-dark dark:from-turquesa-dark shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Logo Municipalidad"
                className="h-12 w-auto sm:h-14 object-contain drop-shadow-md"
              />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Guía Telefónica</h1>
                
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
              <AdminPanel
                isAdmin={isAdmin}
                onLogin={handleLogin}
                onLogout={handleLogout}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Buscador y filtros */}
        <div className="space-y-4 mb-8">
          <SearchBar search={search} setSearch={setSearch} />
          <FloorFilter
            floors={floors}
            selectedFloor={selectedFloor}
            setSelectedFloor={setSelectedFloor}
          />
        </div>

        {/* Resultados */}
        <ContactList
          contacts={contacts}
          loading={loading}
          isAdmin={isAdmin}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Guía Telefónica Municipal — {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  )
}

export default App
