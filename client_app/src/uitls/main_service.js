
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


}

export default new MainService()