import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Mi Lista de Deseos Navideña';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 'bold', color: 'white', marginBottom: 20 }}>
          🎄 Mi Lista de Deseos
        </div>
        <div style={{ fontSize: 48, color: '#10b981', fontWeight: 'bold' }}>
          Navideña
        </div>
        <div style={{ fontSize: 32, color: 'rgba(255,255,255,0.8)', marginTop: 40 }}>
          Comparte con familia y amigos
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
