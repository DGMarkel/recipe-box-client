import Auth from '../modules/Auth'

export function fetchUser() {
    return (dispatch) => {
      dispatch({ type: 'LOADING_USER' })
      return fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(resJSON => {
          Auth.authenticateToken(res.token)
          dispatch({ type: 'LOADED_USER', payload: resJSON })
        }).catch(err => console.log(err))
    }
}
