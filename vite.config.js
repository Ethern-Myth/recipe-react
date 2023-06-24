import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{
				find: "@components",
				replacement: path.resolve(__dirname, "src/components"),
			},
			{
				find: "@styles",
				replacement: path.resolve(__dirname, "src/styles"),
			},
			{
				find: "@pages",
				replacement: path.resolve(__dirname, "src/pages"),
			},
			{
				find: "@controllers",
				replacement: path.resolve(__dirname, "src/controllers"),
			},
			{
				find: "@middleware",
				replacement: path.resolve(__dirname, "src/middleware"),
			},
			{
				find: "@hooks",
				replacement: path.resolve(__dirname, "src/hooks"),
			},
			{
				find: "@assets",
				replacement: path.resolve(__dirname, "src/assets"),
			},
			{
				find: "@lib",
				replacement: path.resolve(__dirname, "src/lib"),
			},
			{
				find: "@routes",
				replacement: path.resolve(__dirname, "src/routes"),
			},
			{
				find: "@config",
				replacement: path.resolve(__dirname, "src/config"),
			},
		],
	},
});
