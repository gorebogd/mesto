import {toggleImagePopup} from './index.js';

const imagePopup = document.querySelector('.popup_type_image');
const image = imagePopup.querySelector('.popup__image');


export default class Card {
    constructor(data, templateSelector) {
        this._cardTitle = data.name;
        this._cardImage = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = this._templateSelector.cloneNode(true);
        return cardElement;
    }

    _toggleLikeButton() {
        this.classList.toggle('cards__like-button_active');
    }

    _deleteCard() {
        this.closest('.cards__card').remove();
    }

    _openCard = () => {
        image.src = this._cardImage;
        image.alt = this._cardTitle;
        imagePopup.querySelector('.popup__description').textContent = this._cardTitle;
        toggleImagePopup();
    }

    _setEventListeners = () => {
        this._card.querySelector('.cards__like-button').addEventListener('click', this._toggleLikeButton);
        this._card.querySelector('.cards__delete-button').addEventListener('click', this._deleteCard);
        this._card.querySelector('.cards__image').addEventListener('click', this._openCard);
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