import Auth from '../modules/Auth'

export function addMonster(e, data) {
  e.preventDefault()
  console.log(data)
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
      console.log("added")
    }).catch( err => console.log(err))
  }
}
