import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Navbar extends Component {
  handleLogOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token_id');
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          BlogMan
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink exact={true}  className="nav-link" to="/" activeClassName="active">
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/chat-room" activeClassName="active">
                Chat <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/sign-in"
                onClick={this.handleLogOut}
              >
                Log out
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
