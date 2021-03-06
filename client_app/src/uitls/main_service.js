
import Http from '../helpers/http';

class MainService extends Http {
    constructor(props) {
        super(props)
    }

    // ================================TimeSheetPage - TimeSheetActivity=============================

    //#region 
    async findAccount(obj) {
        return await this.axios.post(`/account/find`, obj);
    }
    async getChannels(obj) {
        return await this.axios.post(`/channel/getChannels`, obj);
    }
    async getChannelDetail(id) {
        return await this.axios.get(`/channel/detail/${id}`);
    }
    async changeStatus(obj) {
        return await this.axios.post(`/account/changeStatus`, obj);
    }
    async findAccountFriend(obj) {
        return await this.axios.post(`/account/findAccountFriend`, obj);
    }
    async update(obj) {
        return await this.axios.post(`/account/update`, obj);
    }
    async changePassword(obj) {
        return await this.axios.post(`/account/changePassword`, obj);
    }
    async uploadAvatar(obj, data) {
        if (data) {
            return await this.axios.post(`/channel/uploadAvatar`, obj);
        }
        return await this.axios.post(`/account/uploadAvatar`, obj);
    }
    getAvatar(obj) {
        return `${this.basedUrl}account/getAvatar/${obj}`;
    }
}

export default new MainService()