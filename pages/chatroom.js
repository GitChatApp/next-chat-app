import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

import Head from 'next/head'

class Chatroom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      input: "",
      messages: [],
      list: []
    }
  }

  static getInitialProps({req, query}) {
    return {
      username: query.username
    }
  }

  componentDidMount() {
    this.socket = io()
    this.socket.emit('add user', this.props.username)
    this.socket.on('chat message', this.handleMessage)
    this.socket.on('user list', this.handleList)
  }

  componentDidUpdate() {
    const { messagebox } = this.refs;
    ReactDOM.findDOMNode(messagebox).scrollTop = messagebox.scrollHeight;
  }

  handleMessage = (message) => {
    let messages = this.state.messages.slice()
    messages.push(message)
    this.setState({ messages: messages })
  }

  handleList = (list) => {
    this.setState({ list: list })
  }

  handleChange = (event) => {
    this.setState({ input: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.input !== "") {
      this.socket.emit('chat message', this.state.input)
      this.setState({ input: "" })
    }
  }

  toggleList = () => {
    if (this.state.visible) {
      this.setState({ visible: false })
    }
    else {
      this.setState({ visible: true })
    }
  }

  render() {
    return (
      <div className={this.state.visible ? 'chatroom' : 'chatroom column'}>
        <Head>
          <title>GitChatApp</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/png" href="static/favicon.png" />
        </Head>
        <h1>Welcome to GitChatApp</h1>
        <img className="icon" src="/static/icon.png" onClick={this.toggleList} />
        <div className={this.state.visible ? 'messagebox' : 'messagebox border'} ref="messagebox">
          <ul className="messages">
            {this.state.messages.map(message => (
              <li>{message}</li>
            ))}
          </ul>
        </div>
        <div className={this.state.visible ? 'userlist' : 'hidden'}>
          <h2>Users</h2>
          <ul className="users">
            {this.state.list.map(user => (
              <li>{user}</li>
            ))}
          </ul>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input 
            autoComplete="off" 
            value={this.state.input} 
            onChange={this.handleChange} 
          />
          <button>Send</button>
        </form>
        <style jsx>{`
          .chatroom {
            background-color: rgb(70, 190, 255);
            border-radius: 5px;
            display: grid;
            margin: 20px auto;
            max-width: 900px;
            position: relative;
            width: 90%;
            grid-template-columns: 3fr 1fr;
            grid-template-rows: 1fr 8fr 1fr;
            grid-template-areas: "header header"
                                 "chatroom users"
                                 "form form";
          }
          .column {
            grid-template-columns: 3fr 0fr;
          }
          .chatroom h1 {
            color: white;
            font-size: 20px;
            grid-area: header;
            padding: 20px 10px 20px 10px;
          }
          .chatroom img {
            height: 40px;
            position: absolute;
            right: 10px;
            top: 10px;
            cursor: pointer;
          }
          .chatroom form {
            font-size: 20px;
            grid-area: form;
            padding: 10px;
            text-align: center;
          }
          .chatroom form input {
            border: 0; 
            border-radius: 5px;
            font-size: 16px;
            margin-right: 5px;
            padding: 10px; 
            width: 70%;
          }
          .chatroom form button { 
            background: lightgrey; 
            border: 0;
            border-radius: 5px;
            color: rgb(126, 126, 126);
            cursor: pointer;
            font-size: 16px;
            padding: 10px;
            width: 20%; 
          }
          .chatroom .messagebox { 
            background-color: white;
            border-right: 10px solid #eee;
            grid-area: chatroom;
            height: 500px;
            margin-left: 10px;
            overflow: scroll;
            padding: 10px;
          }
          .chatroom .border {
            border-right: 10px solid rgb(70, 190, 255);
          }
          .chatroom .messages {
            list-style-type: none;
          }
          .chatroom .messages li { 
            padding: 10px 0px;
          }
          .chatroom .hidden {
            display: none;
          }
          .chatroom .userlist {
            background-color: white;
            grid-area: users;
            height: 500px;
            margin-right: 10px;
            overflow: scroll;
            padding: 10px;
            min-width: 150px;
          }
          .chatroom .userlist h2 {
            font-size: 16px;
            padding: 5px 0px;
          }
          .chatroom .users {
            list-style-type: none;
          }
          .chatroom .users li { 
            padding: 5px 0px;
          }
        `}</style>
        <style global jsx>{`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            background-color: rgb(231, 234, 237);
            font-family: sans-serif;
          }
        `}</style>
      </div>
    )
  }
}

export default Chatroom
