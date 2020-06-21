class Storage {

  setToken(token) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
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
  }
}
export default new Storage();