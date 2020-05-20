import { api } from '../plugins';

class ApiService {
    constructor(inquiry) {
        this.api = inquiry;
    }

    async countries() {
        try {
            const response = await this.api.get('/countries');
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }

    async cities() {
        try {
            const response = await this.api.get('/cities');
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }

    async prices(params) {
        try {
            const response = await this.api.get('/prices/cheap', {
                params,
            });

            return response.data;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
}

const apiService = new ApiService(api);

export default apiService;