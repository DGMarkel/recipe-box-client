import Auth from '../modules/Auth'

export function loginUser(e, data) {
    e.preventDefault();
    return (dispatch) => {
      dispatch({ type: 'LOADING_USER' })
      return fetch('/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(res => {
          Auth.authenticateToken(res.token)
          dispatch({ type: 'LOADED_USER', payload: res })
        }).catch(err => console.log(err))
    }
}
