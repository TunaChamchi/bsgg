const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    userNum: {
        type: Number,
        required: true,
        unique: true
    },
    nickname: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        required: true
    },
    mmr: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('rank', userSchema);