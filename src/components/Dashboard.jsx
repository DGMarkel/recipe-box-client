import React, { Component } from 'react'
import AddMonsterForm from './AddMonsterForm'
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

  componentDidMount() {
    fetch('/monsters')
      .then(res => res.json())
      .then(resJSON => {
        this.setState({
          myMonsters: resJSON,
          loaded: true
        })
      }).catch(err => console.log(err))
  }

  render() {
    return (
      <div>
      <AddMonsterForm addMonster={this.props.addMonster} />
      {  (this.state.loaded)
            ? this.state.myMonsters.monsters.map( monster => {
                if (monster.user_id === this.props.user.id) {
                  return (
                    <div className="monster" key={monster.id}>
                      <h1>{monster.name}</h1>
                      <p>{monster.description}</p>
                    </div>
                  )}
              })
            : <p>Loading...</p>
    }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMonster: bindActionCreators(actions.addMonster, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)
