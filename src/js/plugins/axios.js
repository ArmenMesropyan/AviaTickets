import axios from 'axios';
import API_ENV from '../config/api.config';

class ApiFactory {
    constructor() {
        this.mainUrl = API_ENV.url;
        this.pricesUrl = API_ENV.pricesUrl;
        this.create = (url) => axios.create({
            baseURL: url,
            headers: {
                'x-rapidapi-host': 'travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com',
                'x-rapidapi-key': '043636d527msh750d7a80217c0cfp111b9ajsn5049c46db6b1',
                'x-access-token': API_ENV.token,
            },
        });
    }

    main(url) {
        return this.create(this.mainUrl).get(url);
    }

    prices(url) {
        return this.create(this.pricesUrl).get(url);
    }
}

const api = new ApiFactory();

export default api;