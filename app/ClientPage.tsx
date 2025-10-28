'use client'

import { useState, useEffect } from 'react'
import { Wish } from '@/lib/supabase'
import { createWish, toggleWish, deleteWish } from './actions'
import HeaderNavidad from '@/components/HeaderNavidad'
import Footer from '@/components/Footer'
import WishForm from '@/components/WishForm'
import WishList from '@/components/WishList'
import SnowEffect from '@/components/SnowEffect'
import UserModal from '@/components/UserModal'
import Toast from '@/components/Toast'
import Stats from '@/components/Stats'
import ExportButton from '@/components/ExportButton'
import UserFilter from '@/components/UserFilter'

interface ClientPageProps {
  initialWishes: Wish[]
}

export default function ClientPage({ initialWishes }: ClientPageProps) {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes)
  const [nombreUsuario, setNombreUsuario] = useState<string>('')
  const [showUserModal, setShowUserModal] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)
  const [selectedUser, setSelectedUser] = useState('Todos')
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    const savedName = localStorage.getItem('navidad_user')
    if (savedName) {
      setNombreUsuario(savedName)
    } else {
      setShowUserModal(true)
    }
  }, [])

  useEffect(() => {
    setWishes(initialWishes)
  }, [initialWishes])

  const handleSetUser = (nombre: string) => {
    setNombreUsuario(nombre)
    localStorage.setItem('navidad_user', nombre)
    setShowUserModal(false)
  }

  const handleCreateWish = async (deseo: string, prioridad: 1 | 2 | 3) => {
    try {
      await createWish(nombreUsuario, deseo, prioridad)
      setToast({ message: '🎁 Deseo agregado con éxito', type: 'success' })
    } catch (error) {
      setToast({ message: '❌ Error al agregar deseo', type: 'error' })
    }
  }

  const handleToggleWish = async (id: string, cumplido: boolean) => {
    try {
      await toggleWish(id, cumplido)
      setToast({ message: cumplido ? '✅ Deseo cumplido' : '⏳ Marcado como pendiente', type: 'success' })
    } catch (error) {
      setToast({ message: '❌ Error al actualizar', type: 'error' })
    }
  }

  const handleDeleteWish = async (id: string) => {
    try {
      await deleteWish(id)
      setToast({ message: '🗑️ Deseo eliminado', type: 'success' })
    } catch (error) {
      setToast({ message: '❌ Error al eliminar', type: 'error' })
    }
  }

  const handleChangeUser = () => {
    setShowUserModal(true)
  }

  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    setToast({ message: '🔗 Enlace copiado al portapapeles', type: 'success' })
  }

  const handleExport = () => {
    setToast({ message: '📋 Lista copiada al portapapeles', type: 'success' })
  }

  const filteredWishes = selectedUser === 'Todos' 
    ? wishes 
    : wishes.filter(w => w.nombre_usuario === selectedUser)

  return (
    <>
      <SnowEffect />
      
      {showUserModal && <UserModal onSetUser={handleSetUser} />}

      <main className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <HeaderNavidad />

          {/* Botones de acción */}
          <div className="flex gap-2 mb-6 justify-center flex-wrap">
            <button
              onClick={handleChangeUser}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm transition-all backdrop-blur-sm"
            >
              👤 Cambiar usuario
            </button>
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-navidad-dorado hover:bg-navidad-dorado/90 text-navidad-oscuro font-medium rounded-lg text-sm transition-all"
            >
              🔗 Compartir lista
            </button>
            <ExportButton wishes={wishes} onExport={handleExport} />
            <button
              onClick={() => setShowStats(!showStats)}
              className="px-4 py-2 bg-navidad-rojo hover:bg-navidad-rojo/90 text-white rounded-lg text-sm transition-all font-medium"
            >
              📊 {showStats ? 'Ocultar' : 'Ver'} estadísticas
            </button>
          </div>

          {/* Estadísticas */}
          {showStats && <Stats wishes={wishes} />}

          {/* Filtro por usuario */}
          {wishes.length > 0 && (
            <div className="mb-6">
              <UserFilter
                wishes={wishes}
                selectedUser={selectedUser}
                onSelectUser={setSelectedUser}
              />
            </div>
          )}

          {/* Formulario */}
          <div className="mb-8">
            <WishForm
              nombreUsuario={nombreUsuario}
              onSubmit={handleCreateWish}
            />
          </div>

          {/* Lista de deseos */}
          <WishList
            wishes={filteredWishes}
            currentUser={nombreUsuario}
            onToggle={handleToggleWish}
            onDelete={handleDeleteWish}
          />

          <Footer />
        </div>
      </main>

      {/* Toast notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}
