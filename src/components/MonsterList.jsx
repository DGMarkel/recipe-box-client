import React, { Component } from 'react'

export default class MonsterList extends Component {
  constructor() {
    super();
    this.state = {
      monsterList: null,
      monsterListLoaded: false
    }
  }

  componentDidMount() {
    fetch('/monsters')
      .then(res => res.json())
      .then(res => {
        this.setState({
          monsterList: res.monsters,
          monsterListLoaded: true
        })
      }).catch(err => console.log(err))
  }

  renderMonsters = () => {
    return this.state.monsterList.map(monster => {
      return (
        <div className="monster" key={monster.id}>
          <h2>{monster.name}</h2>
          <p>{monster.description}</p>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="monster-list">
        { (this.state.monsterListLoaded) ?
            this.renderMonsters() :
            <p>Loading...</p>
        }
      </div>
    )
  }
}
