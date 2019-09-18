const db = require('../models');

exports.addMessage = ({ message }, { channelId }) => new Promise(async (resolve, reject) => {
   try {
       if (!message) {
           return resolve({
               success: false,
               errorMessage: 'Message is required',
               status: 400
           });
       }

        const channel = await db.Channel.findById(channelId);

        if (!channel) {
            return resolve({
                success: false,
                errorMessage: "Channel not found",
                status: 404
            });
        }

        const createdMessage = await db.Message.create({
            message: message,
            channel
        });

        await channel.messages.push(createdMessage._id);
        await channel.save();

        resolve({
            success: true,
            createdMessage: createdMessage._doc,
            status: 200
        });
   } catch (e) {
       reject(e);
   }
});

exports.getMessagesByChannelId = ({ channelId }, condition) => new Promise(async (resolve, reject) => {
    try {
        const channel = await db.Channel.findById(channelId)
            .populate('messages');

        if (!channel) {
            return resolve({
                success: false,
                errorMessage: "Channel not found",
                status: 404
            });
        }

        let result = null;

        if (condition.before && condition.after === undefined) {
            result = channel.messages.filter(message => message.created < +condition.before);
        } else if (condition.after && condition.before === undefined) {
            result = channel.messages.filter(message => message.created > +condition.after);
        } else if (condition.after && condition.before) {

            if (condition.before < condition.after) {
                return resolve({
                    success: false,
                    errorMessage: "Incorrect range of dates",
                    status: 400
                });
            }

            result = channel.messages.filter(message => message.created > +condition.after && message.created < +condition.before);
        } else {
            result = channel.messages;
        }

        return resolve({
            success: true,
            messages: result,
            status: 200
        });
    } catch (e) {
        reject(e);
    }
});

exports.deleteMessageByMessageId = ({ messageId }) => new Promise(async (resolve, reject) => {
   try {
        const message = await db.Message.findById(messageId);
        if (!message) {
            resolve({
                success: false,
                errorMessage: "Message not found",
                status: 404
            });
        }
        // delete message from channel
        const channel = await db.Channel.findById(message.channel);
        channel.messages.splice(channel.messages.indexOf(message._id), 1);
        await channel.save();

        // delete message
        await message.remove();

        resolve({
            success: true,
            message: message,
            status: 200
        });
   } catch (e) {
       reject(e);
   }
});

exports.editMessageByMessageId = ({ message },{ messageId }) => new Promise(async (resolve, reject) => {
   try {
       if (!message) {
           return resolve({
               success: false,
               errorMessage: 'Message is required',
               status: 400
           });
       }
       const currentMessage = await db.Message.findById(messageId);
       currentMessage.message = message;
       await console.log(currentMessage);
       await currentMessage.save();
       resolve({
           success: true,
           status: 200,
           message: message
       })
   } catch (e) {
       reject(e);
   }
});