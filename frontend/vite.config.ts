import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// בפיתוח: הפניית /api לשרת ה-FastAPI (בלי צורך ב-CORS)
export default defineConfig({
  plugins: [react()],
  server: { proxy: { "/api": "http://localhost:4000" } },
});
