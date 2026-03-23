import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        open: true,
        allowedHosts: ['.trycloudflare.com'],
        // Security headers for local dev (mirrors production)
        headers: {
            'Content-Security-Policy': "default-src 'self'; script-src 'self' https://api.groq.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://api.groq.com; font-src 'self' https://cdnjs.cloudflare.com;",
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
            'X-Content-Type-Options': 'nosniff',
            'Referrer-Policy': 'no-referrer-when-downgrade',
            'X-Frame-Options': 'SAMEORIGIN',
            'Permissions-Policy': 'geolocation=(), camera=()'
        }
    }
})
