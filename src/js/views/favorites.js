import { TicketsUI } from './tickets';

class FavoritesUI extends TicketsUI {
    static emptyTemplate() {
        return `
          <p class="favorites-list__empty">Your favorites list is empty!</p>
        `;
    }

    showEmptyMsg() {
        this.container.insertAdjacentHTML('afterbegin', FavoritesUI.emptyTemplate());
    }

    init(storage) {
        this.storage = storage;
        super.clearContainer();
        if (!this.storage.favorites.length) this.showEmptyMsg();

        this.storage.favorites.forEach((ticket) => {
            const html = TicketsUI.ticketTemplate(ticket, 'favorite-btn');
            this.container.insertAdjacentHTML('afterbegin', html);
        });

        const favoritesBtns = document.querySelectorAll('.tickets-item__favorites-btn');

        favoritesBtns.forEach((btn) => btn.addEventListener('click', (e) => this.onTicketRemove(e)));
    }

    onTicketRemove({ target }) {
        if (!target.classList.contains('favorite-btn')) return;
        const parent = target.closest('.tickets-list__item');
        const [flight, price] = parent.dataset.ticketInfo.split(',');
        const favorite = this.storage.favorites.find((item) => item.price === Number(price) && item.flight === Number(flight));
        this.storage.removeFromStorage(favorite);

        const elements = document.querySelectorAll(`.tickets-list__item[data-ticket-info="${flight.trim()}, ${price.trim()}"]`);

        parent.parentElement.removeChild(parent);

        if (!this.storage.favorites.length) this.showEmptyMsg();

        if (elements.length > 1) {
            const button = elements[0].querySelector('.tickets-item__favorites-btn');
            button.classList.remove('favorite-delete');
            button.innerHTML = 'Add to favorites';
        }
    }
}

const favoritesUI = new FavoritesUI('.favorites-list__list');

export default favoritesUI;