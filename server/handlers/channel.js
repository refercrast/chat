const db = require('../db');
const channelsCollection = db.get('channels');

exports.getChannels = () => channelsCollection.find();

exports.getChannelById = _id => channelsCollection.findOne({ _id });
// query case insensitive
exports.getChannelsCount = title => channelsCollection.count({ title: { $regex: new RegExp(`^${title}$`, "i") } });

exports.addChannel = channel => channelsCollection.insert(channel);

exports.deleteChannel = _id => channelsCollection.remove({ _id });