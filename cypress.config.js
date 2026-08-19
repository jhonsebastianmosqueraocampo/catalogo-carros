import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5181',
    supportFile: false,
    viewportWidth: 1280,
    viewportHeight: 800,
  },
})
