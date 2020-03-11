import React, { Component } from 'react';

export default class ChatList extends Component {
  render() {
    return (
      <div className="chatListContainer">
        <h3 className="chatListHeader">Chat List</h3>
        <div style={{ flexGrow: 1 }} className="chatList">
          {this.props.chats.map((chat) => {
            const isSelected =
              this.props.selected && this.props.selected._id === chat._id;
            return (
              <button
                className={isSelected ? 'chatListItem active' : 'chatListItem'}
                key={chat._id}
                onClick={() => this.props.onSelect(chat)}
              >
                <div className="chatListName">{chat.user.name}</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}
