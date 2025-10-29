"use client";

import { Wish } from "@/lib/supabase";
import WishItem from "./WishItem";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { WishSkeleton } from "@/components/ui/Skeleton";
import { User } from "@/lib/types/database";
import { Search, Gift, Clock, CheckCircle, TreePine, Sparkles } from "lucide-react";

interface WishListProps {
  readonly wishes: Wish[];
  readonly currentUser: string;
  readonly onToggle: (id: string, cumplido: boolean) => Promise<void>;
  readonly onDelete: (id: string) => Promise<void>;
  readonly isLoading?: boolean;
  readonly user?: User | null;
}

export default function WishList({ wishes, currentUser, onToggle, onDelete, isLoading = false, user }: WishListProps) {
  const [filtro, setFiltro] = useState<"todos" | "pendientes" | "cumplidos">("todos");
  const [busqueda, setBusqueda] = useState("");

  const wishesFiltrados = wishes.filter((wish) => {
    let matchFiltro = false;
    if (filtro === "todos") {
      matchFiltro = true;
    } else if (filtro === "pendientes") {
      matchFiltro = !wish.cumplido;
    } else if (filtro === "cumplidos") {
      matchFiltro = wish.cumplido;
    }

    const matchBusqueda =
      wish.deseo.toLowerCase().includes(busqueda.toLowerCase()) ||
      wish.nombre_usuario.toLowerCase().includes(busqueda.toLowerCase());

    return matchFiltro && matchBusqueda;
  });

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="space-y-4">
        <Input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por deseo o persona..."
          leftIcon={<Search className="w-4 h-4" />}
        />

        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => setFiltro("todos")} variant={filtro === "todos" ? "primary" : "outline"} size="md">
            <Gift className="w-4 h-4 mr-1.5" />
            Todos
          </Button>
          <Button
            onClick={() => setFiltro("pendientes")}
            variant={filtro === "pendientes" ? "primary" : "outline"}
            size="md"
          >
            <Clock className="w-4 h-4 mr-1.5" />
            Pendientes
          </Button>
          <Button
            onClick={() => setFiltro("cumplidos")}
            variant={filtro === "cumplidos" ? "primary" : "outline"}
            size="md"
          >
            <CheckCircle className="w-4 h-4 mr-1.5" />
            Cumplidos
          </Button>
        </div>
      </div>

      {/* Lista */}
      {(() => {
        if (isLoading) {
          return (
            <div className="space-y-3">
              <WishSkeleton />
              <WishSkeleton />
              <WishSkeleton />
            </div>
          );
        }

        if (wishesFiltrados.length === 0) {
          return (
            <div className="text-center py-16 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
              <TreePine className="w-16 h-16 mx-auto mb-4 text-green-400" />
              <h3 className="text-lg font-semibold text-white mb-2">
                {busqueda ? "No se encontraron deseos" : "Aún no hay deseos navideños"}
              </h3>
              <p className="text-white/70">
                {!busqueda && (
                  <span className="inline-flex items-center gap-1.5">
                    ¡Sé el primero en agregar uno!
                    <Sparkles className="w-4 h-4" />
                  </span>
                )}
              </p>
            </div>
          );
        }

        return (
          <div className="space-y-3">
            {wishesFiltrados.map((wish) => (
              <WishItem
                key={wish.id}
                wish={wish}
                currentUser={currentUser}
                onToggle={onToggle}
                onDelete={onDelete}
                user={user}
              />
            ))}
          </div>
        );
      })()}

      <p className="text-center text-sm text-white/60">
        Mostrando {wishesFiltrados.length} de {wishes.length} deseos
      </p>
    </div>
  );
}
