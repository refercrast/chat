const { io } = require('./index');
const { NEW_USER_CHANNEL, USER_LEFT_CHANNEL, USER_HAS_LEFT_CHANNEL, USER_HAS_JOINED_CHANNEL } = require('./socketEvents');

module.exports = socket => {

    socket.on(NEW_USER_CHANNEL, (username, channelId) => {
        const room = `room ${channelId}`;
        socket.join(room, () => {
            socket.to(room).emit(USER_HAS_JOINED_CHANNEL, `${username} - has joined the channel`);
        });
    });

    socket.on(USER_LEFT_CHANNEL, (username, channelId) => {
        const room = `room ${channelId}`;
        socket.leave(room, () => {
            socket.to(room).emit(USER_HAS_LEFT_CHANNEL, `${username} - has left the channel`);
        });
    });
};