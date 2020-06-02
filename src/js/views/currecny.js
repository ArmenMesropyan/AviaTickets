class CurrencyUI {
    constructor(selector) {
        this.select = document.querySelector(selector);
        this.currencyLib = {
            EUR: '&euro;',
            USD: '&#36;',
            RUB: '&#8381;',
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