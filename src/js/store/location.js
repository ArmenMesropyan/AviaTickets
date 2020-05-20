import apiService from '../services/api.service';

class Location {
    constructor(service) {
        this.service = service;
        this.countries = null;
        this.cities = null;
        this.shortCitiesList = null;
    }

    createShortCitiesList() {
        // {City name, country name: null, ...}
        return Object.keys(this.cities).reduce((acc, city) => {
            acc[city] = null;
            return acc;
        }, {});
    }

    serializeCities() {
        // {City name, country name: {...}}
        this.cities = Object.values(this.cities).reduce((acc, city) => {
            const cityName = city.name_translations.en;
            const countryName = this.getCountryByCityCode(city.country_code).name_translations.en;
            const key = `${cityName}, ${countryName}`;

            acc[key] = city;
            return acc;
        }, {});
    }

    getCityCodeByName(name) {
        return this.cities[name].code;
    }

    getCountryByCityCode(code) {
        return this.countries.find((country) => country.code === code);
    }

    async init() {
        try {
            const response = await Promise.all([
                this.service.cities(),
                this.service.countries(),
            ]);
            const [cities, countries] = response;
            this.cities = cities;
            this.countries = countries;

            this.serializeCities();

            this.shortCitiesList = this.createShortCitiesList();
            console.log(this.shortCitiesList);
            return response;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }

    async fetchTickets(params) {
        const res = await this.api.prices(params);
        console.log('res: ', res);
    }
}

const location = new Location(apiService);

export default location;