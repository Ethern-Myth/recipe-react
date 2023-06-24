import axios from "axios";
import logger from "@lib/logger";
import api_config from "@config/api";

const home = {
    login: async (form) => {
        try {
            const res = await axios.post(`${api_config}/api/login`, form, {
                headers: { "Content-Type": "application/json" },
            });
            const data = res.data;
            return data;
        } catch (error) {
            logger(error.response.statusText);
        }
    },
    register: async (form) => {
        try {
            const res = await axios.post(`${api_config}/api/register`, form, {
                headers: { "Content-Type": "application/json" },
            });
            const data = res.data;
            return data;
        } catch (error) {
            logger(error);
        }
    }
};

export default home;