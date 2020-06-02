import '../img/logo.svg';
import './plugins';
import '../css/main.css';
import currencyUI from './views/currecny';
import location from './store/location';
import formUI from './views/form';
import ticketsUI from './views/tickets';

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
}

async function initApp() {
    await location.init();
    formUI.setAutocompleteData(location.shortCitiesList);
}

document.addEventListener('DOMContentLoaded', () => {
    initApp();

    // Events
    formUI.form.addEventListener('submit', (e) => {
        e.preventDefault();
        onFormSubmit();
    });
});