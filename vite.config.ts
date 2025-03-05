import  { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/

const ReactCompilerConfig = {
  version: 19
}

export default defineConfig({
  plugins: [react({
        babel: {
          plugins: [
            ["babel-plugin-react-compiler", ReactCompilerConfig],
          ],
        },
      }), tailwindcss()],
  build: {
    minify: true,
    rollupOptions: {
      input: ["./index.html"],
      
    },
    
  }
} satisfies UserConfig)
