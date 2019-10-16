import React, { Component } from "react";

export class Home extends Component {
  handleLogOut() {
      localStorage.removeItem('user')
      localStorage.removeItem('token_id')
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
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/sign-in" onClick={this.handleLogOut}>
                Log out
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Home;
