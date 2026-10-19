import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        id: '/',
        name: 'BLOODLINK - Smart Blood Donation System',
        short_name: 'BLOODLINK',
        description: 'Toa Damu, Okoa Maisha.',
        theme_color: '#8B0000',
        background_color: '#4A0000',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/bloodlink-icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/bloodlink-icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/bloodlink-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ]
})
