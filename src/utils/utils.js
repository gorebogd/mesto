
import Card from '../components/Card.js';
import popupWithImage from '../components/PopupWithImage.js';

const addCard = (data, cardSelector) => {
    const card = new Card({
        data: data,
        cardSelector: cardSelector,
        handleCardClick: (name, link) => {
            popupWithImage.open(name, link);
        },
    }).createCard();
    return card;
}
export default addCard;