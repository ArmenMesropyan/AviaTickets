import currencyUI from './currecny';
import formatDate from '../helpers/date';

class TicketsUI {
    constructor() {
        this.tickets = null;
        this.container = document.querySelector('.tickets-list__list');
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
    }) {
        return `
            <li class="tickets-list__item tickets-item box">
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
                            <div class="tickets-item__favorites-btn button">
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
        this.tickets = this.serializeTickets(this.location.lastSearch);
        this.clearContainer();

        this.tickets.forEach((ticket) => {
            const html = TicketsUI.ticketTemplate(ticket);
            this.container.insertAdjacentHTML('afterbegin', html);
        });
    }

    clearContainer() {
        this.container.innerHTML = '';
    }

    serializeTickets(tickets) {
        const res = [];
        this.params = this.location.lastParams;

        Object.entries(tickets).forEach(([key, value]) => {
            Object.values(value).forEach((ticket) => {
                const origin = this.location.getCityNameByCityCode(this.params.origin);
                const destination = this.location.getCityNameByCityCode(this.params.destination || key);
                const airlineName = this.location.airlines[ticket.airline];
                res.push({
                    origin,
                    destination,
                    airlineName,
                    airline: ticket.airline,
                    priceSymbol: currencyUI.currencySymbol,
                    departure: formatDate(ticket.departure_at),
                    returnDate: formatDate(ticket.return_at),
                    price: ticket.price,
                    flight: ticket.flight_number,
                });
            });
        });

        return res;
    }
}

const ticketsUI = new TicketsUI();

export default ticketsUI;