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
    }
}

function setPopupEventListener(popup) {
    if (popup.classList.contains('popup_opened')) {
        document.addEventListener('keydown', closePopupByEsc);
    } else {
        document.removeEventListener('keydown', closePopupByEsc);
    }
}

function resetInputError(inputElement, inputElementError) {
    inputElement.textContent = '';
    inputElement.classList.remove('popup__input-text_type_error');
    inputElementError.classList.remove('popup__error_active');
}

function resetFormInputs(popup) {
    const inputList = Array.from(popup.querySelectorAll('.popup__input-text'));
    inputList.forEach((inputElement) => {
        const inputError = popup.querySelector(`#${inputElement.name}-error`)
        if (inputElement.validity.valid) {
            resetInputError(inputElement, inputError)
        }
    });
    if (popup.classList.contains('popup_type_add-card')) {
        inputList.forEach((inputElement) => {
            const inputError = popup.querySelector(`#${inputElement.name}-error`)
            resetInputError(inputElement, inputError)
        })
    }
}

function activateSubmitButton() {
    if (inputName.validity.valid && inputJob.validity.valid) {
        editPopupSubmitButton.disabled = false;
        editPopupSubmitButton.classList.remove('popup__submit_disabled');
    }
}

function togglePopup(popup) {
    popup.classList.toggle('popup_opened');
}

function toggleEditProfilePopup () {
    togglePopup(editProfilePopup);
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    activateSubmitButton();
    setPopupEventListener(editProfilePopup);
    resetFormInputs(editProfilePopup);
}

function toggleAddCardPopup () {
    togglePopup(addCardPopup);
    addPopupForm.reset();
    activateSubmitButton();
    setPopupEventListener(addCardPopup);
    resetFormInputs(addCardPopup);
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

editButton.addEventListener('click', () => {
    toggleEditProfilePopup();
});
editCloseButton.addEventListener('click', () => {
    toggleEditProfilePopup();
});
addButton.addEventListener('click', () => {
    toggleAddCardPopup();
});
addCloseButton.addEventListener('click', () => {
    toggleAddCardPopup();
});
imageCloseButton.addEventListener('click', () => {
    togglePopup(imagePopup);
});

editPopupForm.addEventListener('submit', submitProfile);
addPopupForm.addEventListener('submit', submitAddCard);


const cardsTemplate = document.querySelector('.cards-template').content.querySelector('.cards__card');
const cardsList = document.querySelector('.cards__grid');

function renderCard(data) {
    cardsList.prepend(createCard(data));
}

function createCard(data) {
    const card = cardsTemplate.cloneNode(true);
    const cardTitle = card.querySelector('.cards__title');
    const cardImage = card.querySelector('.cards__image');
    const cardLikeButton = card.querySelector('.cards__like-button');
    const cardDeleteButton = card.querySelector('.cards__delete-button');

    cardTitle.textContent = data.name;
    cardImage.src = data.link;

    cardLikeButton.addEventListener('click', (event) => {
        event.target.classList.toggle('cards__like-button_active');
    });
    cardDeleteButton.addEventListener('click', (event) => {
        event.target.closest('.cards__card').remove();
    });

    cardImage.addEventListener('click', () => {
        imagePopupPicture.src = cardImage.src;
        imagePopupDescription.textContent = cardTitle.textContent;
        togglePopup(imagePopup);
    });
    return card;
}

initialCards.forEach((data) => {
    renderCard(data);
});

function closeByOverlay(event) {
    if (event.target.classList.contains('popup_opened')) {
        event.target.classList.remove('popup_opened');
    }
}

addCardPopup.addEventListener('click', (event) => {
    closeByOverlay(event);
});

imagePopup.addEventListener('click', (event) => {
    closeByOverlay(event);
});

editProfilePopup.addEventListener('click', (event) => {
    closeByOverlay(event);
});









