import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  // server: {
  //   proxy: {
  //     // '/api': 'http://localhost:8000/',
  //     '/api': 'https://linktrim-t8s2.onrender.com',
  //   }
  // },
  plugins: [react()],
})
