import React, { Component } from 'react'

export default class MyMonstersList extends Component {

  render() {
    return (
      <div>
        { (this.props.monsters) ?
          this.props.monsters.map( monster => <h1>{monster.name}</h1> )
          : <p>No monsters to display!</p>
        }
      </div>
    )
  }
}
