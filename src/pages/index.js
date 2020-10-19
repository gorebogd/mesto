import "./index.css";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editAvatar = document.querySelector(".profile__avatar-container");
const nameInput = document.querySelector(".popup__input-text_type_name");
const jobInput = document.querySelector(".popup__input-text_type_job");
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

let userId = null;

const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__description",
    avatarSelector: '.profile__avatar'
});

const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

const popupWithConfirm = new PopupWithConfirm({
    popupSelector: ".popup_type_confirm",
    formSubmitHandler: () => {
    }
});
popupWithConfirm.setEventListeners();


const addCard = (cardData) => {
    const card = new Card({
        data: cardData,

        handleCardClick: (name, link) => {
            popupWithImage.open(link, name);
        },

        handleDeleteClick: (card) => {
            popupWithConfirm.setSubmitHandler(() => {
                popupWithConfirm.renderLoading(true);
                api
                    .removeCard(card.getId())
                    .then(() => {
                        card.removeCard();
                        popupWithConfirm.close();
                    })
                    .catch(err => console.log(err))
                    .finally(() => popupWithConfirm.renderLoading(false));

            });
            popupWithConfirm.open();
        },

        handleLikeClick: (card) => {
            api.toggleLike(card.getId(), !card.isLiked())
                .then(data => {
                    card.setLikesOnCounter({...data});
                })
                .catch(err => console.log(err))

        }
    }, userId, '.cards-template')

    cardList.addItem(card.createCard());
};

const cardList = new Section(".cards__grid");

const editProfilePopup = new PopupWithForm({
    popupSelector: ".popup_type_edit-profile",
    formSubmitHandler: (data) => {
        editProfilePopup.renderLoading(true);
        api.setUserInfo({
            name: data.name,
            about: data.job
        })
            .then((res) => {
                userInfo.setUserInfo(res.name, res.about)
                editProfilePopup.close();
            })
            .catch(err => console.log(err))
            .finally(() => editProfilePopup.renderLoading(false));
    }
});

editProfilePopup.setEventListeners();
editButton.addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    nameInput.value = currentUserInfo.name;
    jobInput.value = currentUserInfo.job;
    editProfilePopup.open();
    editFormValidator.checkFormState();
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

const addCardPopup = new PopupWithForm({
    popupSelector: ".popup_type_add-card",
    formSubmitHandler: (data) => {
        addCardPopup.renderLoading(true);
        api.addCard(data)
            .then((res) => {
                addCard(res);
                addCardPopup.close();
            })
            .catch(err => console.log(err))
            .finally(() => addCardPopup.renderLoading(false));
    }
});

addCardPopup.setEventListeners();
addButton.addEventListener("click", () => {
    addCardPopup.open();
    addCardFormValidator.checkFormState();
});

const editAvatarPopup = new PopupWithForm({
    popupSelector: ".popup_type_update-avatar",
    formSubmitHandler: (data) => {
        editAvatarPopup.renderLoading(true);
        api.setUserAvatar(data)
            .then((res) => {
                userInfo.setAvatar = res.avatar;
                editAvatarPopup.close();
            })
            .catch(err => console.log(err))
            .finally(() => {
                editAvatarPopup.renderLoading(false);
            })
    },
});
editAvatarPopup.setEventListeners();
editAvatar.addEventListener("click", () => {
    avatarFormValidator.checkFormState();
    editAvatarPopup.open();
});

const editAvatarForm = document
    .querySelector(".popup_type_update-avatar")
    .querySelector(".popup__form");
const avatarFormValidator = new FormValidator(validationParams, editAvatarForm);
avatarFormValidator.enableValidation();


Promise.all([api.getCards(), api.getUserInfo()])
    .then(([cards, userData]) => {
        userId = userData._id;
        userInfo.setUserInfo(userData.name, userData.about);
        userInfo.setAvatar(userData.avatar);
        cardList.renderItems({
            items: cards,
            renderer: (data) => {
                addCard(data);
            }
        })
    })
    .catch(err => console.log(err));
