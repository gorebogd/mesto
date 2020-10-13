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

    setUserInfo(data) {
        return fetch(`${this._address}/${this._groupId}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data[`name`],
                about: data[`job`]
            })
        })
            .then(this.getResponse)
    }

    setUserAvatar({avatar}) {
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

    addCard({name, link}) {
        return fetch(`${this._address}/${this._groupId}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(this.getResponse)
    }

    addCard({name, link}) {
        return fetch(`${this._address}/${this._groupId}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(this.getResponse)
    }
}