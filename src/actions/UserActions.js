import Auth from '../modules/Auth'

export function fetchUserData() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_USER_DATA'})
    fetch('https://my-recipe-box-project.herokuapp.com/profile', {
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
    fetch('https://my-recipe-box-project.herokuapp.com/logout', {
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
