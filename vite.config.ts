import {resolve} from "path"
import {defineConfig} from "vite";

export default defineConfig({
    build:{
        lib: {
            entry: resolve(__dirname, "src", "index.ts"),
            name: 'service-character-client',
            fileName: 'index',
            formats: ['es']
        },
        outDir: 'A:/Alone/PROJECTS/GTA5/Project-1114/server/resources/service-character/client',
        rollupOptions: {
            external: ["alt-client", "natives"]
        }
    }
})