import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._button = this._popup.querySelector('.popup__submit');
        this._buttonDefaultText = this._button.textContent;
    }

    setSubmitHandler(formSubmitHandler) {
        this._handleFormSubmit = formSubmitHandler;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit();
        });
    }
}