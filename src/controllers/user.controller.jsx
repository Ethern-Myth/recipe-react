import axios from "axios";
import logger from "@lib/logger";
import api_config from "@config/api";

const user = {
    all: async ({ queryKey }) => {
        try {
            const { id } = queryKey[1];
            const res = await axios.get(`${api_config}/api/recipe/user/${id}`);
            const data = res.data;
            return data;
        } catch (error) {
            logger(error);
        }
    }
}

export default user;