import React, { Component } from 'react'

export default class MyMonstersList extends Component {

  render() {

    return (
      <div>
        { (this.props.myMonsters) ?
          this.props.myMonsters.map( monster => <h1>{monster.name}</h1> )
          : <p>No monsters to display!</p>
        }
      </div>
    )
  }
}
