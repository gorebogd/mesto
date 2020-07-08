const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const inputName = popupForm.querySelector('.popup__input-text_type_name');
const inputJob = popupForm.querySelector('.popup__input-text_type_job');
const addButton = document.querySelector('.profile__add-button');
const title = popup.querySelector('.popup__title');
const submitButton = popupForm.querySelector('.popup__submit');
const a = 'Ты классная';
const b = 'Да, я такая';

function popupToggle () {
    if (!popup.classList.contains('popup_opened')) {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    }
    popup.classList.toggle('popup_opened');
}

function profileSubmit (event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    popupToggle();
}

function addPopupToggle () {
    popupToggle();
    inputName.parentNode.removeChild(inputName);
    inputJob.parentNode.removeChild(inputJob);
    title.textContent = a;
    submitButton.textContent = b;
}

editButton.addEventListener('click', popupToggle);
closeButton.addEventListener('click', popupToggle);
popupForm.addEventListener('submit', profileSubmit);
addButton.addEventListener('click', addPopupToggle);