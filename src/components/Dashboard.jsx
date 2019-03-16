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

  fetchMonsters = () => {
    console.log("hi")
    fetch('/monsters')
      .then(res => res.json())
      .then(resJSON => {
        this.setState({
          monsters: resJSON.monsters,
          monstersLoaded: true
        })
      }).catch(err => console.log(err))
  }

  render() {
      console.log(this.props.monsters)
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
