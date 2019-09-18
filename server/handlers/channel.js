const db = require('../models');

exports.addChannel = ({ title }) => new Promise(async (resolve, reject) => {
    try {
        if (!title) {
           return resolve({
                success: false,
                message: 'title is required',
                status: 400
            });
        }

        const channel = await db.Channel.create({ title });

        resolve({
            success: true,
            channel,
            status: 201
        });
    } catch (e) {
        reject(e);
    }
});

exports.getChannels = () => new Promise(async (resolve, reject) => {
   try{
       const channels = await db.Channel.find();

       resolve({
           success: true,
           channels,
           status: 200
       })
   } catch (e) {
       reject(e);
   }
});

exports.getChannelById = id => new Promise(async (resolve, reject) => {
   try {
       const channel = await db.Channel.findById(id);
       if (!channel) {
           return resolve({
               success: false,
               channel: 'Channel not found',
               status: 404
           });
       }
       resolve({
           success: true,
           channel,
           status: 200
       });
   } catch (e) {
       reject(e);
   }
});

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