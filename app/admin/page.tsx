import { AdminGuard } from '@/components/auth/AdminGuard'
import { getAllUsers } from '@/app/actions/admin'
import { Badge } from '@/components/ui/Badge'

export default async function AdminPage() {
  const users = await getAllUsers()

  return (
    <AdminGuard>
      <main className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold text-white mb-2">
              👑 Panel de Administración
            </h1>
            <p className="text-white/70">
              Gestiona usuarios y permisos
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white/70 uppercase">
                      Usuario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white/70 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white/70 uppercase">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-white/70 uppercase">
                      Registro
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-white/5">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {user.avatar_url ? (
                            <img
                              src={user.avatar_url}
                              alt={user.display_name || ''}
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                              {(user.display_name || user.email || 'U')[0].toUpperCase()}
                            </div>
                          )}
                          <span className="text-white font-medium">
                            {user.display_name || 'Sin nombre'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white/70">
                        {user.email}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={user.role === 'admin' ? 'warning' : 'default'}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-white/70 text-sm">
                        {new Date(user.created_at).toLocaleDateString('es-ES')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-white/50 text-sm mt-4">
            Total: {users.length} usuarios
          </p>
        </div>
      </main>
    </AdminGuard>
  )
}
