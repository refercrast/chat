const db = require('../db');
const channelsCollection = db.get('channels');

exports.addChannel = async channel => await channelsCollection.insert(channel);

exports.getChannels = async () =>  await channelsCollection.find();

// query case insensitive
exports.getChannelByTitle = async title => await channelsCollection.find({ title: { $regex: new RegExp(title, "i") } });

exports.deleteChannelById = id => new Promise(async (resolve, reject) => {
   try {
        const channel = await db.Channel.findById(id);
        if (!channel) {
            resolve({
                success: false,
                channel: "Channel not found",
                status: 404
            });
            return;
        }

       // delete channel
       await channel.remove();

        // delete all messages
        await Promise.all(channel.messages.map(async messageId => {
            const message = await db.Message.findById(messageId);
            await message.remove();
        }));

        resolve({
            success: true,
            channel,
            status: 200
        });
   } catch (e) {
       reject(e);
   }
});