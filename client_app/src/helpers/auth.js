import authService from '../uitls/auth_service';
import storage from './storage';

class Authhelper {

    getTokenbyRefresh() {
        const { miliexp } = this.getExpiredDate();
        return setTimeout(() => {
            const tokenRefresh = storage.getTokenRefresh();
            authService.tokenRefresh({ tokenRefresh }).then(res => {
                if (res.data) {
                    storage.setToken(res.data.token);
                    storage.setTokenRefresh(res.data.tokenRefresh);
                    this.getTokenbyRefresh();
                }
            },
                err => {
                    if (err.response.data) {
                    }
                }
            );
        }
            , miliexp)
    }
    getExpiredDate() {
        const exp = storage.getExpiresIn() - 60; // seconds exprired  //go befor ( 60s = 1') 
        const miliexp = exp * 1000;
        const timeNow = new Date().getTime();
        const timeExp = miliexp + timeNow;
        const dateExp = new Date(timeExp);
        return {
            miliexp, dateExp
        }
    }
}
export default new Authhelper();