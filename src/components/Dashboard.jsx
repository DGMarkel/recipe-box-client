import React, { Component } from 'react'
import Auth from '../modules/Auth'
import AddMonsterForm from './AddMonsterForm'
import { connect } from 'react-redux'

class DashBoard extends Component {
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

  getUserMonsters() {
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

const mapDispatchToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapDispatchToProps)(DashBoard)
