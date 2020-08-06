  function showInputError (formElement, inputElement, errorMessage, params) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(params.inputErrorClass);
    errorElement.classList.add(params.errorClass);
    errorElement.textContent = errorMessage;
  }

  function hideInputError (formElement, inputElement, params) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(params.inputErrorClass);
    errorElement.classList.remove(params.errorClass);
    errorElement.textContent = '';
  }

  function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  function toggleButtonState (inputList, buttonElement, params) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(params.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(params.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  function checkInputValidity (formElement, inputElement, params) {
    if (inputElement.validity.valid) {
      hideInputError(formElement, inputElement, params);
    } else {
      showInputError(formElement, inputElement, inputElement.validationMessage, params);
    }
  }

  function setEventListeners (formElement, params) {
    const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
    const submitButton = formElement.querySelector(params.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (event) => {
        checkInputValidity(formElement, inputElement, params);
        toggleButtonState(inputList, submitButton, params);
      });
    });
  }

  function enableValidation (params) {
    const formList = Array.from(document.querySelectorAll(params.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (event) => {
        event.preventDefault();
      });
      setEventListeners(formElement, params);
    });
  }

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input-text',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input-text_type_error',
    errorClass: 'popup__error_active'
});

