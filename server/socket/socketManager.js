const io = require('../index.js').io;
const { GET_CHANNELS, CREATE_CHANNEL } = require('./socketEvents');
const channel = require('../handlers/channel');

module.exports = socket => {
    socket.on(GET_CHANNELS, async callback => {
        const { channels } = await channel.getChannels();
        callback(channels);
    });

    socket.on(CREATE_CHANNEL, async (title, callback) => {
        const { channel } = await channel.addChannel({ title });
        console.log(channel);
        callback(channel)
    });
};