import axios from "axios";
import logger from "@lib/logger";
import api_config from "@config/api";

const recipe = {
	all: async () => {
		try {
			const res = await axios.get(`${api_config}/api/recipe`);
			const data = res.data;
			return data;
		} catch (error) {
			logger(error);
		}
	},
	byId: async ({ queryKey }) => {
		try {
			const { id } = queryKey[1];
			if (!id) return null;
			const res = await axios.get(`${api_config}/api/recipe/${id}`);
			const data = res.data;
			return data;
		} catch (error) {
			logger(error);
		}
	},
	add: async (form) => {
		try {
			delete form._id;
			const image = form.image;
			delete form.image;
			const newData = { image: image };
			const res_form = await axios.post(`${api_config}/api/recipe`, form);
			const data_form = res_form.data;
			delete form.description;
			delete form.ingredients;
			delete form.instructions;
			delete form.link;
			delete form.userId;

			let formData = new FormData();
			Object.entries(newData).forEach(([key, value]) => {
				formData.append(key, value);
			});
			const res = await axios.put(
				`${api_config}/api/recipe/upload/${data_form._id}`,
				formData,
				{
					transformRequest: () => formData,
				}
			);
			const data = res.data;
			return data;
		} catch (error) {
			logger(error);
		}
	},
	update: async (form) => {
		try {
			const id = form._id;
			delete form._id;
			delete form.image;
			const res = await axios.put(`${api_config}/api/recipe/${id}`, form);
			const data = res.data;
			return data;
		} catch (error) {
			logger(error);
		}
	},
	remove: async (id) => {
		try {
			const res = await axios.delete(`${api_config}/api/recipe/${id}`);
			const data = res.data;
			return data;
		} catch (error) {
			logger(error);
		}
	},
};

export default recipe;
