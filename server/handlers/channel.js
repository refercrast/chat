const db = require('../db');
const channelsCollection = db.get('channels');

exports.addChannel = async channel => await channelsCollection.insert(channel);

exports.getChannels = async () =>  await channelsCollection.find();

// query case insensitive
exports.getChannelByTitle = async title => await channelsCollection.find({ title: { $regex: new RegExp(title, "i") } });

exports.getChannelById = async _id => await channelsCollection.find({ _id });

exports.deleteChannel = async _id => await channelsCollection.remove({ _id });