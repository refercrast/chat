const db = require('../db');
const userCollection = db.get('users');

exports.addUser = user => userCollection.insert(user);

exports.getUserByEmail = email => userCollection.findOne({ email });

exports.getUserById = _id => userCollection.findOne({ _id });

exports.getUsersCount = email => userCollection.count({ email: { $regex: new RegExp(`^${email}$`, "i") } });

exports.addChannel = (userId, channelId) => userCollection.findOneAndUpdate({ _id: userId }, { $push: { channels: channelId } });