import { api } from '../plugins';

class ApiService {
    constructor(inquiry) {
        this.api = inquiry;
    }

    async countries() {
        try {
            const response = await this.api.main('/countries');
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async cities() {
        try {
            const response = await this.api.main('/cities');
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async airlines() {
        try {
            const response = await this.api.main('/airlines');
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async prices({
        currency,
        origin,
        depart_date = '-',
        return_date = '-',
        destination = '-',
    } = {}) {
        try {
            const response = await this.api.prices(`/prices/cheap?currency=${currency}&origin=${origin}&depart_date=${depart_date}&return_date=${return_date}&destination=${destination}`);
            // const response = await this.api.prices('/prices/cheap', {
            //     params,
            // });
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

const apiService = new ApiService(api);

export default apiService;