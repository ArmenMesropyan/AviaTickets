import '../img/logo.svg';
import './plugins';
import '../css/main.css';
import currencyUI from './views/currecny';
import location from './store/location';
import formUI from './views/form';
import { ticketsUI } from './views/tickets';
import favoritesStorage from './storage/favorites';
import favoritesUI from './views/favorites';


function onFavoritesBtnClick({ target }) {
    target.classList.toggle('favorite-delete');
    const parent = target.closest('.tickets-list__item');
    const [flight, price] = parent.dataset.ticketInfo.split(',');

    const favorite = location.lastSearch.find((item) => item.price === Number(price) && item.flight === Number(flight));
    console.log('favorite: ', favorite);
    const isSimilar = favoritesStorage.favoritesValue.find((item) => item.price === Number(price) && item.flight === Number(flight));

    if (!isSimilar) {
        favoritesStorage.setStorage(favorite);
        target.innerHTML = 'Delete from favorites';
    } else {
        favoritesStorage.removeFromStorage(favorite);
        target.innerHTML = 'Add to favorites';
    }

    favoritesUI.init(favoritesStorage);
}

async function onFormSubmit() {
    const origin = location.getCityCodeByName(formUI.originValue);
    const destination = formUI.destinationValue ? location.getCityCodeByName(formUI.destinationValue) : '';
    const currency = currencyUI.currencyValue;
    const depart_date = formUI.departValue;
    const return_date = formUI.returnValue;

    await location.fetchTickets({
        origin,
        destination,
        depart_date,
        return_date,
        currency,
    });
    ticketsUI.init(location);
    const favoritesBtns = document.querySelectorAll('.tickets-item__favorites-btn');

    favoritesBtns.forEach((btn) => btn.addEventListener('click', (e) => onFavoritesBtnClick(e)));
}

async function initApp() {
    await location.init();
    formUI.setAutocompleteData(location.shortCitiesList);
    favoritesUI.init(favoritesStorage);
}

document.addEventListener('DOMContentLoaded', () => {
    initApp();

    // Events
    formUI.form.addEventListener('submit', (e) => {
        e.preventDefault();
        onFormSubmit();
    });
});