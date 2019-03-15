import React, { Component } from 'react'
import Auth from '../modules/Auth'
import AddMonsterForm from './AddMonsterForm'
import { connect } from 'react-redux'

class DashBoard extends Component {

  addMonster(e, data) {
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
      console.log(res);
      this.getUserMonsters();
    }).catch( err => console.log(err))
  }

  render() {
    console.log(this.props.user)
    return (
      <div>
      <AddMonsterForm addMonster={this.addMonster} />

      {  (this.props.monsters.list)
            ? this.props.monsters.list.map( monster => {
                return (
                  <div className="monster" key={monster.id}>
                    <h1>{monster.name}</h1>
                    <p>{monster.description}</p>
                  </div>
                )
              })
            : <p>Loading...</p>
    }
      </div>
    )
  }
}

const mapDispatchToProps = state => {
  return {
    user: state.user,
    monsters: state.user.monsters
  }
}

export default connect(mapDispatchToProps)(DashBoard)
