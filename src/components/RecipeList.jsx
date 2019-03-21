import React, { Component } from 'react'

export default class MonsterList extends Component {
  constructor() {
    super()
    this.state = {
      monsters: null,
      monstersLoaded: false
    }
  }

  componentDidMount() {
    fetch('/recipes')
      .then(res => res.json())
      .then(resJSON => {
        this.setState({
          recipes: resJSON.recipes,
          recipesLoaded: true
        })
      }).catch(err => console.log(err))
  }

  render() {
    console.log(this.state.monsters)
    return (
      <div>
        { (this.state.monstersLoaded)
          ? this.state.monsters.map( monster => { return <h1>{monster.name}</h1> })
          : <p>Loading...</p>
        }
      </div>
    )
  }
}
