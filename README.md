# GitChatApp 2.0
GitChatApp 2.0 is a chat application that requires users to login through GitHub.

[![logo](./static/gitchatapp.png)](./static/gitchatapp.png)

## Application Architecture
Next.js, Node.js, Express, Socket.IO, React

GitChatApp 2.0 uses Next.js as a framework for building a server-rendered universal JavaScript application. It has a custom server built with Node.js and Express for server-side rendering and to facilitate GitHub OAuth. Unlike GitChatApp 1.0, it does not use a MongoDB database. Therefore, no information about the user is stored. GitChatApp 2.0 uses Socket.IO and React to send messages from the user to the server. The server then emits the messages to all users in real-time. GitChatApp 2.0 is currently deployed on Heroku:

https://next-chat-app.herokuapp.com/

## Dependencies
dotenv, express, next, react, react-dom, socket.io, socket.io-client, superagent

## License
MIT License