import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    host: true,
    allowedHosts: [
      "d6c4-45-15-43-88.ngrok-free.app", // Ngrok URL'ini buraya ekle
      "localhost", // İsteğe bağlı olarak localhost'u da ekleyebilirsin
    ],
  },
});
