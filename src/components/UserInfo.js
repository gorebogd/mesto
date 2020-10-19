export default class UserInfo {
    constructor({nameSelector, jobSelector, avatarSelector}) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {name: this._name.textContent, job: this._job.textContent};
    }

    setUserInfo({name, job, avatar}) {
        if (name) this._name.textContent = name;
        if (job) this._job.textContent = job;
        if (avatar) this._avatar.src = avatar;
    }

    setAvatar(data) {
        this._avatar.src = data;
    }
}