const db = require('../db');
const messageCollection = db.get('messages');

exports.addMessage = message => messageCollection.insert(message);

exports.getMessage = _id  => messageCollection.findOne({ _id });

exports.editMessage = (_id, message) => messageCollection.findOneAndUpdate({ _id }, { $set: { message } });

exports.deleteMessage = _id => messageCollection.findOneAndDelete({ _id });

exports.deleteAllByChannel = channelId => messageCollection.remove({ channelId });

exports.getMessagesByChannel = channelId => messageCollection.find({ channelId });