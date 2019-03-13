import React, { Component } from 'react'
import Auth from '../modules/Auth'
import AddMonsterForm from './AddMonsterForm'

export default class DashBoard extends Component {
  constructor() {
    super();
    this.state={
      myMonsters: null,
      monstersLoaded: false
    }
  }

  componentDidMount() {
    this.getUserMonsters()
  }

  getUserMonsters = () => {
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

  render() {
    return (
      <div>
      { (this.state.monstersLoaded)
        ? this.state.myMonsters.map( monster => {
          return <h1 key={monster.id}>{monster.name}</h1>
        })
        : <p>Loading...</p>
      }
      </div>
    )
  }
}
