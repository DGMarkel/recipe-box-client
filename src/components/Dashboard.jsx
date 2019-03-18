import React, { Component } from 'react'
import AddMonsterForm from './AddMonsterForm'
import MyMonstersList from './MyMonstersList'
import * as actions from '../actions/MonsterActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

class DashBoard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      myMonsters: [],
      loaded: false
    }
  }

  render() {
    return (

      <div>
        <AddMonsterForm addMonster={this.props.addMonster} />
        <MyMonstersList myMonsters={this.props.monsters}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    monsters: state.user.monsters
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMonster: bindActionCreators(actions.addMonster, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)
