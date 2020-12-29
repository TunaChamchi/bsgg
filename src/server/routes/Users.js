const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const schedule = require('node-schedule');

const UserStat = require('../schemas/userStat');
const User = require('../schemas/user');
const Match = require('../schemas/match');
const { response } = require('express');

const router = express.Router();

const searchSeason = [0, 1];
const searchTeamMode = [1, 2, 3];
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

// 6시 0분에 전체 유저 전적 검색
schedule.scheduleJob('0 0 6 * * *', async () => {
    const users = await User.find({}, { _id:0, userNum: 1 }, { sort : { updateDate: 1 }});

    for (let i = 0 ; i < users.length ; i++) {        
        await getUserData(users['userNum']);
    }

    console.log(Date.now() + ' : GetUserData Complete', users.length);
})

const getUserStats = async (userNum, seasonId) => {
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
const getUserGame = async (userNum, next) => {
    while (true) {
        try {
            return await axios.get('https://open-api.bser.io/v1/user/games/'+userNum + (next?'?next='+next:''), {
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

// 메인 화면 유저 이름 검색
router.get('/', async (req, res, next) => {
    console.log('/', req.query);
    const search = req.query.search;


    const users = await UserStat.find({});
    res.json(users);
});

// 유저 검색 DB
router.get('/:userName', async (req, res, next) => {
    console.log('/:userName', req.params);
    const userName = req.params.userName;

    const user = await User.findOne({ nickname: userName });
    const userStat = await UserStat.findOne({ nickname: userName });
    const response = {
        user:user,
        userStat:userStat
    }
    res.json(response);
});

// 유저 전적 검색 DB
router.get('/:userNum/match', async (req, res, next) => {
    console.log('/:userNum/match', req.params, req.query);
    const userNum = req.params.userNum;
    const matchMode =  parseInt(req.query.matchMode) || 0;
    const teamMode =  parseInt(req.query.teamMode) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const skip =  parseInt(req.query.skip) || 0;

    const query = {
        userNum: userNum
    }
    if (matchMode !== 0)
        query['seasonId'] = matchMode;
    if (teamMode !== 0)
        query['matchingTeamMode'] = teamMode;

    const match = await Match.find(
        query, 
        null,
        {
            skip: skip,
            limit: limit,
            sort: { startDtm: -1 }
        }
    );
    
    res.json(match);
});

// 유저 전적 검색 API
router.post('/userData', async (req, res, next) => {
    const userNum = parseInt(req.query.userNum);
    await getUserData(userNum);

    res.send('{ "code": 200, "message": "Success" }');
});

module.exports = router;

const getUserData = async (userNum) => {
    const matchLately = await Match.findOne({ userNum:userNum }, null, { sort: { startDtm:-1 } });
    let lately;

    if (matchLately !== null)
        lately = new Date(matchLately['startDtm']);
    else
        lately = new Date('2020-01-01');

    let isChange = false;
    let next;
    while(true) {
        const _matchs = await getUserGame(userNum, next);
        const matchs = _matchs.data.userGames;
        next = _matchs.data.next;

        const insertMatchs = matchs.filter(m => new Date(m['startDtm']) > lately);

        if (insertMatchs.length !== 0) {
            isChange = true;

            for (var i = 0 ; i < insertMatchs.length ; i++) {
                const m = insertMatchs[i];
                let equipmentOrder = '_';
                let skillOrder = '_';

                for (const key in m['equipment']) {
                    equipmentOrder += m['equipment'][key] + '_';
                }

                if (m['characterLevel'] >= 16) {
                    const keys = Object.keys(m['skillOrderInfo']);

                    for (var j = 0 ; j < 16 ; ) {
                        const key = keys[j];
                        const skillCode = parseInt(m['skillOrderInfo'][key]);

                        if (skillCode / 1000000 !== 3) {
                            skillOrder += skillCode + '_';
                            j++;
                        }
                    }
                }

                m['equipmentOrder'] = equipmentOrder;
                m['skillOrder'] = skillOrder;

                const _ = await new Match(m).save();
            }
        } else {
            break;
        }

        if (!next)
            break;
    }

    if (!isChange) {
        return null;
    }

    const userStat = (await getUserStats1(userNum))[0];
    try {
        delete userStat['_id'];
    } catch (err) {
        console.log('getUserData : ', userNum, userStat);
        return;
    }
    userStat['userNum'] = userNum;
    
    userStat['seasonStats'] = {};
    for (var i = 0 ; i < searchSeason.length ; i++) {
        const seasonId = searchSeason[i];
        userStat['seasonStats'][seasonId] = {};

        const teamModeStats = await getUserStats2(userNum, seasonId);
        for (var j = 0 ; j < teamModeStats.length ; j++) {
            const teamModeStat = teamModeStats[j];
            const teamMode = teamModeStat['_id'];
            delete teamModeStat['_id'];
            teamModeStat['characterStats'] = {};

            const characterStats = await getUserStats3(userNum, seasonId, teamMode);
            teamModeStat['mostCharacter'] = characterStats[0]['_id'];
            for (var k = 0 ; k < characterStats.length ; k++) {
                const characterStat = characterStats[k];
                const characterCode = characterStat['_id'];
                delete characterStat['_id'];

                teamModeStat['characterStats'][characterCode] = characterStat;
            }
            
            userStat['seasonStats'][seasonId][teamMode] = teamModeStat;
        }

        // mmr / rankPercent 값 가져오기
        //if (seasonId === 1) {
            const _user = await getUserStats(userNum, seasonId);//.userStats;
            const user = _user.data.userStats;
            if (user !== undefined) {
                for (let j = 0 ; j < user.length ; j++) {
                    const _userStats = user[j];
                    const teamMode = _userStats['matchingTeamMode'];

                    userStat['nickname'] = _userStats['nickname'];

                    try {
                        userStat['seasonStats'][seasonId][teamMode]['mmr'] = _userStats['mmr'];
                        userStat['seasonStats'][seasonId][teamMode]['rankPercent'] = _userStats['rankPercent'];
                    } catch (err) {
                        console.log('getUserData : ', userStat['nickname'], userNum, seasonId, teamMode);
                        await getUserData(userNum);
                        return;
                    }
                }
            }
        //}
    }
    
    const characterStats = await getCharacterStats(userNum);
    userStat['mostCharacter'] = characterStats[0]['_id'];
    userStat['characterStats'] = {};
    for (var i = 0 ; i < characterStats.length ; i++) {
        const characterStat = characterStats[i];
        const characterCode = characterStat['_id'];
        delete characterStat['_id'];

        userStat['characterStats'][characterCode] = characterStat;
    }

    await UserStat.findOneAndUpdate({ userNum: userStat['userNum'] }, userStat, { upsert:true });

    // nickname 검색 생기면 위로 이동
    const user = {
        userNum: userNum,
        nickname: userStat['nickname'],
        updateDate: Date.now()
    }
    await User.findOneAndUpdate({ userNum: user['userNum'] }, user, { upsert:true });
}

const getUserStats1 = async (userNum) => {
    return await Match.aggregate([
    { $match: { userNum: userNum } },
        { 
            $group: {
                _id: '$userNum',
                totalGames: { $sum: 1 },
                totalKills:{ $sum: '$playerKill' },
                maxKill: { $max: '$playerKill' },
                totalAssistants:{ $sum: '$playerAssistant' },
                totalMonsterKills:{ $sum: '$monsterKill' },
                rank:{ $avg: '$gameRank' },
                top1: { 
                  $sum: {
                    $cond : [
                        { $eq: [ '$gameRank', 1 ] },
                        1, 
                        0
                    ]
                  }
                },
                top3: { 
                  $sum: {
                    $cond : [
                        { $lte: [ '$gameRank', 3 ] },
                        1, 
                        0
                    ]
                  }
                },
            }
        }
    ]);
}

const getUserStats2 = async (userNum, seasonId) => {
    return await Match.aggregate([
    { $match: { userNum: userNum, seasonId: seasonId } },
        { 
            $group: {
                _id: '$matchingTeamMode',
                totalGames: { $sum: 1 },
                totalKills:{ $sum: '$playerKill' },
                maxKill: { $max: '$playerKill' },
                totalAssistants:{ $sum: '$playerAssistant' },
                totalMonsterKills:{ $sum: '$monsterKill' },
                rank:{ $avg: '$gameRank' },
                top1: { 
                  $sum: {
                    $cond : [
                        { $eq: [ '$gameRank', 1 ] },
                        1, 
                        0
                    ]
                  }
                },
                top3: { 
                  $sum: {
                    $cond : [
                        { $lte: [ '$gameRank', 3 ] },
                        1, 
                        0
                    ]
                  }
                },
            }
        },
        { $sort: { _id: -1 } }
    ]);
}

const getUserStats3 = async (userNum, seasonId, matchingTeamMode) => {
    return await Match.aggregate([
    { $match: { userNum: userNum, seasonId: seasonId, matchingTeamMode: matchingTeamMode } },
        { 
            $group: {
                _id: '$characterNum',
                totalGames: { $sum: 1 },
                totalKills:{ $sum: '$playerKill' },
                maxKill: { $max: '$playerKill' },
                totalAssistants:{ $sum: '$playerAssistant' },
                totalMonsterKills:{ $sum: '$monsterKill' },
                rank:{ $avg: '$gameRank' },
                top1: { 
                  $sum: {
                    $cond : [
                        { $eq: [ '$gameRank', 1 ] },
                        1, 
                        0
                    ]
                  }
                },
                top3: { 
                  $sum: {
                    $cond : [
                        { $lte: [ '$gameRank', 3 ] },
                        1, 
                        0
                    ]
                  }
                },
            }
        },
        { $sort: { totalGames: -1 } }
    ]);
}

const getCharacterStats = async (userNum) => {
    return await Match.aggregate([
    { $match: { userNum: userNum, seasonId: 1 } },
        { 
            $group: {
                _id: '$characterNum',
                totalGames: { $sum: 1 },
                totalKills:{ $sum: '$playerKill' },
                maxKill: { $max: '$playerKill' },
                totalAssistants:{ $sum: '$playerAssistant' },
                totalMonsterKills:{ $sum: '$monsterKill' },
                rank:{ $avg: '$gameRank' },
                top1: { 
                  $sum: {
                    $cond : [
                        { $eq: [ '$gameRank', 1 ] },
                        1, 
                        0
                    ]
                  }
                },
                top3: { 
                  $sum: {
                    $cond : [
                        { $lte: [ '$gameRank', 3 ] },
                        1, 
                        0
                    ]
                  }
                },
            }
        },
        { $sort: { totalGames: -1 } }
    ]);
}

router.post('/userStat', async (req, res, next) => {
    console.log(new Date().toString().slice(16,24), ': GetUserStat Start');

    const users = await User.find({}, { _id:0, userNum: 1 }, { sort : { updateDate: 1 }});

    for (let i = 0 ; i < users.length ; i++) {        
        await getUserData(users[i]['userNum']);
    }

    console.log(new Date().toString().slice(16,24), ': GetUserStat Complete', users.length);

    res.json("{ 'data': Date.now() }")
});