'use client'

import { useState, useEffect } from 'react'
import { Wish } from '@/lib/supabase'
import { createWish, toggleWish, deleteWish } from './actions'
import HeaderNavidad from '@/components/HeaderNavidad'
import Footer from '@/components/Footer'
import WishForm from '@/components/WishForm'
import WishList from '@/components/WishList'
import BackgroundFX from '@/components/ui/BackgroundFX'
import UserModal from '@/components/UserModal'
import { Toast } from '@/components/ui/Toast'
import Stats from '@/components/Stats'
import ExportButton from '@/components/ExportButton'
import UserFilter from '@/components/UserFilter'
import { Button } from '@/components/ui/Button'

interface ClientPageProps {
  initialWishes: Wish[]
}

export default function ClientPage({ initialWishes }: ClientPageProps) {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes)
  const [nombreUsuario, setNombreUsuario] = useState<string>('')
  const [showUserModal, setShowUserModal] = useState(false)
  const [toast, setToast] = useState<{ message: string; variant: 'success' | 'error' | 'info' | 'warning' } | null>(null)
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
      setToast({ message: 'Deseo agregado con éxito', variant: 'success' })
    } catch (error) {
      setToast({ message: 'Error al agregar deseo', variant: 'error' })
    }
  }

  const handleToggleWish = async (id: string, cumplido: boolean) => {
    try {
      await toggleWish(id, cumplido)
      setToast({ message: cumplido ? 'Deseo cumplido' : 'Marcado como pendiente', variant: 'success' })
    } catch (error) {
      setToast({ message: 'Error al actualizar', variant: 'error' })
    }
  }

  const handleDeleteWish = async (id: string) => {
    try {
      await deleteWish(id)
      setToast({ message: 'Deseo eliminado', variant: 'success' })
    } catch (error) {
      setToast({ message: 'Error al eliminar', variant: 'error' })
    }
  }

  const handleChangeUser = () => {
    setShowUserModal(true)
  }

  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    setToast({ message: 'Enlace copiado al portapapeles', variant: 'success' })
  }

  const handleExport = () => {
    setToast({ message: 'Lista copiada al portapapeles', variant: 'success' })
  }

  const filteredWishes = selectedUser === 'Todos' 
    ? wishes 
    : wishes.filter(w => w.nombre_usuario === selectedUser)

  return (
    <>
      <BackgroundFX />
      
      {showUserModal && <UserModal onSetUser={handleSetUser} />}

      <main className="min-h-screen p-4 md:p-8 lg:p-12">
        <div className="max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto space-y-8 md:space-y-12">
          <HeaderNavidad />

          {/* Botones de acción */}
          <div className="flex gap-2 md:gap-3 mb-8 justify-center flex-wrap">
            <Button
              onClick={handleChangeUser}
              variant="outline"
              size="sm"
            >
              👤 Cambiar usuario
            </Button>
            <Button
              onClick={handleShare}
              variant="secondary"
              size="sm"
            >
              🔗 Compartir
            </Button>
            <ExportButton wishes={wishes} onExport={handleExport} />
            <Button
              onClick={() => setShowStats(!showStats)}
              variant="ghost"
              size="sm"
            >
              📊 Estadísticas
            </Button>
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
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}
