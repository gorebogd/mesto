export default class FormValidator {
    constructor(params, formElement) {
        this._formSelector = params.formSelector;
        this._inputSelector = params.inputSelector;
        this._submitButtonSelector = params.submitButtonSelector;
        this._inactiveButtonClass = params.inactiveButtonClass;
        this._inputErrorClass = params.inputErrorClass;
        this._errorClass = params.errorClass;
        this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        this._submitButton = formElement.querySelector(this._submitButtonSelector);
        this._formElement = formElement;
    }

    _setEventListeners = () => {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    }

    _checkInputValidity = (inputElement) => {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
    }

    checkFormState() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState();
    }


    enableValidation = () => {
        this._formElement.addEventListener('submit', () => {
            this.checkFormState();
        });
        this._setEventListeners();
    }

}
