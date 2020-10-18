export default class Card {
    constructor({data, handleCardClick, handleDeleteClick, handleLikeClick}, cardSelector) {
        this._likes =data.likes;
        this._id =data._id;
        this._name =data.name;
        this._link =data.link;
        this._ownerId =data.owner._id;
        this._userId = data.currentUserId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }

    _updateLikes() {
        this._element.querySelector('.cards__like-count').textContent = this._likes.length;

        if (this.isLiked()) this._element.querySelector('.cards__like-button')
            .classList.add('cards__like-button_active');
        else this._element.querySelector('.card__like-button')
            .classList.remove('cards__like-button_active');
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.cards__card')
            .cloneNode(true);

        return cardElement;
    }

    createCard() {
        this._card = this._getTemplate();
        const cardImage = this._card.querySelector('.cards__image');
        // this._cardImage = this._card.querySelector('.cards__image');
        this._cardCaption = this._card.querySelector('.cards__title');
        this._cardLikes = this._card.querySelector('.cards__like-count');
        this._cardCaption.textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._updateLikes();
        this._setEventListeners();
        if (!(this._userId === this._ownerId)) {
            this._card.querySelector('.cards__delete-button').classList.add('cards__delete-button_hidden')
        }

        return this._card;
    }

    isLiked() {
        return Boolean(this._likes.find(item => item._id === this._userId));
    }

    getId() {
        return this._cardId;
    }

    setLikesOnCounter(data) {
        this._likes = data.likes;
        this._updateLikes();
    }

    _renderLike() {
        this._card
            .querySelector('.cards__like-button')
            .classList
            .toggle('cards__like-button_active');
    }

    _setEventListeners() {
        this._card.querySelector('.cards__image').addEventListener('click', () => {
            this._handleCardClick(this._link, this._name, this._alt);
        });

        this._card.querySelector('.cards__like-button').addEventListener('click', () => {
            this._handleLikeClick(this._id, this._isLiked);
        });

        this._card.querySelector('.cards__delete-button').addEventListener('click', () => {
            this._handleDeleteClick(this._id);
        });
    }

    removeCard() {
        this._card.remove();
        this._card = null;
    }

    setLike() {
        this._renderLike();

        if (this._isLiked) {
            this._cardLikes.textContent = Number(this._cardLikes.textContent) - 1;
        } else {
            this._cardLikes.textContent = Number(this._cardLikes.textContent) + 1;
        }
        this._isLiked = !this._isLiked;
    }
}