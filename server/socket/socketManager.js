const { io } = require('./index');
const usernames = { };  // users currently connected

module.exports = socket => {

    socket.on('new user', (name, chatId) => {
        socket.username = name;
        usernames[name] = { room: chatId, id: socket.id }; //save room to the username[user]

        socket.room = chatId;
        socket.join(chatId);

        socket.emit('welcome', socket.room); //to the user

        socket.broadcast.to(socket.room).emit('new user joined', socket.username); //to everyone in the room except the user

        io.emit('updateusers', { usernames, room: socket.room }); // update list of room users
    });
};