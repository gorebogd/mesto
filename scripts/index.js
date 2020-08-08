const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const addCardPopup = document.querySelector('.popup_type_add-card');
const imagePopup = document.querySelector('.popup_type_image');

const editButton = document.querySelector('.profile__edit-button');
const editCloseButton = editProfilePopup.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const addCloseButton = addCardPopup.querySelector('.popup__close-button');
const imageCloseButton = imagePopup.querySelector('.popup__close-button');

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

function togglePopup (popup) {
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
    togglePopup(editProfilePopup);
}

function addCardSubmit (event) {
  event.preventDefault();
  renderCard({name: inputPlace.value, link: inputImage.value});
  togglePopup(addCardPopup);
}

editButton.addEventListener('click', () => {
  togglePopup(editProfilePopup);});
editCloseButton.addEventListener('click', () => {
   togglePopup(editProfilePopup);});
addButton.addEventListener('click', () => {
  togglePopup(addCardPopup);});
addCloseButton.addEventListener('click', () => {
  togglePopup(addCardPopup);});
imageCloseButton.addEventListener('click', () => {
  togglePopup(imagePopup);});

editPopupForm.addEventListener('submit', profileSubmit);
addPopupForm.addEventListener('submit', addCardSubmit);


  const cardsTemplate = document.querySelector('.cards-template').content.querySelector('.cards__card');
  const cardsList = document.querySelector('.cards__grid');

  function renderCard(data) {
    cardsList.prepend(createCard(data));

  }

  function createCard (data) {
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

  function popupCloseByEsc(event) {
  if (event.key === 'Escape') {
      document.querySelector('.popup_opened').classList.remove('popup_opened');
  }
}

document.addEventListener('keydown', popupCloseByEsc);

