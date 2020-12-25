const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const Rank = require('../schemas/rank');
const Users = require('../schemas/users');

const router = express.Router();

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}
const getRank = async (seasonId, matchingTeamMode) => {
    try {
        return await axios.get('https://open-api.bser.io/v1/rank/top/'+seasonId+'/'+matchingTeamMode, {
                headers: {
                    'x-api-key': 'sWNQXtP4Po3Sd1dWWzHqT5EZSKQfj8478omeZWg0'
                }
        });
    } catch (error) {
        console.log(error);
        await sleep(50);
        return await axios.get('https://open-api.bser.io/v1/rank/top/'+seasonId+'/'+matchingTeamMode, {
                headers: {
                    'x-api-key': 'sWNQXtP4Po3Sd1dWWzHqT5EZSKQfj8478omeZWg0'
                }
        });
    }
};
const getUserStats = async (userNum, seasonId) => {
    try {
        return await axios.get('https://open-api.bser.io/v1/user/stats/'+userNum+'/'+seasonId, {
                headers: {
                    'x-api-key': 'sWNQXtP4Po3Sd1dWWzHqT5EZSKQfj8478omeZWg0'
                }
        });
    } catch (error) {
        console.log(error);
        await sleep(50);
        return await axios.get('https://open-api.bser.io/v1/user/stats/'+userNum+'/'+seasonId, {
                headers: {
                    'x-api-key': 'sWNQXtP4Po3Sd1dWWzHqT5EZSKQfj8478omeZWg0'
                }
        });
    }
};
const getUserGame = async (userNum, next) => {
    try {
        return await axios.get('https://open-api.bser.io/v1/user/game/'+userNum + (next?'?next'+next:''), {
                headers: {
                    'x-api-key': 'sWNQXtP4Po3Sd1dWWzHqT5EZSKQfj8478omeZWg0'
                }
        });
    } catch (error) {
        console.log(error);
        await sleep(50);
        return await axios.get('https://open-api.bser.io/v1/user/game/'+userNum + (next?'?next'+next:''), {
                headers: {
                    'x-api-key': 'sWNQXtP4Po3Sd1dWWzHqT5EZSKQfj8478omeZWg0'
                }
        });
    }
};

router.get('/', async (req, res, next) => {
    const mode =  parseInt(req.query.mode);
    const skip =  parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    console.log(req.query);
    //const ranks = await Rank.find({matchingTeamMode:mode}, null, {sort:{rank:1}});
    //const users = await Users.find({index:/1+a+/i}, null, {sort:{rank:1}});
    const ranks = await Rank.aggregate([
        { $match: { matchingTeamMode: mode } },
        { $skip:  skip },
        { $limit: limit },
        { 
            $lookup: {
                from: 'users',
                localField: 'userNum',
                foreignField: 'userNum',
                as: 'stat'
            }
        },
    ]);
    
    res.json(ranks);
});

router.post('/', async (req, res, next) => {
    try {
        await Rank.deleteMany({matchingTeamMode:[1, 2, 3]});

        for (let index = 1; index < 4; index++) {
            const _rank = await getRank(1, index);
            const ranks = _rank.data.topRanks;

            for (let i = 0 ; i < ranks.length ; i++) {
                const r = ranks[i];
                r['matchingTeamMode'] = index;
                new Rank(r).save();
            }
        }

        res.send('{ "code": 200, "message": "Success" }');
    } catch (err) {
        res.send('{"code": 500, "message": "'+err+'"}');
    }
});

router.post('/users', async (req, res, next) => {
    //try {
        const ranks = await Rank.find({});

        for (let i = 0 ; i < ranks.length ; i++) {
            const user1 = await getUserStats(ranks[i]['userNum'], 1);//.userStats;
            const user0 = await getUserStats(ranks[i]['userNum'], 0);//.userStats;

            if (user1.data.userStats !== undefined) {
                for (let j = 0 ; j < user1.data.userStats.length ; j++) {
                    const userStats = user1.data.userStats[j];
                    const _userStats = { };
                    _userStats['index'] = userStats['userNum'] + '_' + userStats['seasonId'] + '_' + userStats['matchingMode'] + '_' + userStats['matchingTeamMode'];
                    _userStats['userNum'] = userStats['userNum'];

                    const characterStats = { };
                    userStats['characterStats'].forEach(char => {
                        const c_number = char['characterCode'];
                        characterStats[c_number] = {
                            totalGames: char['characterCode'],
                            usages: char['usages'],
                            maxKillings: char['maxKillings'],
                            top3: char['top3'],
                            top3Rate: char['top3Rate']
                        };
                    });
                    _userStats['characterStats'] = characterStats;
                    _userStats['averageAssistants'] = userStats['averageAssistants'];
                    _userStats['averageHunts'] = userStats['averageHunts'];
                    _userStats['averageKills'] = userStats['averageKills'];
                    _userStats['averageRank'] = userStats['averageRank'];
                    _userStats['totalGames'] = userStats['totalGames'];
                    _userStats['totalWins'] = userStats['totalWins'];
                    _userStats['top1'] = userStats['top1'];
                    _userStats['top3'] = userStats['top3'];

                    await Users.findOneAndUpdate({ index: _userStats['index'] }, _userStats, { upsert:true });
                }
            }

            if (user0.data.userStats !== undefined) {
                for (let j = 0 ; j < user0.data.userStats.length ; j++) {
                    const userStats = user0.data.userStats[j];
                    const _userStats = { };
                    _userStats['index'] = userStats['userNum'] + '_' + userStats['seasonId'] + '_' + userStats['matchingMode'] + '_' + userStats['matchingTeamMode'];
                    _userStats['userNum'] = userStats['userNum'];

                    const characterStats = { };
                    userStats['characterStats'].forEach(char => {
                        const c_number = char['characterCode'];
                        characterStats[c_number] = {
                            totalGames: char['characterCode'],
                            usages: char['usages'],
                            maxKillings: char['maxKillings'],
                            top3: char['top3'],
                            top3Rate: char['top3Rate']
                        };
                    });
                    _userStats['characterStats'] = characterStats;
                    _userStats['averageAssistants'] = userStats['averageAssistants'];
                    _userStats['averageHunts'] = userStats['averageHunts'];
                    _userStats['averageKills'] = userStats['averageKills'];
                    _userStats['averageRank'] = userStats['averageRank'];
                    _userStats['totalGames'] = userStats['totalGames'];
                    _userStats['totalWins'] = userStats['totalWins'];
                    _userStats['top1'] = userStats['top1'];
                    _userStats['top3'] = userStats['top3'];

                    await Users.findOneAndUpdate({ index: _userStats['index'] }, _userStats, { upsert:true });
                }
            }

            if (i%100 === 0)
                console.log(i);
        }
        //}

        res.send('{ "code": 200, "message": "Success" }');
    /*} catch (err) {
        res.send('{"code": 500, "message": "'+err+'"}');
    }*/
});





module.exports = router;