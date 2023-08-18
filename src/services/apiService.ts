import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5173',
    timeout: 10000,
    headers: {
        'X-Requested-With': 'HMLHttpRequest',
        'X-CMC_PRO_API_KEY': import.meta.env.VITE_API_COIN_MARKET_CAP_API_KEY,
    },
});

export default {
    async get(endpoint, params = {}) {
        try {
            const response = await axiosInstance.get(endpoint, { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

};
