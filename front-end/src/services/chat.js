/**
 * This file will contain all the API calls to the server
 * relating to the chat.
 */
import io from 'socket.io-client';
import http from './http';
import { BehaviorSubject, Observable } from 'rxjs';

const baseURL = `${process.env.REACT_APP_API}/chat`;
const socketURL = process.env.REACT_APP_SERVER;
const getSocketConnection = new BehaviorSubject(null);

export const getChat = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.get(baseURL);
      if (res && res.data) {
        resolve(res.data.chats);
      } else {
        throw new Error('No data');
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const getMessages = async (chatId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.get(`${baseURL}/${chatId}`);
      if (res && res.data) {
        resolve(res.data.messages);
      } else {
        throw new Error('No data');
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const connectSocket = async () => {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem('token_id');
    const socket = io.connect(socketURL);
    getSocketConnection.next(socket);
    socket.on('connect', () => {
      socket.emit('authentication', { token });
      socket.on('authenticated', () => {
        resolve();
      });

      socket.on('unauthorized', (err) => {
        localStorage.removeItem('token_id');
        localStorage.removeItem('user');
        reject(err);
      });
    });
  });
};

export const disconnectSocket = () => {
  const socket = getSocketConnection.value;
  if (socket) {
    socket.close();
    socket.off();
    getSocketConnection.next(null);
  }
};

export const sendMessage = async ({ chatId, body }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.post(`${baseURL}/${chatId}`, body);
      if (res && res.data) {
        resolve(res.data.message);
      } else {
        throw new Error('No data');
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const addChat = async (username) => {
  return new Promise(async (resolve, reject) => {
    const socket = getSocketConnection.value;
    socket.emit('join', { username }, (chat, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(chat);
      }
    });
  });
};

export const listenForMessages = new Observable((observer) => {
  getSocketConnection.subscribe((socket) => {
    if (socket) {
      socket.on('message', (val) => {
        observer.next(val);
      });
    }
  });
});

export { getSocketConnection };
