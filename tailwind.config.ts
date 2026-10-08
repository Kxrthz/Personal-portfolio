import type { Config } from "tailwindcss";
const config: Config = { content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"], theme: { extend: { colors: { ink: "var(--color-bg)", amber: "var(--color-accent)" } } }, plugins: [] };
export default config;
