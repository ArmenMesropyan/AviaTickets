class CurrencyUI {
    constructor(selector) {
        this.select = document.querySelector(selector);
        this.currencyLib = {
            euro: '&euro;',
            dollar: '&#36;',
            rub: '&#8381;',
        };
    }

    get currencyValue() {
        return this.select.value;
    }

    get currencySymbol() {
        return this.currencyLib[this.currencyValue];
    }
}

const currencyUI = new CurrencyUI('.course__select');

export default currencyUI;