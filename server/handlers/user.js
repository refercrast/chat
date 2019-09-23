const db = require('../db');
const userCollection = db.get('users');

exports.addUser = user => userCollection.insert(user);

exports.getUserByUserName = username => userCollection.findOne({ username });

exports.getUserById = _id => userCollection.findOne({ _id });

exports.getUsersCount = userName => userCollection.count({ username: { $regex: new RegExp(`^${userName}$`, "i") } });