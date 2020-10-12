import "./index.css";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "../scripts/initial-сards.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const api = new Api({
  address: "https://mesto.nomoreparties.co/v1",
  groupId: `cohort-16`,
  token: `6b84de2d-b5c7-4b45-ba81-be44fff680e4`,
});

const validationParams = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input-text",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input-text_type_error",
  errorClass: "popup__error_active",
};

// const addCard = (item) => {
//   const card = new Card({
//     data: item,
//     cardSelector: ".cards-template",
//     handleCardClick: (name, link) => {
//       popupWithImage.open(name, link);
//     },
//   }).createCard();
//   cardList.addItem(card);
// };

// const cardList = new Section({
//     data: initialCards,
//     renderer: (data) => {
//         addCard(data);
//     }

// }, '.cards__grid')

// cardList.renderItems();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

const editProfilePopup = new PopupWithForm({
  popupSelector: ".popup_type_edit-profile",
  formSubmitHandler: (data) => {
    userInfo.setUserInfo(data);
    editProfilePopup.close();
  },
  setFormInputs: (formElement) => {
    formElement.name.value = userInfo.getUserInfo().name;
    formElement.job.value = userInfo.getUserInfo().job;
  },
});

editProfilePopup.setEventListeners();
editButton.addEventListener("click", () => {
  editProfilePopup.open();
  editFormValidator.checkFormState();
});

const addCardPopup = new PopupWithForm({
  popupSelector: ".popup_type_add-card",
  formSubmitHandler: (data) => {
    addCard({
      name: data[`place`],
      link: data[`image`],
    });
    addCardPopup.close();
  },
});

addCardPopup.setEventListeners();
addButton.addEventListener("click", () => {
  addCardPopup.open();
  addCardFormValidator.checkFormState();
});

const addPopupForm = document
  .querySelector(".popup_type_add-card")
  .querySelector(".popup__form");
const addCardFormValidator = new FormValidator(validationParams, addPopupForm);
addCardFormValidator.enableValidation();

const editPopupForm = document
  .querySelector(".popup_type_edit-profile")
  .querySelector(".popup__form");
const editFormValidator = new FormValidator(validationParams, editPopupForm);
editFormValidator.enableValidation();

Promise.all([api.getCards(), api.getUserInfo()])
  .then(([cards, data]) => {
    userInfo.setUserInfo({
      name: data.name,
      job: data.about,
    });

    const addCard = (item) => {
      const card = new Card({
        data: item,
        cardSelector: ".cards-template",
        handleCardClick: (name, link) => {
          popupWithImage.open(name, link);
        },
      }).createCard();
      cardList.addItem(card);
    };

    const cardList = new Section(
      {
        data: cards,
        renderer: (data) => {
          addCard(data);
        },
      },
      ".cards__grid"
    );
    cardList.renderItems();
  })
  .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
