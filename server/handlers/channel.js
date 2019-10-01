const db = require('../db');
const channelsCollection = db.get('channels');

// exports.getChannels = () => channelsCollection.find();

// find all except user channels
exports.getChannels = userChannels => channelsCollection.find({ _id: { $nin: userChannels } });

exports.getChannelById = _id => channelsCollection.findOne({ _id });
// ids should by an Array
exports.getChannelsByIds = ids => channelsCollection.find({ _id: { $in: ids } });
// query case insensitive
exports.getChannelsCount = title => channelsCollection.count({ title: { $regex: new RegExp(`^${title}$`, "i") } });

exports.addChannel = channel => channelsCollection.insert(channel);

exports.deleteChannel = _id => channelsCollection.remove({ _id });

exports.getChannelsByTitle = title => channelsCollection.find({ title: { $regex: new RegExp(title, "i") } });