import PopupWithForm from './PopupWithForm.js';

export default class PopupWithConfirm extends PopupWithForm {
    setSubmitHandler(action) {
        this._formSubmitHandler = action;
    }
}