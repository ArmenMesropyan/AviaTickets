import { getAutocompleteInstance } from '../plugins';

class FormUI {
    constructor(id) {
        this.form = document.forms[id];
        this.origin = this.form.elements.origin;
        this.destination = this.form.elements.destination;
        this.depart = this.form.elements.depart;
        this.return = this.form.elements.return;
        this.originAutocomplete = getAutocompleteInstance(this.origin);
        this.destinationAutocomplete = getAutocompleteInstance(this.destination);
    }

    setAutocompleteData(data) {
        this.originAutocomplete.updateData(data);
        this.destinationAutocomplete.updateData(data);
    }

    get originValue() {
        return this.origin.value;
    }

    get destinationValue() {
        return this.destination.value;
    }

    get departValue() {
        return this.depart.value;
    }

    get returnValue() {
        return this.return.value;
    }
}

const formUI = new FormUI('locationControls');

export default formUI;