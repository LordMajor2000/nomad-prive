import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Nomad Privé — Private Travel Curation'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        background: '#080808',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px',
        position: 'relative',
      }}>
        {/* Gold horizontal line */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #C9A96E, #E8D5AC, #C9A96E, transparent)',
          display: 'flex',
        }} />

        {/* Eyebrow */}
        <div style={{
          fontSize: '14px',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'rgba(201,169,110,0.7)',
          marginBottom: '24px',
          display: 'flex',
        }}>
          Private Travel Curation
        </div>

        {/* Brand name */}
        <div style={{
          fontSize: '96px',
          fontWeight: 700,
          color: '#F5F0E8',
          lineHeight: 1,
          marginBottom: '8px',
          display: 'flex',
        }}>
          NOMAD
        </div>
        <div style={{
          fontSize: '96px',
          fontWeight: 700,
          fontStyle: 'italic',
          color: '#C9A96E',
          lineHeight: 1,
          marginBottom: '48px',
          display: 'flex',
        }}>
          PRIVÉ
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: '24px',
          color: 'rgba(245,240,232,0.5)',
          fontStyle: 'italic',
          display: 'flex',
        }}>
          Every journey is a masterpiece.
        </div>

        {/* Corner coords */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          right: '80px',
          fontSize: '12px',
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.15)',
          display: 'flex',
        }}>
          47°N · 19°E · Est. 2024
        </div>
      </div>
    ),
    { ...size }
  )
}
