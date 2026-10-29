import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        posters: fileURLToPath(new URL('./posters.html', import.meta.url)),
        video: fileURLToPath(new URL('./video.html', import.meta.url)),
        uxUi: fileURLToPath(new URL('./ux-ui.html', import.meta.url)),
      },
    },
  },
});
