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
        .then(res => {
          console.log(res)
          Auth.authenticateToken(res.token)
          dispatch({ type: 'LOADED_USER', payload: res })
        }).catch(err => console.log(err))
    }
}
