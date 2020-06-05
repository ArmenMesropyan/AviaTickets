class FavoritesStorage {
    constructor() {
        this.favorites = JSON.parse(window.localStorage.getItem('favorites')) || [];
    }

    setStorage(value) {
        this.favorites.push(value);
        window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }

    get favoritesValue() {
        return this.favorites;
    }

    removeFromStorage(elem) {
        const flightNum = Number(elem.dataset.flight);
        const price = Number(elem.dataset.price);

        const localFavorites = JSON.parse(window.localStorage.getItem('favorites'));

        const arr = localFavorites.filter((ticket) => ticket.flight_number !== flightNum && ticket.price !== price);

        this.favorites = arr;
        window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
}

const storage = new FavoritesStorage();

export default storage;