import apiService from '../services/api.service';

class Location {
    constructor(service) {
        this.service = service;
        this.countries = null;
        this.cities = null;
        this.shortCitiesList = null;
        this.lastSearch = null;
    }

    createShortCitiesList() {
        return Object.keys(this.cities).reduce((acc, city) => {
            acc[city] = null;
            return acc;
        }, {});
    }

    serializeCities() {
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

    getCityNameByCityCode(code) {
        return Object.values(this.cities).find((city) => city.code === code).name_translations.en;
    }

    serializeAirlines() {
        this.airlines = Object.values(this.airlines).reduce((acc, airline) => {
            acc[airline.code] = airline.name_translations.en;
            return acc;
        }, {});
    }

    async init() {
        try {
            const response = await Promise.all([
                this.service.cities(),
                this.service.countries(),
                this.service.airlines(),
            ]);
            const [cities, countries, airlines] = response;
            this.cities = cities;
            this.countries = countries;
            this.airlines = airlines;

            this.serializeCities();
            this.serializeAirlines();

            this.shortCitiesList = this.createShortCitiesList();
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async fetchTickets(params) {
        const res = await this.service.prices(params);
        this.lastParams = params;
        this.lastSearch = res.data;
    }
}

const location = new Location(apiService);

export default location;