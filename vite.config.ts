import { defineConfig, configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom', //Se le indica a vitest que debe usar globalmente el jsdom
    include: ['src/tests/unit/*'],    
  },
  plugins: [vue()] //Se le indica a vite el uso  de vue
})