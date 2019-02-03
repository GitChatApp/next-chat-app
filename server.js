const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandle = nextApp.getRequestHandler()

let users = [];

io.on('connection', (socket) => {
  socket.on('add user', (username) => {
    socket.username = username;
    users.push(username);
    io.emit('user list', users);
    io.emit('chat message', '- ' + socket.username + ' has joined GitChatApp -');
  })
  socket.on('chat message', (msg) => {
    let currentdate = new Date()
    let minutes = currentdate.getMinutes().toString();
    minutes = minutes.length > 1 ? minutes : '0' + minutes;
    let time = currentdate.getHours() + ':' + minutes
    io.emit('chat message', `${socket.username} [${time}]: ${msg}`)
  })
  socket.on('disconnect', () => {
    let index = users.findIndex(user => user == socket.username)
    users.splice(index, 1)
    io.emit('user list', users)
    io.emit('chat message', '- ' + socket.username + ' has left GitChatApp -')
  })
})

nextApp.prepare().then(() => {
  app.get('*', (req, res) => {
    return nextHandle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})