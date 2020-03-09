import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import {
  sendMessage,
  getMessages,
  listenForMessages,
} from '../../services/chat';

export default class ChatMessage extends Component {
  constructor(props) {
    super(props);
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    this.state = {
      newMessage: '',
      messages: [],
      chat: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.selected && !state.chat) return null;
    if (!props.selected && state.chat) return { chat: null };
    if (props.selected && !state.chat) return { chat: props.selected };
    if (props.selected._id !== state.chat._id)
      return {
        chat: props.selected,
      };

    return null;
  }

  componentDidMount() {
    this.getMessages(this.props);
    listenForMessages.subscribe(({ chatId, message }) => {
      if (this.state.chat && this.state.chat._id === chatId) {
        this.setState({
          messages: [...this.state.messages, message],
        });
      }
    });
  }

  componentDidUpdate(preProps, preState) {
    if (
      (!preState.chat && this.state.chat) ||
      (preState.chat &&
        this.state.chat &&
        this.state.chat._id !== preState.chat._id) ||
      (!this.state.chat && preState.chat)
    ) {
      this.getMessages();
    }
  }

  onChange = (event) => {
    this.setState({ newMessage: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    sendMessage({
      chatId: this.props.selected._id,
      message: this.state.newMessage,
    })
      .then(() => {
        this.setState({
          newMessage: '',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getMessages = () => {
    const chat = this.props.selected;
    if (!chat) {
      this.setState({ messages: [] });
      return;
    }

    getMessages(chat._id)
      .then((data) => {
        this.setState({ messages: data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const chat = this.props.selected;
    const isEnabled = chat && this.state.newMessage;

    return (
      <div className="chatContainer">
        <h3 className="mb-4">
          {!chat && <span>Select a Chat</span>}
          {chat && <span>{chat.user.name}</span>}
        </h3>
        <div className="chatSection">
          {!chat && (
            <div className="d-flex w-100 h-100 justify-content-center align-items-center">
              <div>Select a Chat.</div>
            </div>
          )}
          {chat && (
            <React.Fragment>
              <div className="chatMessages">
                {this.state.messages.map((msg) => {
                  const isMyMessage = this.userId === msg.user;
                  return (
                    <div
                      className={
                        isMyMessage
                          ? 'chatMessageContainer myMessage'
                          : 'chatMessageContainer'
                      }
                      key={msg._id}
                    >
                      <div className="chatMessage">{msg.text}</div>
                    </div>
                  );
                })}
              </div>
              <form className="chatInputContainer" onSubmit={this.onSubmit}>
                <input
                  className="chatInput"
                  value={this.state.newMessage}
                  onChange={this.onChange}
                ></input>
                <Button
                  color="primary"
                  size="medium"
                  variant="contained"
                  disabled={!isEnabled}
                >
                  Send
                </Button>
              </form>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}
