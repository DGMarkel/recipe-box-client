import Auth from '../modules/Auth'

export function registerUser(e, data) {
  return (dispatch) => {
    fetch('/users', {
      method: 'POST',
      body: JSON.stringify({
        user: data
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(res => {
      dispatch({ type: 'REGISTER_USER' })
      Auth.authenticateToken(res.token)
    }).catch(err => {
      console.log(err);
    })
  }
}

export function fetchUserData() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_USER_DATA'})
    fetch('/profile', {
      method: 'GET',
      headers: {
        token: Auth.getToken(),
        'authorization':  `Token ${Auth.getToken()}`
      }
    }).then( res => res.json())
    .then( resJSON => {
      dispatch({ type: 'LOAD_USER_DATA', payload: resJSON })
    }).catch( err => console.log(err))
  }
}

export function logoutUser() {
  return (dispatch) => {
    fetch('/logout', {
      method: 'DELETE',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }).then( res => {
      Auth.deauthenticateToken()
      dispatch({ type: 'LOGOUT_USER' })
    }).catch( err => console.log(err))
  }
}
