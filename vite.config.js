import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        tailwindcss(),
    ],
    build: {
        // Hosting không build — public/build được commit. Giữ file hash cũ để HTML đã cache
        // (trình duyệt/CDN) vẫn tải được asset cũ sau deploy, tránh "bão 404" như vụ 503 bên shop.
        // Dọn file cũ thủ công: `npm run build:prune`.
        emptyOutDir: false,
        manifest: 'manifest.json',
    },
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
