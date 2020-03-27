import React, { Component } from 'react'

export default class Interests extends Component {
    render() {
        return (
          <div className="interests mb-3 p-1 pb-2">
            <div className="pl-2 font-weight-bold">Interests</div>
            <div>
              {this.props.interests.map(item => (
                <div className="bg-light m-1 mb-2 p-2">
                  <div className="text-dark">{item}</div>
                </div>
              ))}
            </div>
          </div>
        );
    }
}
