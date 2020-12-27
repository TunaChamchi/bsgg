const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const schedule = require('node-schedule');

const Rank = require('../schemas/rank');
const RankStat = require('../schemas/rankStat');
const UserStat = require('../schemas/userStat');
const User = require('../schemas/user');

const router = express.Router();

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

schedule.scheduleJob('* * 8 * * *', async () => {
    await Rank.deleteMany({matchingTeamMode:[1, 2, 3]});

    const numList = [];
    for (let index = 1; index < 4; index++) {
        const resRank = await getRank(1, index);
        const ranks = resRank.data.topRanks;

        for (let i = 0 ; i < ranks.length ; i++) {
            const rank = ranks[i];
            rank['matchingTeamMode'] = index;
            let _ = await new Rank(rank).save();

            if (numList.includes(rank['userNum']))
                continue;
            else 
            numList.push(rank['userNum']);

            sleep(200);
            const resRankStats = await getRankStats(rank['userNum'], 1);
            const rankStats = resRankStats.data.rankStat;
        
            if (rankStats !== undefined) {
                for (let j = 0 ; j < rankStats.length ; j++) {
                    const rankStat = rankStats[j];
                    nickname = rankStat['nickname'];
        
                    const _rankStat = { };
                    _rankStat['index'] = rankStat['userNum'] + '_' + rankStat['seasonId'] + '_' + rankStat['matchingTeamMode'];
                    _rankStat['userNum'] = rankStat['userNum'];
        
                    const most = rankStat['characterStats'].sort((c1, c2) => c2['totalGames']-c1['totalGames'])[0];
                    
                    _rankStat['mostCharacter'] = most['characterCode'];
                    _rankStat['mmr'] = rankStat['mmr'];
                    _rankStat['averageAssistants'] = rankStat['averageAssistants'];
                    _rankStat['averageHunts'] = rankStat['averageHunts'];
                    _rankStat['averageKills'] = rankStat['averageKills'];
                    _rankStat['averageRank'] = rankStat['averageRank'];
                    _rankStat['totalGames'] = rankStat['totalGames'];
                    _rankStat['totalWins'] = rankStat['totalWins'];
                    _rankStat['top1'] = rankStat['top1'];
                    _rankStat['top3'] = rankStat['top3'];
        
                    await RankStat.findOneAndUpdate({ index: _rankStat['index'] }, _rankStat, { upsert:true });
                }
            }
            
            const user = await User.find({ userNum: rank['userNum'] });
            if (user.length === 0) {
                const _user = {
                    userNum: rank['userNum'],
                    nickname: rank['nickname'],
                    updateDate: new Date('2020-01-01')
                }
                _ = await new User(_user).save();
            }
        }
    }

    console.log(Date.now() + ' : GetUserData Complete', users.length);
})

const getRank = async (seasonId, matchingTeamMode) => {
    while (true) {
        try {
            return await axios.get('https://open-api.bser.io/v1/rank/top/'+seasonId+'/'+matchingTeamMode, {
                headers: {
                    'x-api-key': 'sWNQXtP4Po3Sd1dWWzHqT5EZSKQfj8478omeZWg0'
                }
            });
        } catch (error) {
            if (error.response.status !== 429) return;
            
            await sleep(250);
        }
    }
};
const getRankStats = async (userNum, seasonId) => {
    while (true) {
        try {
            return await axios.get('https://open-api.bser.io/v1/user/stats/'+userNum+'/'+seasonId, {
                    headers: {
                        'x-api-key': 'sWNQXtP4Po3Sd1dWWzHqT5EZSKQfj8478omeZWg0'
                    }
            });
        } catch (error) {
            if (error.response.status !== 429) return;
            
            await sleep(250);
        }
    }
};

// 랭크 검색
router.get('/', async (req, res, next) => {
    console.log(req.query);
    const mode =  parseInt(req.query.mode);
    const limit = parseInt(req.query.limit);
    const search = req.query.search;

    let ranks;
    if (search) {
        const user = await Rank.findOne({ nickname: search, matchingTeamMode: mode });
        if (user) {
            const rank = parseInt(user['rank']);
            const skip =  parseInt(rank/100)*100+3;
            
            console.log('rank', rank);
            console.log('skip', skip);

            ranks = await Rank.aggregate([
                { $match: { matchingTeamMode: mode } },
                { $skip:  skip },
                { $limit: 100 },
                { 
                    $lookup: {
                        from: 'rankstats',
                        localField: 'userNum',
                        foreignField: 'userNum',
                        as: 'stat'
                    }
                }
            ]);
        } else {
            res.json([]);
        }
    } else {
        const skip =  parseInt(req.query.skip);

        ranks = await Rank.aggregate([
            { $match: { matchingTeamMode: mode } },
            { $skip:  skip },
            { $limit: limit },
            { 
                $lookup: {
                    from: 'rankstats',
                    localField: 'userNum',
                    foreignField: 'userNum',
                    as: 'stat'
                }
            }
        ]);
    }
    
    res.json(ranks);
});

// 장인 랭크
router.get('/character', async (req, res, next) => {
    console.log(req.query);
    const code =  parseInt(req.query.characterCode);
    const characterRank = await UserStat.find(
        { ['characterStats.'+code]: {$exists:true} }, 
        { _id: 0, userNum: 1, ['characterStats.'+code]: 1, nickname: 1 }, 
        { 
            limit: 50,
            sort: { ['characterStats.'+code+'.totalGames']: -1 }
        });
    
    res.json(characterRank);
});

module.exports = router;