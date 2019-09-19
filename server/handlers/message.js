const db = require('../db');
const messageCollection = db.get('messages');

exports.addMessage = async message => await messageCollection.insert(message);

exports.getMessage = async _id  => await messageCollection.findOne({ _id });

exports.editMessage = async (_id, message) => await messageCollection.findOneAndUpdate({_id}, { $set: { message } });

exports.deleteMessage = async _id => await messageCollection.findOneAndDelete({ _id });

exports.removeAllByChannel = channelId => messageCollection.remove({
    channelId
})