import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

const host = process.env.VITE_HOST || 'localhost';
const port = Number.parseInt(process.env.VITE_PORT || '5173', 10);

export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            '@styles': path.resolve(__dirname, 'src/styles'),
        },
    },
    server: {
        host,
        hmr: {
            protocol: 'ws',
            host,
        },
        port,
        strictPort: true,
        watch: {
            usePolling: false
        }
    },
    css: {
        modules: {
            localsConvention: 'camelCase',
            generateScopedName: '[local]_[hash:base64:3]',
        },
        preprocessorOptions: {
            scss: {},
        },
    }
});
