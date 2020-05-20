import 'materialize-css/dist/js/materialize.min';
import '../../css/materialize.css';

// init Autocomplete

const autocomplete = document.querySelectorAll('.autocomplete');
window.M.Autocomplete.init(autocomplete, {
    limit: 20,
    minLength: 2,
});

// init DatePickers

const datepickers = document.querySelectorAll('.datepicker');
window.M.Datepicker.init(datepickers, {
    yearRange: 2,
    showClearBtn: true,
});

export default function getAutocompleteInstance(elem) {
    const instance = window.M.Autocomplete.getInstance(elem);
    return instance;
}