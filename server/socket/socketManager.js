const { io } = require('./index');
const { NEW_USER_CHANNEL, USER_LEFT_CHANNEL, USER_HAS_LEFT_CHANNEL, USER_HAS_JOINED_CHANNEL } = require('./socketEvents');

module.exports = socket => {

    // initialize existing rooms according to existing channels of user
    socket.on('add channels', channels => {
        channels.forEach(channel => {
            const room = `room ${channel._id}`;
            socket.join(room);
        });
    });

    socket.on(NEW_USER_CHANNEL, (username, channelId) => {
        const room = `room ${channelId}`;
        socket.join(room, () => {
            socket.to(room).emit(USER_HAS_JOINED_CHANNEL, username, channelId);
        });
    });

    socket.on(USER_LEFT_CHANNEL, (username, channelId) => {
        const room = `room ${channelId}`;
        socket.leave(room, () => {
            socket.to(room).emit(USER_HAS_LEFT_CHANNEL, username, channelId);
        });
    });
};