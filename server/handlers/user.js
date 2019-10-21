const db = require('../db');
const userCollection = db.get('users');

exports.addUser = user => userCollection.insert(user);

exports.getUserByEmail = email => userCollection.findOne({ email });

exports.getUserById = _id => userCollection.findOne({ _id });

exports.getUsersCount = userName => userCollection.count({ username: { $regex: new RegExp(`^${userName}$`, "i") } });

exports.addChannel = (userId, channelId) => userCollection.findOneAndUpdate({ _id: userId }, { $push: { channels: channelId } });