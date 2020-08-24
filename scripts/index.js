import Card from './Card.js';
import FormValidator from './FormValidator.js';

const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const addCardPopup = document.querySelector('.popup_type_add-card');
const imagePopup = document.querySelector('.popup_type_image');

const editButton = document.querySelector('.profile__edit-button');
const editCloseButton = editProfilePopup.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const addCloseButton = addCardPopup.querySelector('.popup__close-button');
const imageCloseButton = imagePopup.querySelector('.popup__close-button');
const addPopupSubmitButton = addCardPopup.querySelector('.popup__submit');
const editPopupSubmitButton = editProfilePopup.querySelector('.popup__submit');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const editPopupForm = editProfilePopup.querySelector('.popup__form');
const addPopupForm = addCardPopup.querySelector('.popup__form');

const inputName = editPopupForm.querySelector('.popup__input-text_type_name');
const inputJob = editPopupForm.querySelector('.popup__input-text_type_job');
const inputPlace = addPopupForm.querySelector('.popup__input-text_type_place');
const inputImage = addPopupForm.querySelector('.popup__input-text_type_url');

function closePopupByEsc(event) {
    if (event.key === 'Escape') {
        document.querySelector('.popup_opened').classList.remove('popup_opened');
        document.removeEventListener('keydown', closePopupByEsc);
    }
}

function closeByOverlay(event) {
    if (event.target.classList.contains('popup_opened')) {
        event.target.classList.remove('popup_opened');
    }
}

function togglePopupEventListener(popup) {
    if (popup.classList.contains('popup_opened')) {
        document.addEventListener('keydown', closePopupByEsc);
        popup.addEventListener('click', closeByOverlay);
    } else {
        popup.removeEventListener('click', closeByOverlay);
    }
}

function togglePopup(popup) {
    popup.classList.toggle('popup_opened');
}

function toggleEditProfilePopup() {
    togglePopup(editProfilePopup);
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    activateSubmitButton();
    togglePopupEventListener(editProfilePopup);
    resetFormInputs(editProfilePopup);
}

function toggleAddCardPopup() {
    togglePopup(addCardPopup);
    addPopupForm.reset();
    togglePopupEventListener(addCardPopup);
    resetFormInputs(addCardPopup);
    addPopupSubmitButton.disabled = true;
    addPopupSubmitButton.classList.add('popup__submit_disabled');
}

export function toggleImagePopup() {
    togglePopup(imagePopup);
    togglePopupEventListener(imagePopup);
}

function submitProfile(event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    togglePopup(editProfilePopup);
}

function submitAddCard(event) {
    event.preventDefault();
    const item = {
        name: inputPlace.value,
        link: inputImage.value
    }
    const newCard = new Card(item, cardsTemplate).createCard();
    cardsList.prepend(newCard);
    togglePopup(addCardPopup);
    addPopupForm.reset();
    addPopupSubmitButton.classList.add('popup__submit_disabled');
    addPopupSubmitButton.disabled = true;
}

editButton.addEventListener('click', toggleEditProfilePopup);
editCloseButton.addEventListener('click', toggleEditProfilePopup);
addButton.addEventListener('click', toggleAddCardPopup);
addCloseButton.addEventListener('click', toggleAddCardPopup);
imageCloseButton.addEventListener('click', toggleImagePopup);
editPopupForm.addEventListener('submit', submitProfile);
addPopupForm.addEventListener('submit', submitAddCard);

const cardsTemplate = document.querySelector('.cards-template').content.querySelector('.cards__card');
const cardsList = document.querySelector('.cards__grid');

initialCards.forEach((data) => {
    const card = new Card (data, cardsTemplate).createCard();
    cardsList.prepend(card);
});

const validationParams = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input-text',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input-text_type_error',
    errorClass: 'popup__error_active'
}

const editFormValidator = new FormValidator(validationParams, editPopupForm);
const addCardFormValidator = new FormValidator(validationParams, addPopupForm);


editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const activateSubmitButton = () => {
    if (inputName.validity.valid && inputJob.validity.valid) {
        editPopupSubmitButton.disabled = false;
        editPopupSubmitButton.classList.remove('popup__submit_disabled');
    }
}

const resetInputError = (inputElement, inputElementError) => {
    inputElement.textContent = '';
    inputElement.classList.remove('popup__input-text_type_error');
    inputElementError.classList.remove('popup__error_active');
}

const resetFormInputs = (popup) => {
    const inputList = Array.from(popup.querySelectorAll('.popup__input-text'));
    inputList.forEach((inputElement) => {
        const inputError = popup.querySelector(`#${inputElement.name}-error`)
        if (inputElement.validity.valid) {
            resetInputError(inputElement, inputError);
        }
    });
    if (popup.classList.contains('popup_type_add-card')) {
        inputList.forEach((inputElement) => {
            const inputError = popup.querySelector(`#${inputElement.name}-error`)
            resetInputError(inputElement, inputError);
        })
    }
}








