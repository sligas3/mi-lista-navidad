'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Users, Copy, Check, Share2 } from 'lucide-react';

interface FamilyCodeCardProps {
  familyCode: string;
}

export function FamilyCodeCard({ familyCode }: FamilyCodeCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(familyCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const text = `¡Únete a mi lista de deseos navideños! 🎄\n\nCódigo de familia: ${familyCode}\n\n1. Regístrate en la app\n2. Ingresa este código cuando te lo pida\n3. ¡Comparte tus deseos!`;
    
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (err) {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 space-y-4">
      <div className="flex items-center gap-3">
        <Users className="w-6 h-6 text-emerald-400" />
        <div>
          <h3 className="text-lg font-semibold text-white">Código de Familia</h3>
          <p className="text-sm text-white/70">Comparte con tu familia</p>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <p className="text-2xl font-mono font-bold text-center text-emerald-400 tracking-wider">
          {familyCode}
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleCopy}
          variant="secondary"
          size="md"
          className="flex-1"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copiado
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copiar
            </>
          )}
        </Button>
        <Button
          onClick={handleShare}
          variant="primary"
          size="md"
          className="flex-1"
        >
          <Share2 className="w-4 h-4" />
          Compartir
        </Button>
      </div>

      <p className="text-xs text-white/60 text-center">
        Solo los miembros con este código verán tus deseos
      </p>
    </div>
  );
}
