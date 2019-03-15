import Auth from '../modules/Auth'

export function fetchUserData() {
  return (dispatch) => {
    dispatch({ type: 'LOADING_USER_DATA' })
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
