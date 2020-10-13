import "./index.css";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {initialCards} from "../scripts/initial-сards.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editAvatar = document.querySelector(".profile__image");
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

const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__description",
});

const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

const editProfilePopup = new PopupWithForm({
    popupSelector: ".popup_type_edit-profile",
    formSubmitHandler: (data) => {
        api.setUserInfo(data)
        .then(res => {
            userInfo.setUserInfo(res.name, res.about);
        })
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
        api.addCard(data)
        .then((res) => {
          cardList.addItem(createCard(res));
          addCardPopup.close();
        })
        .catch(err => console.log(`Ошибка добавление карточки: ${err}`))
        // .finally(() => addCardPopup.renderLoading(false))
    }
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
        userInfo.setUserInfo(
            data.name,
            data.about,
        );
        editAvatar.src = data.avatar;

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

    const editAvatarPopup = new PopupWithForm ({
        popupSelector: ".popup_type_update-avatar",
        formSubmitHandler: (data) => {
            api.setUserAvatar(data)
            .then(res => {
                editAvatar.src = res.avatar;
                editAvatarPopup.close()
            });
        }
    })
    editAvatarPopup.setEventListeners()
    editAvatar.addEventListener('click', () => {
        avatarFormValidator.checkFormState();
        editAvatarPopup.open();
    })

    const editAvatarForm = document
    .querySelector(".popup_type_update-avatar")
    .querySelector(".popup__form");
const avatarFormValidator = new FormValidator(validationParams, editAvatarForm);
avatarFormValidator.enableValidation();