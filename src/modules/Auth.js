class Auth {

  static authenticateToken(token) {
    localStorage.setItem('token', token);
  }

  static isUserAuthenticated() {
    if (localStorage.getItem('token') !== "undefined") {
      return localStorage.getItem('token') !== null;
    }
  }

  static deauthenticateToken() {
    localStorage.removeItem('token');
  }

  static getToken() {
    return localStorage.getItem('token');
  }
}

export default Auth;
