import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import {
  sendMessage,
  getMessages,
  listenForMessages,
} from '../../services/chat';
import moment from 'moment';

export default class ChatMessage extends Component {
  constructor(props) {
    super(props);
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    this.msgSectionRef = React.createRef();
    this.imageInputRef = React.createRef();
    this.baseUrl = process.env.REACT_APP_SERVER;
    this.state = {
      newMessage: '',
      messages: [],
      chat: null,
      isLoading: false,
      image: null,
      imageSrc: null,
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
        this.scrollToBottom();
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
    const form = new FormData();
    form.append('message', this.state.newMessage);
    if (this.state.image) form.append('image', this.state.image);
    sendMessage({
      chatId: this.props.selected._id,
      body: form,
    })
      .then(() => {
        this.setState({
          newMessage: '',
          image: null,
          imageSrc: null,
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
        this.scrollToBottom();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  scrollToBottom = () => {
    if (this.msgSectionRef.current) {
      const height = this.msgSectionRef.current.scrollHeight;
      if (height) {
        this.msgSectionRef.current.scroll(0, height);
      }
    }
  };

  formatDate = (date) => {
    return moment(date).format('Do MMM, h:mm A');
  };

  onImageSelect = () => {
    if (this.imageInputRef.current) {
      const files = Array.from(this.imageInputRef.current.files);
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.setState({
            imageSrc: reader.result,
          });
        };
        this.setState({ image: file });
      }
    }
  };

  resetImage = () => {
    this.setState({
      image: null,
      imageSrc: null,
    });
  };

  render() {
    const chat = this.props.selected;
    const isEnabled = chat && (this.state.newMessage || this.state.image);

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
          {this.state.imageSrc && (
            <div className="chatImagePreviewContainer">
              <button
                className="btn btn-link chatImagePreviewClose"
                onClick={this.resetImage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </button>
              <img
                alt="Preview"
                className="chatImagePreview"
                src={this.state.imageSrc}
              ></img>
            </div>
          )}
          {chat && (
            <React.Fragment>
              <div className="chatMessages" ref={this.msgSectionRef}>
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
                      <div className="chatMessage">
                        <div className="chatMessageText">
                          {msg.image && (
                            <img
                              src={`${this.baseUrl}/${msg.image}`}
                              alt="Chat message"
                              className={msg.text ? "chatMessageImage mb-2" : "chatMessageImage"}
                            ></img>
                          )}
                          <span>{msg.text}</span>
                        </div>
                        <div className="chatMessageTime">
                          {this.formatDate(msg.createdAt)}
                        </div>
                      </div>
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
                <label className="chatInputImage">
                  <input
                    type="file"
                    className="d-none"
                    onChange={this.onImageSelect}
                    ref={this.imageInputRef}
                  />
                  <div className="btn btn-link" style={{ cursor: 'pointer' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z" />
                      <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                  </div>
                </label>
                <Button
                  type="submit"
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
