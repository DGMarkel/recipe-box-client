class Auth {

  static authenticateToken(token) {
    sessionStorage.setItem('token', token);
  }

  static isUserAuthenticated() {
    if (sessionStorage.getItem('token') !== "undefined") {
      return sessionStorage.getItem('token') !== null;
    }
  }

  static deauthenticateToken() {
    sessionStorage.removeItem('token');
  }

  static getToken() {
    return sessionStorage.getItem('token');
  }
}

export default Auth;
