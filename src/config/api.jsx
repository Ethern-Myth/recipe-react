const api_config =
	process.env.NODE_ENV === "development"
		? import.meta.env.VITE_API_URL_DEV
		: import.meta.env.VITE_API_URL_PROD;

export default api_config;
