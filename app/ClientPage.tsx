'use client'

import { useState, useEffect } from 'react'
import { Wish } from '@/lib/supabase'
import { User } from '@/lib/types/database'
import { createWish, toggleWish, deleteWish } from './actions'
import HeaderNavidad from '@/components/HeaderNavidad'
import Footer from '@/components/Footer'
import WishForm from '@/components/WishForm'
import WishList from '@/components/WishList'
import BackgroundFX from '@/components/ui/BackgroundFX'
import SnowEffect from '@/components/SnowEffect'
import { ProfileModal } from '@/components/ProfileModal'
import { Toast } from '@/components/ui/Toast'
import { updateProfile } from './actions/auth'
import Stats from '@/components/Stats'
import ExportButton from '@/components/ExportButton'
import UserFilter from '@/components/UserFilter'
import { Button } from '@/components/ui/Button'
import { Gift, CheckCircle, Clock, Link as LinkIcon, BarChart3, PartyPopper, Plus, X } from 'lucide-react'

interface ClientPageProps {
  initialWishes: Wish[]
  user: User | null
}

export default function ClientPage({ initialWishes, user }: ClientPageProps) {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [toast, setToast] = useState<{ message: string; variant: 'success' | 'error' | 'info' | 'warning' } | null>(null)
  const [selectedUser, setSelectedUser] = useState('Todos')
  const [showStats, setShowStats] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (user && !user.display_name) {
      setShowProfileModal(true)
    }
  }, [user])

  useEffect(() => {
    setWishes(initialWishes)
  }, [initialWishes])

  const handleSaveProfile = async (displayName: string) => {
    try {
      await updateProfile({ display_name: displayName })
      setToast({ message: '¡Perfil actualizado!', variant: 'success' })
      window.location.reload()
    } catch (error) {
      throw error
    }
  }

  const handleCreateWish = async (deseo: string, prioridad: 1 | 2 | 3) => {
    if (!user) return
    try {
      await createWish(user.display_name || user.email || 'Usuario', deseo, prioridad)
      setToast({ message: '¡Deseo agregado con éxito!', variant: 'success' })
      window.location.reload()
    } catch (error) {
      setToast({ message: 'No se pudo agregar el deseo. Inténtalo de nuevo.', variant: 'error' })
    }
  }

  const handleToggleWish = async (id: string, cumplido: boolean) => {
    try {
      await toggleWish(id, cumplido)
      setToast({ message: cumplido ? '¡Deseo cumplido!' : 'Marcado como pendiente', variant: 'success' })
      window.location.reload()
    } catch (error) {
      setToast({ message: 'No se pudo actualizar el deseo.', variant: 'error' })
    }
  }

  const handleDeleteWish = async (id: string) => {
    try {
      await deleteWish(id)
      setToast({ message: 'Deseo eliminado correctamente', variant: 'success' })
      window.location.reload()
    } catch (error) {
      setToast({ message: 'No se pudo eliminar el deseo.', variant: 'error' })
    }
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
      <SnowEffect />
      
      {showProfileModal && user && (
        <ProfileModal
          user={user}
          onSave={handleSaveProfile}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      <main className="min-h-screen px-4 py-6 sm:px-6 md:px-8 md:py-8 lg:py-12">
        <div className="container mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-3xl space-y-6 md:space-y-8">
          <HeaderNavidad />

          {/* Acciones */}
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={handleShare}
              variant="secondary"
              size="md"
              className="min-h-[44px] py-3 px-4 text-[16px]"
            >
              <LinkIcon className="w-4 h-4 mr-1.5" />
              Compartir
            </Button>
            <ExportButton wishes={wishes} onExport={handleExport} />
            <Button
              onClick={() => setShowStats(!showStats)}
              variant="ghost"
              size="md"
              className="min-h-[44px] py-3 px-4 text-[16px]"
            >
              <BarChart3 className="w-4 h-4 mr-1.5" />
              Estadísticas
            </Button>
          </div>

          {/* Estadísticas */}
          {showStats && <Stats wishes={wishes} />}

          {/* Filtro por usuario */}
          {wishes.length > 0 && (
            <UserFilter
              wishes={wishes}
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
            />
          )}

          {/* Lista de deseos */}
          <WishList
            wishes={filteredWishes}
            currentUser={user?.display_name || user?.email || ''}
            onToggle={handleToggleWish}
            onDelete={handleDeleteWish}
            user={user}
          />

          {/* Botón para agregar deseo */}
          {user && (
            <div className="sticky bottom-6 z-10">
              {!showForm ? (
                <Button
                  onClick={() => setShowForm(true)}
                  variant="primary"
                  size="lg"
                  className="w-full shadow-2xl shadow-green-900/60 text-base font-bold"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Agregar nuevo deseo
                </Button>
              ) : (
                <div className="space-y-3">
                  <Button
                    onClick={() => setShowForm(false)}
                    variant="ghost"
                    size="md"
                    className="w-full"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Cancelar
                  </Button>
                  <WishForm
                    nombreUsuario={user?.display_name || user?.email || ''}
                    onSubmit={handleCreateWish}
                    user={user}
                  />
                </div>
              )}
            </div>
          )}

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
