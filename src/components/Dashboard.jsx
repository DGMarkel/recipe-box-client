import React, { Component } from 'react'
import AddMonsterForm from './AddMonsterForm'
import * as actions from '../actions/MonsterActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

class DashBoard extends Component {

  render() {
    return (
      <div>
      <AddMonsterForm addMonster={this.props.addMonster} />

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

const mapStateToProps = state => {
  return {
    user: state.user,
    monsters: state.user.monsters
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMonster: bindActionCreators(actions.addMonster, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)
