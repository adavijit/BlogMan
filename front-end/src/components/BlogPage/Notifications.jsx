import React, { Component } from 'react'

export default class Notifications extends Component {
    render() {
        return (
          <div className="notifications mb-3 p-1 pb-2">
            <div className="pl-2 font-weight-bold">Notifications</div>
            <div>
              {this.props.notifications.map(item => (
                <div className="bg-light m-1 mb-2 p-2">
                  <div className="text-dark">{item}</div>
                </div>
              ))}
            </div>
          </div>
        );
    }
}
