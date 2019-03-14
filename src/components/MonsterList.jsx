import React, { Component } from 'react'
import * as actions from '../actions/MonsterActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class MonsterList extends Component {

  componentDidMount() {
    this.props.fetchMonsters()
  }

  render() {
    return (
      <div>
        {(this.props.monstersLoaded)
          ? this.props.monstersList.map( monster => {
            return <h1>{monster.name}</h1>
          })
          : <p>Loading</p>}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMonsters: bindActionCreators(actions.fetchMonsters, dispatch),
  };
}

const mapStateToProps = state => {
  return {
    monstersList: state.user.monsters.list,
    monstersLoaded: state.user.monsters.listLoaded
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonsterList)
