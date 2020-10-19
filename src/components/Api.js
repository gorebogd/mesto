export default class Api {
    constructor({address, token, groupId}) {
        this._token = token;
        this._groupId = groupId;
        this._address = address;
    }

    getResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfo() {
        return fetch(`${this._address}/${this._groupId}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
            .then(this.getResponse)
    }

    setUserInfo({ name, about }) {
        return fetch(`${this._address}/${this._groupId}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                about
        })
    })
            .then(this.getResponse)
    }

    setUserAvatar({avatar}) {
        return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar
            })
        })
            .then(this.getResponse);
    }

    getCards() {
        return fetch(`${this._address}/${this._groupId}/cards`, {
            headers: {
                authorization: this._token
            }
        })
            .then(this.getResponse)
    }

    addCard(data) {
        return fetch(`${this._address}/${this._groupId}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.place,
                link: data.image
            })
        })
            .then(this.getResponse)
    }

    removeCard(cardId) {
        return fetch(`${this._address}/${this._groupId}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
            .then(this.getResponse)
    }

    toggleLike(cardID, like) {
        return fetch(`${this._address}/${this._groupId}/cards/likes/${cardID}`, {
          method: like ? 'PUT' : 'DELETE',
          headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
          }
        })
          .then(this.getResponse)
      }
 }

