import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Trending extends Component {
    render() {
        return (
          <div className="trending mb-2 p-1 pb-2">
            <div className="pl-2 font-weight-bold">Trending Now</div>
            <div>
              {this.props.trending.map(item => (
                <div className="bg-light m-1 mb-2 p-2">
                  <Link to="#" className="text-dark">{item}</Link>
                </div>
              ))}
            </div>
          </div>
        );
    }
}
