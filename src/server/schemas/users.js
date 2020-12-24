const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    seasonId: {
        type: Number,
        required: true
    },
    userNum: {
        type: Number,
        required: true
    },
    matchingMode: {
        type: Number,
        required: true
    },
    matchingTeamMode: {
        type: Number,
        required: true
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
        type: String,
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
        type: Array,
        required: true
    },
})

module.exports = mongoose.model('users', userSchema);