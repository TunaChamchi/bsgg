const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const Rank = require('../schemas/rank');
const UserStat = require('../schemas/userStat');
const User = require('../schemas/user');
const Match = require('../schemas/match');

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
const getRankUser = async (userNum, seasonId, matchingTeamMode) => {
    try {
        return await axios.get('https://open-api.bser.io/v1/rank/top/'+userNum+'/'+seasonId+'/'+matchingTeamMode, {
                headers: {
                    'x-api-key': 'sWNQXtP4Po3Sd1dWWzHqT5EZSKQfj8478omeZWg0'
                }
        });
    } catch (error) {
        console.log(error);
        await sleep(50);
        return await axios.get('https://open-api.bser.io/v1/rank/top/'+userNum+'/'+seasonId+'/'+matchingTeamMode, {
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
        return await axios.get('https://open-api.bser.io/v1/user/games/'+userNum + (next?'?next='+next:''), {
                headers: {
                    'x-api-key': 'sWNQXtP4Po3Sd1dWWzHqT5EZSKQfj8478omeZWg0'
                }
        });
    } catch (error) {
        console.log(error);
        await sleep(50);
        return await axios.get('https://open-api.bser.io/v1/user/games/'+userNum + (next?'?next='+next:''), {
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
    //const users = await UserStat.find({index:/1+a+/i}, null, {sort:{rank:1}});
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
router.get('/chacter', async (req, res, next) => {
    const mode =  parseInt(req.query.mode);
    const character =  parseInt(req.query.character);
    const skip =  parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    console.log(req.query);
    //const ranks = await Rank.find({matchingTeamMode:mode}, null, {sort:{rank:1}});
    //const users = await UserStat.find({index:/1+a+/i}, null, {sort:{rank:1}});
    const ranks = await UserStat.file({ index: '*_1_1_'+mode }, null, { sort: { ['characterStats.'+character+'totalGames']:-1 }})
    
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

router.post('/userStat', async (req, res, next) => {
    //try {
        const ranks = await Rank.find({}, { _id:0, userNum: 1 });
        const ranksList = [];

        for (let i = 0 ; i < ranks.length ; i++) {
            const _rank = ranks[i];

            if (ranksList.includes(_rank['userNum']))
                continue;

            ranksList.push(_rank['userNum']);
            
            getUserData(ranks[i]['userNum']);
            await sleep(500);

            if (i%100 === 0)
                console.log(i);
        }
        //}

        res.send('{ "code": 200, "message": "Success" }');
    /*} catch (err) {
        res.send('{"code": 500, "message": "'+err+'"}');
    }*/
});


router.get('/userGame', async (req, res, next) => {
    const userNum = parseInt(req.query.userNum);
    await getUserData(userNum);

    res.send('{ "code": 200, "message": "Success" }');
});

const searchSession = [0, 1]
const  getUserData = async (userNum) => {
    // nickname으로 아이디 검색하게 변경
    let nickname = '';

    for (var i = 0 ; i < searchSession.length ; i++) {
        const sessionId = searchSession[i];
        const _user = await getUserStats(userNum, sessionId);//.userStats;
        const user = _user.data.userStats;

        if (user !== undefined) {
            for (let j = 0 ; j < user.length ; j++) {
                const userStats = user[j];
                nickname = userStats['nickname'];

                const _userStats = { };
                _userStats['index'] = userStats['userNum'] + '_' + userStats['seasonId'] + '_' + userStats['matchingMode'] + '_' + userStats['matchingTeamMode'];
                _userStats['userNum'] = userStats['userNum'];

                const characterStats = { };
                userStats['characterStats'].forEach(char => {
                    const c_number = char['characterCode'];
                    characterStats[c_number] = {
                        totalGames: char['totalGames'],
                        usages: char['usages'],
                        maxKillings: char['maxKillings'],
                        top3: char['top3'],
                        top3Rate: char['top3Rate']
                    };
                });
                _userStats['characterStats'] = characterStats;
                _userStats['mmr'] = userStats['mmr'];
                _userStats['averageAssistants'] = userStats['averageAssistants'];
                _userStats['averageHunts'] = userStats['averageHunts'];
                _userStats['averageKills'] = userStats['averageKills'];
                _userStats['averageRank'] = userStats['averageRank'];
                _userStats['totalGames'] = userStats['totalGames'];
                _userStats['totalWins'] = userStats['totalWins'];
                _userStats['top1'] = userStats['top1'];
                _userStats['top3'] = userStats['top3'];

                await UserStat.findOneAndUpdate({ index: _userStats['index'] }, _userStats, { upsert:true });
            }
        }        
    }

    console.log('nickname', nickname);

    const matchLately = await Match.findOne({ userNum:userNum }, null, { sort: { startDtm:-1 } });
    let lately;

    if (matchLately !== null)
        lately = matchLately['startDtm'];
    else
        lately = new Date('2020-01-01');

    console.log(lately);

    let next;
    while(true) {
        const _matchs = await getUserGame(userNum, next);
        const matchs = _matchs.data.userGames;
        next = _matchs.data.next;

        const insertMatchs = matchs.filter(m => new Date(m['startDtm']) > lately);

        if (insertMatchs.length !== 0) {
            insertMatchs.forEach(m => 
                new Match(m).save()
            )
        } else {
            break;
        }

        if (!next)
            break;
    }

    // nickname 검색 생기면 위로 이동
    const user = {
        userNum: userNum,
        nickname: nickname,
        updateDate: Date.now()
    }
    await User.findOneAndUpdate({ userNum: user['userNum'] }, user, { upsert:true });
}



module.exports = router;