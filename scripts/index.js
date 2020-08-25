import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './initial-сards.js';

const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const addCardPopup = document.querySelector('.popup_type_add-card');
const imagePopup = document.querySelector('.popup_type_image');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const editPopupForm = editProfilePopup.querySelector('.popup__form');
const addPopupForm = addCardPopup.querySelector('.popup__form');

const inputName = editPopupForm.querySelector('.popup__input-text_type_name');
const inputJob = editPopupForm.querySelector('.popup__input-text_type_job');
const inputPlace = addPopupForm.querySelector('.popup__input-text_type_place');
const inputImage = addPopupForm.querySelector('.popup__input-text_type_url');

const cardsTemplate = document.querySelector('.cards-template').content.querySelector('.cards__card');
const cardsList = document.querySelector('.cards__grid');

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

function closePopupByEsc(event) {
    if (event.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        if (popup) {
            togglePopup(popup);
        }
    }
}

function togglePopup(popup) {
    popup.classList.toggle('popup_opened');
    if (popup.classList.contains('popup_opened')) {
        document.addEventListener('keydown', closePopupByEsc);
    } else {
        document.removeEventListener('keydown', closePopupByEsc);
    }
}

function toggleEditProfilePopup() {
    togglePopup(editProfilePopup);
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    editFormValidator.formStateCheck();
}

function toggleAddCardPopup() {
    togglePopup(addCardPopup);
    addPopupForm.reset();
    addCardFormValidator.formStateCheck();
 }

export function toggleImagePopup() {
    togglePopup(imagePopup);
}

function submitProfile(event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    togglePopup(editProfilePopup);
}

function renderCard (item, cardsTemplate, list) {
    const card = new Card(item, cardsTemplate).createCard();
    list.prepend(card);
}

function submitAddCard(event) {
    event.preventDefault();
    const item = {
        name: inputPlace.value,
        link: inputImage.value
    }
    renderCard(item, cardsTemplate, cardsList);
    togglePopup(addCardPopup);
}

editButton.addEventListener('click', toggleEditProfilePopup);
addButton.addEventListener('click', toggleAddCardPopup);
editPopupForm.addEventListener('submit', submitProfile);
addPopupForm.addEventListener('submit', submitAddCard);

addCardPopup.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
        togglePopup(addCardPopup);
    }
});

editProfilePopup.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
        togglePopup(editProfilePopup);
    }
});

imagePopup.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
        togglePopup(imagePopup);
    }
});

initialCards.forEach((data) => {
    renderCard(data, cardsTemplate, cardsList);
});

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();












