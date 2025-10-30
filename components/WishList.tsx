"use client";

import { Wish } from "@/lib/supabase";
import WishItem from "./WishItem";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { WishSkeleton } from "@/components/ui/Skeleton";
import { User } from "@/lib/types/database";
import { Search, Gift, Clock, CheckCircle, TreePine, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

interface WishListProps {
  readonly wishes: Wish[];
  readonly currentUser: string;
  readonly onToggle: (id: string, cumplido: boolean) => Promise<void>;
  readonly onDelete: (id: string) => Promise<void>;
  readonly isLoading?: boolean;
  readonly user?: User | null;
}

const ITEMS_PER_PAGE = 10;

export default function WishList({ wishes, currentUser, onToggle, onDelete, isLoading = false, user }: WishListProps) {
  const [filtro, setFiltro] = useState<"todos" | "pendientes" | "cumplidos">("todos");
  const [busqueda, setBusqueda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.ceil(wishesFiltrados.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentWishes = wishesFiltrados.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll al inicio de la lista de deseos
    const wishListElement = document.querySelector('[data-wishlist-start]');
    if (wishListElement) {
      wishListElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFilterChange = (newFiltro: "todos" | "pendientes" | "cumplidos") => {
    setFiltro(newFiltro);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setBusqueda(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="space-y-4">
        <Input
          value={busqueda}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Buscar por deseo o persona..."
          leftIcon={<Search className="w-4 h-4" />}
        />

        <div className="grid grid-cols-3 gap-2">
          <Button onClick={() => handleFilterChange("todos")} variant={filtro === "todos" ? "primary" : "outline"} size="md" className="flex-col sm:flex-row gap-1 sm:gap-1.5">
            <Gift className="w-4 h-4" />
            <span className="text-xs sm:text-sm">Todos</span>
          </Button>
          <Button
            onClick={() => handleFilterChange("pendientes")}
            variant={filtro === "pendientes" ? "primary" : "outline"}
            size="md"
            className="flex-col sm:flex-row gap-1 sm:gap-1.5"
          >
            <Clock className="w-4 h-4" />
            <span className="text-xs sm:text-sm">Pendientes</span>
          </Button>
          <Button
            onClick={() => handleFilterChange("cumplidos")}
            variant={filtro === "cumplidos" ? "primary" : "outline"}
            size="md"
            className="flex-col sm:flex-row gap-1 sm:gap-1.5"
          >
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs sm:text-sm">Cumplidos</span>
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
          <>
            <div className="space-y-3">
              {currentWishes.map((wish) => (
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

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="md"
                  className="min-w-[44px]"
                  aria-label="Página anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          variant={currentPage === page ? "primary" : "outline"}
                          size="md"
                          className="min-w-[44px]"
                        >
                          {page}
                        </Button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className="flex items-center px-2 text-white/50">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="md"
                  className="min-w-[44px]"
                  aria-label="Página siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        );
      })()}

      <p className="text-center text-sm text-white/60">
        Mostrando {startIndex + 1}-{Math.min(endIndex, wishesFiltrados.length)} de {wishesFiltrados.length} deseos
        {wishesFiltrados.length !== wishes.length && ` (${wishes.length} total)`}
      </p>
    </div>
  );
}
