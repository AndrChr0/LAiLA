import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    define: {
        "import.meta.env.VITE_API_PATH": JSON.stringify(process.env.API_PATH),
        "import.meta.env.VITE_API_PORT": JSON.stringify(process.env.API_PORT)
    }
});
