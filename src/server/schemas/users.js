const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    index: {
        type: String,
        required: true,
        unique: true
    },
    totalGames: {
        type: Number,
        required: true
    },
    totalWins: {
        type: Number,
        required: true
    },
    rankPercent: {
        type: Number,
        required: true
    },
    averageRank: {
        type: Number,
        required: true
    },
    averageKills: {
        type: Number,
        required: true
    },
    averageAssistants: {
        type: Number,
        required: true
    },
    averageHunts: {
        type: Number,
        required: true
    },
    top1: {
        type: Number,
        required: true
    },
    top3: {
        type: Number,
        required: true
    },
    characterStats: {
        type: Object,
        required: true
    },
}, {
    versionKey: false,
    strict: false
})

module.exports = mongoose.model('users', userSchema);