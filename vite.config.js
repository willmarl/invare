import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      port: 3001,
      proxy: {
        // comment static below if not using s3 storage or not using multer at all
        "/static": {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
