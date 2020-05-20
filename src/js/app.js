import '../img/logo.svg';
import './plugins';
import '../css/main.css';
import currencyUI from './views/currecny';
import location from './store/location';
import formUI from './views/form';

async function onFormSubmit() {
    const origin = location.getCityCodeByName(formUI.originValue);
    console.log('origin: ', origin);
    const destination = location.getCityCodeByName(formUI.destinationValue);
    console.log('destination: ', destination);
    const currecny = currencyUI.currencyValue;
    console.log('currecny: ', currecny);
    // const depart_date = formUI.departValue;
    // const return_date = formUI.returnValue;

    // location.fetchTickets({
    //     origin,
    //     destination,
    //     depart_date,
    //     return_date,
    // });
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