import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg'],
    manifest: {
      name: 'TRACKER',
      short_name: 'Tracker',
      start_url: '.',
      display: 'standalone',
      background_color: '#f7f2ec',
      theme_color: '#7C5E42',
      icons: [
        {
          src: 'icon-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icon-512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })]
}
