import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Si querés que el proxy se use solo en modo "npm run dev"
const isDev = process.env.NODE_ENV !== 'production'

export default defineConfig({
    plugins: [react()],
    server: isDev
        ? {
            proxy: {
                '/api': {
                    target: process.env.VITE_API_URL || 'http://localhost:8080',
                    changeOrigin: true,
                    secure: false,
                },
            },
        }
        : undefined,
})
