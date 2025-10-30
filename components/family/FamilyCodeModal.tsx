'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BaseModal } from '@/components/ui/BaseModal';
import { AnimatedTabs } from '@/components/ui/AnimatedTabs';
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
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setShouldAnimate(window.matchMedia('(prefers-reduced-motion: no-preference)').matches);
  }, []);

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

  const handleTabChange = (newMode: string) => {
    setMode(newMode as 'create' | 'join');
    setCode('');
    setError(null);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Configura tu Familia" icon={Users}>
      <p className="text-white/70 text-sm text-center mb-4 sm:mb-6">
        Comparte deseos solo con tu familia
      </p>

      <AnimatedTabs
        tabs={[
          { id: 'create', label: 'Crear Familia' },
          { id: 'join', label: 'Unirse' },
        ]}
        value={mode}
        onChange={handleTabChange}
      >
        <div className="space-y-4">
            {mode === 'create' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="family-code">Código de Familia</Label>
                  <div className="flex gap-2">
                    <Input
                      id="family-code"
                      value={code}
                      readOnly
                      placeholder="Genera un código"
                      className="flex-1"
                      tabIndex={-1}
                    />
                    {code && (
                      <Button
                        onClick={handleCopy}
                        variant="ghost"
                        size="md"
                        className="min-w-[44px] px-3"
                        aria-label={copied ? 'Código copiado' : 'Copiar código'}
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
                  leftIcon={<RefreshCw className="w-5 h-5" />}
                >
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
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="join-code">Código de Familia</Label>
                  <Input
                    id="join-code"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="Ej: ABC12345"
                    maxLength={8}
                    autoFocus
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
              </>
            )}

            {error && (
              <motion.div
                {...(shouldAnimate && {
                  initial: { opacity: 0, y: -10 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -10 },
                  transition: { duration: 0.2 },
                })}
                className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm"
                role="alert"
              >
                {error}
              </motion.div>
            )}
        </div>
      </AnimatedTabs>
    </BaseModal>
  );
}
