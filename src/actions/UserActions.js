import Auth from '../modules/Auth'

export function fetchUserData(token) {
  fetch('/profile', {
    method: 'GET',
    headers: {
      token: Auth.getToken(),
      'authorization':  `Token ${Auth.getToken()}`
    }
  }).then( res => res.json())
  .then( res => {
    this.setState({
      myMonsters: res.monsters,
      monstersLoaded: true,
    })
  }).catch( err => console.log(err))
}
