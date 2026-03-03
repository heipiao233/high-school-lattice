import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({ open: true, filename: 'bundle-report.html' })],
  optimizeDeps: {
    // 强制包含这些深层导入，防止 commonjs 插件介入
    include: [
      '@material/web/select/outlined-select.js',
      '@material/web/select/select-option.js',
      '@material/web/button/outlined-button.js',
      '@material/web/checkbox/checkbox.js',
      '@material/web/divider/divider.js',
      '@material/web/list/list.js',
      '@material/web/list/list-item.js',
      '@lit/react'
    ],
  },
  build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'three-vendor': ['@react-three/fiber'],
            // 'ui-vendor': ['@material/web'],
          },
        },
      },
  },
})
