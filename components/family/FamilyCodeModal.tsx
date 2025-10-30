'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Users, Copy, Check, RefreshCw } from 'lucide-react';
import { generateFamilyCode, updateFamilyCode, verifyFamilyCode } from '@/app/actions/family';

interface FamilyCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function FamilyCodeModal({ isOpen, onClose, onSuccess }: FamilyCodeModalProps) {
  const [mode, setMode] = useState<'create' | 'join'>('create');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerateCode = async () => {
    setLoading(true);
    setError(null);
    try {
      const newCode = await generateFamilyCode();
      setCode(newCode);
    } catch (err) {
      setError('Error al generar código');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFamily = async () => {
    if (!code) {
      setError('Genera un código primero');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      await updateFamilyCode(code);
      onSuccess();
    } catch (err) {
      setError('Error al crear familia');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinFamily = async () => {
    if (!code || code.length < 6) {
      setError('Ingresa un código válido');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const exists = await verifyFamilyCode(code);
      if (!exists) {
        setError('Código no válido. Verifica con tu familia.');
        setLoading(false);
        return;
      }
      
      await updateFamilyCode(code);
      onSuccess();
    } catch (err) {
      setError('Error al unirse a familia');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <Users className="w-12 h-12 text-emerald-400 mx-auto" />
                <h2 className="text-2xl font-bold text-white">Configura tu Familia</h2>
                <p className="text-white/70 text-sm">
                  Comparte deseos solo con tu familia
                </p>
              </div>

              <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
                <button
                  onClick={() => { setMode('create'); setCode(''); setError(null); }}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-colors ${
                    mode === 'create' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Crear Familia
                </button>
                <button
                  onClick={() => { setMode('join'); setCode(''); setError(null); }}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-colors ${
                    mode === 'join' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Unirse
                </button>
              </div>

              {mode === 'create' ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Código de Familia</Label>
                    <div className="flex gap-2">
                      <Input
                        value={code}
                        readOnly
                        placeholder="Genera un código"
                        className="flex-1"
                      />
                      {code && (
                        <Button
                          onClick={handleCopy}
                          variant="ghost"
                          size="md"
                          className="min-w-[44px]"
                        >
                          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </Button>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={handleGenerateCode}
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    <RefreshCw className="w-5 h-5" />
                    Generar Código
                  </Button>

                  {code && (
                    <>
                      <Button
                        onClick={handleCreateFamily}
                        variant="primary"
                        size="lg"
                        className="w-full"
                        disabled={loading}
                        isLoading={loading}
                      >
                        Crear Familia
                      </Button>
                      <p className="text-xs text-white/60 text-center">
                        Comparte este código con tu familia
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Código de Familia</Label>
                    <Input
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      placeholder="Ej: ABC12345"
                      maxLength={8}
                    />
                  </div>

                  <Button
                    onClick={handleJoinFamily}
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={loading || !code}
                    isLoading={loading}
                  >
                    Unirse a Familia
                  </Button>

                  <p className="text-xs text-white/60 text-center">
                    Pide el código a un miembro de tu familia
                  </p>
                </div>
              )}

              {error && (
                <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm">
                  {error}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
