import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class BlogNav extends Component {
  render() {
    return (
      <div className="blog-nav">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link className="navbar-brand pl-3 mr-auto" to="#">
            <h2 className="m-0 h2"><img 
                src="https://valhallawp.com/wp-content/uploads/2018/01/icon-256x256.png" 
                alt="Navbar brand" 
                className="img-responsive img-fluid p-1 mr-2 nav-icon"
            />
            Blogman</h2>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end pr-3" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link font-weight-bold" to="#">
                    <img
                    src="http://dipsinternational.com/wp-content/uploads/2017/03/user-icon-fontawesome.png"
                    alt="user icon"
                    className="img-responsive img-fluid"
                    />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link font-weight-bold h4" to="#">
                  User Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link font-weight-bold" to="#">
                  <img
                    src="https://cdn.iconscout.com/icon/premium/png-256-thumb/settings-1976144-1674132.png"
                    alt="user icon"
                    className="img-responsive img-fluid"
                    />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
