import { TicketsUI } from './tickets';

class FavoritesUI extends TicketsUI {
    init(storage) {
        this.tickets = storage.favorites;
        super.clearContainer();

        this.tickets.forEach((ticket) => {
            const html = TicketsUI.ticketTemplate(ticket);
            this.container.insertAdjacentHTML('afterbegin', html);
        });
    }
}

const favoritesUI = new FavoritesUI('.favorites-list__list');

export default favoritesUI;