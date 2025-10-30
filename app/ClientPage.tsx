'use client'

import { useState, useEffect, useRef } from 'react'
import { Wish } from '@/lib/supabase'
import { User } from '@/lib/types/database'
import { createWish, toggleWish, deleteWish } from './actions'
import HeaderNavidad from '@/components/HeaderNavidad'
import Footer from '@/components/Footer'
import WishForm, { WishFormRef } from '@/components/WishForm'
import WishList from '@/components/WishList'
import BackgroundFX from '@/components/ui/BackgroundFX'
import SnowEffect from '@/components/SnowEffect'
import { ProfileModal } from '@/components/ProfileModal'
import { FamilyCodeModal } from '@/components/family/FamilyCodeModal'
import { FamilyCodeCard } from '@/components/family/FamilyCodeCard'
import { Toast } from '@/components/ui/Toast'
import { updateProfile } from './actions/auth'
import Stats from '@/components/Stats'
import { WelcomeToast } from '@/components/auth/WelcomeToast'
import ExportButton from '@/components/ExportButton'
import UserFilter from '@/components/UserFilter'
import { Button } from '@/components/ui/Button'
import { Gift, CheckCircle, Clock, Link as LinkIcon, BarChart3, PartyPopper, Plus, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ClientPageProps {
  initialWishes: Wish[]
  user: User | null
}

export default function ClientPage({ initialWishes, user }: ClientPageProps) {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showFamilyModal, setShowFamilyModal] = useState(false)
  const [toast, setToast] = useState<{ message: string; variant: 'success' | 'error' | 'info' | 'warning' } | null>(null)
  const [selectedUser, setSelectedUser] = useState('Todos')
  const [showStats, setShowStats] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const wishFormRef = useRef<WishFormRef>(null)

  useEffect(() => {
    if (user && !user.display_name) {
      setShowProfileModal(true)
    } else if (user && !user.family_code) {
      setShowFamilyModal(true)
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
      <WelcomeToast userName={user?.display_name} />
      
      {showProfileModal && user && (
        <ProfileModal
          user={user}
          onSave={handleSaveProfile}
          onClose={() => setShowProfileModal(false)}
        />
      )}
      
      {showFamilyModal && user && (
        <FamilyCodeModal
          isOpen={showFamilyModal}
          onClose={() => setShowFamilyModal(false)}
          onSuccess={() => {
            setShowFamilyModal(false)
            setToast({ message: '¡Familia configurada!', variant: 'success' })
            window.location.reload()
          }}
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
              size="lg"
              aria-label="Compartir"
              className="min-h-[44px]"
            >
              <LinkIcon className="w-4 h-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Compartir</span>
            </Button>
            <ExportButton wishes={wishes} onExport={handleExport} />
            <Button
              onClick={() => setShowStats(!showStats)}
              variant="ghost"
              size="lg"
              aria-label="Estadísticas"
              className="min-h-[44px] whitespace-nowrap"
            >
              <BarChart3 className="w-4 h-4 mr-1.5" />
              <span>Estadísticas</span>
            </Button>
          </div>

          {/* Código de Familia */}
          {user?.family_code && (
            <FamilyCodeCard familyCode={user.family_code} />
          )}

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

          {/* Formulario colapsable */}
          <AnimatePresence>
            {user && showForm && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="space-y-3"
              >
                <WishForm
                  ref={wishFormRef}
                  nombreUsuario={user?.display_name || user?.email || ''}
                  onSubmit={handleCreateWish}
                  user={user}
                  isVisible={showForm}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón flotante para agregar deseo (FAB) */}
          {user && (
            <div className="fixed-mobile-safe bottom-4 right-4 sm:bottom-6 sm:right-6 z-50" style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
              <button
                onClick={() => {
                  if (!showForm) {
                    setShowForm(true)
                  } else {
                    setShowForm(false)
                  }
                }}
                className={`text-white font-bold px-4 py-3 sm:px-6 sm:py-4 rounded-full shadow-2xl motion-safe:hover:shadow-emerald-500/50 motion-safe:hover:scale-[1.08] motion-safe:active:scale-[0.96] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950 min-h-[52px] min-w-[52px] sm:min-h-[60px] sm:min-w-[60px] flex items-center justify-center gap-1.5 sm:gap-2 group text-touch-safe hover:brightness-110 ${
                  showForm 
                    ? 'bg-rose-600 hover:bg-rose-700 motion-safe:hover:shadow-rose-500/50 focus-visible:ring-rose-400' 
                    : 'bg-emerald-600 hover:bg-emerald-700 focus-visible:ring-emerald-400'
                }`}
                aria-label={showForm ? 'Cerrar formulario' : 'Agregar nuevo deseo'}
                aria-expanded={showForm}
              >
                {showForm ? (
                  <>
                    <X className="w-5 h-5 sm:w-6 sm:h-6 transition-transform motion-safe:group-hover:rotate-90 duration-200" />
                    <span className="hidden sm:inline">Cerrar</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6 transition-transform motion-safe:group-hover:rotate-90 duration-200" />
                    <span className="hidden xs:inline">Agregar</span>
                    <Gift className="w-4 h-4 sm:w-5 sm:h-5 hidden xs:inline" />
                  </>
                )}
              </button>
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
