const db = require('../db');
const channelsCollection = db.get('channels');

exports.getChannels = async () =>  await channelsCollection.find();

exports.getChannelById = async _id => await channelsCollection.findOne({ _id });
// query case insensitive
exports.getChannelByTitle = async title => await channelsCollection.find({ title: { $regex: new RegExp(title, "i") } });

exports.addChannel = async channel => await channelsCollection.insert(channel);

exports.deleteChannel = async _id => await channelsCollection.remove({ _id });

exports.addMessage = async ( _id, message ) => await channelsCollection.findOneAndUpdate({_id},{ $push: { messages: message }});

exports.deleteMessage = async ( _id, messageId ) => await channelsCollection.findOneAndUpdate({_id},{ $pull: { messages: { _id: messageId } }});