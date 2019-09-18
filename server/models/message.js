const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    created: {
        type: Number,
        default: Date.now
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
    }
});

module.exports = mongoose.model('Message', messageSchema);