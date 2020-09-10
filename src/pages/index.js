import './index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from '../scripts/initial-сards.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const validationParams = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input-text',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input-text_type_error',
    errorClass: 'popup__error_active'
}

const cardList = new Section({
    data: initialCards,
    renderer: (item) => {
        const card = new Card({
            data: item,
            cardSelector: '.cards-template',
            handleCardClick: (name, link) => {
                popupWithImage.open(name, link)
            }
        }).createCard();
        cardList.setItem(card);
    }
}, '.cards__grid')

cardList.renderItems();


const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    jobSelector: '.profile__description'
    }
  );


const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const editProfilePopup = new PopupWithForm ({
    popupSelector: '.popup_type_edit-profile',
    formSubmitHandler: (data) => {
    userInfo.setUserInfo(data);
    editProfilePopup.close();
  },
    setFormInputs: formElement => {
    formElement.name.value = userInfo.getUserInfo().name;
    formElement.job.value = userInfo.getUserInfo().job;
  }
});

editProfilePopup.setEventListeners();
editButton.addEventListener('click', () => {
    editProfilePopup.open();

});

const addCardPopup = new PopupWithForm({
    popupSelector: '.popup_type_add-card',
    formSubmitHandler: (data) => {
        const newData = {
            name: data[`place`],
            link: data[`image`]
        }

        const card = new Card({
            data: newData,
            cardSelector: '.cards-template',
            handleCardClick: (name, link) => {
                popupWithImage.open(name, link)
            }
        }).createCard();
        cardList.setItem(card);
        addCardPopup.close();
    }
})

addCardPopup.setEventListeners();
addButton.addEventListener('click', () => {
    addCardPopup.open()
})

const addPopupForm = document.querySelector('.popup_type_add-card').querySelector('.popup__form');
const addCardFormValidator = new FormValidator(validationParams, addPopupForm);
addCardFormValidator.enableValidation();

const editPopupForm = document.querySelector('.popup_type_edit-profile').querySelector('.popup__form');
const editFormValidator = new FormValidator(validationParams, editPopupForm);
editFormValidator.enableValidation();


