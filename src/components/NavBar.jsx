import React, { Component } from 'react';
import { connect } from 'react-redux'

class NavBar extends Component {

  render() {
    return (
      <div className="navigation">
        <div>
           <a href="/dash">Dashboard</a>
           <a href="/my-recipes">My Recipes</a>
           <a href="recipes/new">Add a Recipe</a>
           <a href="/logout" onClick={this.props.handleLogout}>Logout</a>
         </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(NavBar)
