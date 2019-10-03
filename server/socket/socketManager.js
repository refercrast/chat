const { io } = require('./index');
const { NEW_USER_CHANNEL, USER_LEFT_CHANNEL, USER_HAS_LEFT_CHANNEL, USER_HAS_JOINED_CHANNEL, ADD_CHANNELS } = require('./socketEvents');

module.exports = socket => {

    // initializing existing rooms according to existing channels of user
    socket.on(ADD_CHANNELS, channels => {
        channels.forEach(channel => {
            const room = channel._id.toString();
            socket.join(room);
        });
    });

    socket.on(NEW_USER_CHANNEL, (username, channelId) => {
        const room = channelId.toString();
        socket.join(room, () => {
            socket.to(room).emit(USER_HAS_JOINED_CHANNEL, username, channelId);
        });
    });

    socket.on(USER_LEFT_CHANNEL, (username, channelId) => {
        const room = channelId.toString();
        socket.leave(room, () => {
            socket.to(room).emit(USER_HAS_LEFT_CHANNEL, username, channelId);
        });
    });
};