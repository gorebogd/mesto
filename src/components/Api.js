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

    setUserInfo({name, about}) {
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

    setUserAvatar({ avatar }) {
        return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token
            },
            body: JSON.stringify({
                avatar: avatarUrl
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
}