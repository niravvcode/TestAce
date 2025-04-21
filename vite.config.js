import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import withMT from "@material-tailwind/react/utils/withMT";

export default defineConfig({
    server: {
        headers: {
            "Cross-Origin-Opener-Policy": "unsafe-none",
            "Cross-Origin-Embedder-Policy": "unsafe-none",
        },
    },
    plugins: [react(), tailwindcss()],
    css: {
        preprocessorOptions: {
            tailwindcss: {
                config: withMT({
                    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
                    theme: {
                        extend: {
                            fontFamily: {
                                sans: ["Inter", "sans-serif"], // Ensure this is defined
                            },
                            keyframes: {
                                gradient: {
                                    '0%': { backgroundPosition: '0% 50%' },
                                    '50%': { backgroundPosition: '100% 50%' },
                                    '100%': { backgroundPosition: '0% 50%' },
                                },
                            },
                            animation: {
                                gradient: 'gradient 8s linear infinite'
                            },
                        },
                    },
                    plugins: [],
                }),
            },
        },
    },
});