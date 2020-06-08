class TicketsUI {
    constructor(selector) {
        this.tickets = null;
        this.container = document.querySelector(selector);
    }

    static ticketTemplate({
        airline,
        origin,
        destination,
        airlineName,
        departure,
        returnDate,
        flight,
        price,
        priceSymbol,
    }, classes = '') {
        return `
            <li class="tickets-list__item tickets-item box" data-ticket-info="${flight}, ${price}">
                <ul class="tickets-item__list">
                    <li class="tickets-item__airline">
                        <img src="http://pics.avs.io/200/200/${airline}.png" alt="${airlineName}" class="tickets-item__logo">
                        <p class="tickets-item__name">
                            ${airlineName}
                        </p>
                    </li>
                    <li class="tickets-item__way">
                        <p class="tickets-item__origin">
                            <span>
                                <i class="fas fa-plane-departure"></i>
                            </span> ${origin}
                        </p>
                        <p class="tickets-item__destination">
                            <span>
                                <i class="fas fa-plane-arrival"></i>
                            </span> ${destination}
                        </p>
                    </li>
                    <li class="tickets-item__info">
                        <div class="tickets-item__wrap">
                            <p class="tickets-item__depart">
                                Departure date: ${departure}
                            </p>
                            <p class="tickets-item__return">
                                Return date: ${returnDate}
                            </p>
                            <p class="tickets-item__flight">
                                Flight number: ${flight}
                            </p>
                        </div>
                        <div class="tickets-item__wrap">
                            <p class="tickets-item__price btn button is-warning">
                                ${price} ${priceSymbol}
                            </p>
                            <div class="tickets-item__favorites-btn button ${classes}">
                                Add to favorites
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        `;
    }

    init(location) {
        this.location = location;
        this.tickets = this.location.lastSearch;
        this.clearContainer();

        this.tickets.forEach((ticket) => {
            const html = TicketsUI.ticketTemplate(ticket);
            this.container.insertAdjacentHTML('afterbegin', html);
        });
    }

    clearContainer() {
        this.container.innerHTML = '';
    }
}

const ticketsUI = new TicketsUI('.tickets-list__list');

export { ticketsUI, TicketsUI };