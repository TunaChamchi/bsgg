const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    seasonId: {
        type: Number,
        required: true
    },
    userNum: {
        type: Number,
        required: true,
        unique: true
    },
    matchingMode: {
        type: Number,
        required: true
    },
    matchingTeamMode: {
        type: Number,
        required: true
    },
    mmr: {
        type: Number,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    rank: {
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
    averageRank: {
        type: Number,
        required: true
    },
    averageKills: {
        type: Number,
        required: true
    },
    averageHunts: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('users', userSchema);