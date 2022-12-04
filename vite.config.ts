import { defineConfig } from "vite"
import * as path from "path"

export default defineConfig({
    // plugins: [ react() ],
    resolve: {
        alias: {
            "#components": path.resolve(__dirname, "./src/components"),
            "#pages": path.resolve(__dirname, "./src/pages"),
            "#stores": path.resolve(__dirname, "./src/stores")
        }
    }
})
