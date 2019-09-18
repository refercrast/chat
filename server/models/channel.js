const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    created: {
       type: Number,
       default: Date.now
    },
    messages: [
       {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Message'
       }
    ]
});

module.exports = mongoose.model('Channel', channelSchema);