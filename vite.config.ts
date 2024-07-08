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
        outDir: 'A:/Alone/PROJECTS/GTA5/LAtruckers/server/resources/ServiceCharacter/client',
        rollupOptions: {
            external: ["alt-client", "natives"]
        }
    }
})