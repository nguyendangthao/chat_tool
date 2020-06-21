
import Http from '../helpers/http';

class AuthService extends Http {
    constructor(props) {
        super(props)
    }

    // ================================TimeSheetPage - TimeSheetActivity=============================

    //#region 
    async login(obj) {
        return await this.axios.post(`/auth/login`, obj);
    }
    async create(obj) {
        return await this.axios.post(`/account/create`, obj);
    }
    async forgetPassword(obj) {
        return await this.axios.post(`/account/forgetPassword`, obj);
    }

    // //#region  Category
    // async getByIdCategory(id) {
    //     return await this.axios.get('/api/Category/GetById', id);
    // }
    // async getAllCategory() {
    //     return await this.axios.get('/api/Category/GetAll');
    // }

    // //#endregion 
    // //#region  customer
    // async addCustomer(data) {
    //     return await this.axios.post(`/api/Customer/Create`, data);
    // }

    // async editCustomer(data) {
    //     return await this.axios.put('/api/Customer/Edit', data);
    // }



}

export default new AuthService()