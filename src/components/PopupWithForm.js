import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({popupSelector, formSubmitHandler, setFormInputs}) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._setFormInputs = setFormInputs;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input-text '));
        this._button = this._popup.querySelector('.popup__submit');
        this._buttonDefaultText = this._button.textContent;

    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach(input => this._inputValues[input.name] = input.value);

        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._formSubmitHandler(this._getInputValues());
        });
    }

    open() {
        if (this._setFormInputs) {
            this._setFormInputs(this._form);
        }
        super.open();
    }

    close() {
        this._form.reset();
        super.close();
    }

    renderLoading(isSending) {
        this._button.textContent = isSending ? 'Сохранение...' : this._buttonDefaultText;
    }

}