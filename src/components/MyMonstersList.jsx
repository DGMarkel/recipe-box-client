import React, { Component } from 'react'
import Auth from '../modules/Auth'

export default class MyMonstersList extends Component {
  constructor() {
    super()
    this.state = {
      myMonsters: [],
      loaded: false
    }
  }

  componentDidMount() {
    fetch('/profile', {
      method: 'GET',
      headers: {
        token: Auth.getToken(),
        'authorization':  `Token ${Auth.getToken()}`
      }
    }).then( res => res.json())
    .then( resJSON => {
        this.setState({
          myMonsters: resJSON.monsters,
          loaded: true
        })
    }).catch( err => console.log(err))
  }

  render() {
    return (
      <div>
      {  (this.state.loaded)
            ? this.state.myMonsters.map( monster => {

                  return (
                    <div className="monster" key={monster.id}>
                      <h1>{monster.name}</h1>
                      <p>{monster.description}</p>
                    </div>
                  )}
                )

            : <p>Loading...</p>
    }
      </div>
    )
  }
}
