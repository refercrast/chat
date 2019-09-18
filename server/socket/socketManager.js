const io = require('../index.js').io;
const { GET_CHANNELS, CREATE_CHANNEL } = require('./socketEvents');
const handlers = require('../handlers');

module.exports = socket => {
    socket.on(GET_CHANNELS, async callback => {
        const { channels } = await handlers.getChannels();
        callback(channels);
    });

    socket.on(CREATE_CHANNEL, async (title, callback) => {
        const { channel } = await handlers.addChannel({ title });
        console.log(channel);
        callback(channel)
    });
};