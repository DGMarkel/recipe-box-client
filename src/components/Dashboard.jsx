import React, { Component } from 'react'
import Auth from '../modules/Auth'
import AddMonsterForm from './AddMonsterForm'
import { connect } from 'react-redux'

class DashBoard extends Component {

  render() {
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
