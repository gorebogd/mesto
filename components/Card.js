export default class Card {
    constructor({ data, cardSelector, handleCardClick }) {
        this._cardTitle = data.name;
        this._cardImage = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.cards__card')
            .cloneNode(true);
        return cardElement;
    }

    _toggleLikeButton() {
        this.classList.toggle('cards__like-button_active');
    }

    _deleteCard() {
        this.closest('.cards__card').remove();
    }

    _setEventListeners = () => {
        this._card.querySelector('.cards__like-button').addEventListener('click', this._toggleLikeButton);
        this._card.querySelector('.cards__delete-button').addEventListener('click', this._deleteCard);
        this._card.querySelector('.cards__image').addEventListener('click', () => {
            this._handleCardClick(this._cardTitle, this._cardImage);
        });
    }

    createCard = () => {
        this._card = this._getTemplate();
        const cardImage = this._card.querySelector('.cards__image');
        this._card.querySelector('.cards__title').textContent = this._cardTitle;
        cardImage.src = this._cardImage;
        cardImage.alt = this._cardTitle;
        this._setEventListeners();
        return this._card;
    }

}