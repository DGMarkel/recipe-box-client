import Auth from '../modules/Auth'

export function addMonster(e, data) {
  return (dispatch) => {
    fetch('/monsters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        'authorization':  `Token ${Auth.getToken()}`
      },
      body: JSON.stringify({
        monster: data
      })
    }).then( res => res.json())
    .then( res => {
      console.log(res)
      dispatch({ type: 'ADD_USER_MONSTER', payload: res })
    }).catch( err => console.log(err))
  }
}
