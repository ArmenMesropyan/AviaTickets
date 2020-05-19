class CurrencyUI {
    constructor(selector) {
        this.select = document.querySelector(selector);
    }

    get currencyValue() {
        return this.select.value;
    }

    get currencySymbol() {
        const currencyLib = {
            euro: '&euro;',
            dollar: '&#36;',
            rub: '&#8381;',
        };

        return currencyLib[this.currencyValue];
    }
}

const currencyUI = new CurrencyUI('.course__select');

export default currencyUI;