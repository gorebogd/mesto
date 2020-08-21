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

const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imagePopupDescription = imagePopup.querySelector('.popup__description');

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
    renderCard({name: inputPlace.value, link: inputImage.value});
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

// function createCard(data) {
//     const card = cardsTemplate.cloneNode(true);
//     const cardTitle = card.querySelector('.cards__title');
//     const cardImage = card.querySelector('.cards__image');
//     const cardLikeButton = card.querySelector('.cards__like-button');
//     const cardDeleteButton = card.querySelector('.cards__delete-button');
//
//     cardTitle.textContent = data.name;
//     cardImage.src = data.link;
//     cardImage.alt = data.name;
//
//     cardLikeButton.addEventListener('click', (event) => {
//         event.target.classList.toggle('cards__like-button_active');
//     });
//     cardDeleteButton.addEventListener('click', (event) => {
//         event.target.closest('.cards__card').remove();
//     });
//
//     cardImage.addEventListener('click', () => {
//         imagePopupPicture.src = cardImage.src;
//         imagePopupDescription.textContent = cardTitle.textContent;
//         imagePopupPicture.alt = cardTitle.textContent;
//         toggleImagePopup();
//     });
//     return card;
// }


// function renderCard(data) {
//     cardsList.prepend(createCard(data));
// }

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









