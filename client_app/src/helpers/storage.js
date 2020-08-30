import authhelper from './auth';

class Storage {

  setToken(token) {
    localStorage.setItem('token', token);
  }
  setTokenRefresh(tokenRefresh) {
    localStorage.setItem('tokenRefresh', tokenRefresh);
  }
  setExpiresIn(expiresIn) {
    localStorage.setItem('expiresIn', expiresIn);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getTokenRefresh() {
    return localStorage.getItem('tokenRefresh');
  }
  getExpiresIn() {
    return localStorage.getItem('expiresIn');
  }
  setAccount(account) {
    localStorage.setItem('account', JSON.stringify(account));
  }
  getAccount() {
    return JSON.parse(localStorage.getItem('account'));
  }
  isLoggednIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('account');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenRefresh');
    localStorage.removeItem('expiresIn');
    clearTimeout(authhelper.getTokenbyRefresh());
  }
  updateAccount(account) {
    this.setAccount(account);
  }
}
export default new Storage();