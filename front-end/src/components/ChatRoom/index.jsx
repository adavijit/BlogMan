import React, { Component } from 'react';
import { Container, Grid } from '@material-ui/core';
import Navbar from '../Common/Navbar';
import { getChat, addChat } from '../../services/chat';
import AddChat from './addChat';
import ChatList from './chatList';
import ChatMessage from './chatMessage';
import { connectSocket, disconnectSocket } from '../../services/chat';
import './style.scss';

export class ChatRoom extends Component {
  constructor() {
    super();
    this.socket = null;
    this.state = {
      username: '',
      errors: {},
      chats: [],
      isConnected: false,
      selectedChat: null,
    };
  }

  componentDidMount() {
    connectSocket()
      .then(() => {
        console.log('Connected');
        this.setState({ isConnected: true });
      })
      .catch(() => {
        console.log('Not Connected');
      });
    this.fetchChats();
  }

  fetchChats = () => {
    getChat()
      .then((chats) => {
        this.setState({ chats });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentWillUnmount() {
    disconnectSocket();
  }

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value,
      errors: {},
    });
  };

  addUser = (event) => {
    event.preventDefault();
    addChat(this.state.username)
      .then((chat) => {
        this.setState({ username: '', chats: [...this.state.chats, chat] });
      })
      .catch((error) => {
        this.setState({
          errors: error,
        });
        return;
      });
  };

  onChatSelect = (chat) => {
    if (this.state.selectedChat && this.state.selectedChat._id === chat._id)
      return;
    this.setState({
      selectedChat: chat,
    });
  };

  render() {
    const { username, errors } = this.state;

    return (
      <div>
        <Navbar></Navbar>
        <Container className="chatRoom" maxWidth="lg">
          <h1 className="mt-4">Chat room</h1>
          <AddChat
            username={username}
            error={errors.username}
            onChange={this.handleUsernameChange}
            onSubmit={this.addUser}
          ></AddChat>
          <Grid
            style={{ flexGrow: 1 }}
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={4}
          >
            <Grid item xs={4}>
              <ChatList
                chats={this.state.chats}
                onSelect={this.onChatSelect}
                selected={this.state.selectedChat}
              ></ChatList>
            </Grid>
            <Grid item xs={8}>
              <ChatMessage selected={this.state.selectedChat}></ChatMessage>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default ChatRoom;
