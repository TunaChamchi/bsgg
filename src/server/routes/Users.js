const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const schedule = require('node-schedule');

const Rank = require('../schemas/rank');
const RankStat = require('../schemas/rankStat');
const UserStat = require('../schemas/userStat');
const User = require('../schemas/user');
const Match = require('../schemas/match');
const character = require('../../data/inGame/character.json');

const router = express.Router();

const searchSeason = [0, 1];
const searchTeamMode = [1, 2, 3];
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

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
    const users = await UserStat.find({});
    res.json(users);
});

router.get('/userGame', async (req, res, next) => {
    const userNum = parseInt(req.query.userNum);
    await getUserData(userNum);

    res.send('{ "code": 200, "message": "Success" }');
});

module.exports = router;

const getUserData = async (userNum) => {
    // nickname으로 아이디 검색하게 변경
    let nickname = '';

    const matchLately = await Match.findOne({ userNum:userNum }, null, { sort: { startDtm:-1 } });
    let lately;

    if (matchLately !== null)
        lately = new Date(matchLately['startDtm']);
    else
        lately = new Date('2020-01-01');

    ///console.log(lately);

    let isChange = false;
    let next;
    while(true) {
        const _matchs = await getUserGame(userNum, next);
        const matchs = _matchs.data.userGames;
        next = _matchs.data.next;

        const insertMatchs = matchs.filter(m => new Date(m['startDtm']) > lately);

        if (insertMatchs.length !== 0) {
            isChange = true;
            insertMatchs.forEach(m => {
                let equipmentOrder = '';
                let skillOrder = '';

                for (const key in m['equipment']) {
                    equipmentOrder += m['equipment'][key] + '_';
                }
                for (const key in m['skillOrderInfo']) {
                    skillOrder += m['skillOrderInfo'][key] + '_';
                }

                m['equipmentOrder'] = equipmentOrder;
                m['skillOrder'] = skillOrder;

                new Match(m).save();
            })
        } else {
            break;
        }

        if (!next)
            break;
    }

    //if (!isChange) {
    //    console.log('not Change');
    //    return null;
    //}

    const userStat = (await getUserStats1(userNum))[0];
    delete userStat['_id'];
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

        // mmr 값 가져오기
        if (seasonId === 1) {
            const _user = await getUserStats(userNum, seasonId);//.userStats;
            const user = _user.data.userStats;
            if (user !== undefined) {
                for (let j = 0 ; j < user.length ; j++) {
                    const _userStats = user[j];
                    const teamMode = _userStats['matchingTeamMode'];

                    userStat['nickname'] = _userStats['nickname'];

                    try {
                        userStat['seasonStats'][seasonId][teamMode]['mmr'] = _userStats['mmr'];
                    } catch (err) {
                        console.log(userStat['nickname'], userNum, seasonId, teamMode);
                        await getUserData(userNum);
                        return;
                    }
                }
            }
        }
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
                        { $gte: [ '$gameRank', 3 ] },
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
                        { $gte: [ '$gameRank', 3 ] },
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
                total: { $sum: 1 },
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
                        { $gte: [ '$gameRank', 3 ] },
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
    { $match: { userNum: userNum } },
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
                        { $gte: [ '$gameRank', 3 ] },
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


router.post('/gameMatch', async (req, res, next) => {
    //try {
        const ranks = await Rank.find({}, { _id:0, userNum: 1 }, { sort : { _id: -1 }});
        const ranksList = [];

        for (let i = 0 ; i < ranks.length ; i++) {
            const _rank = ranks[i];

            if (ranksList.includes(_rank['userNum']))
                continue;

            ranksList.push(_rank['userNum']);
            
            getGameMatch(_rank['userNum']);
            await sleep(250);

            if (i%100 === 0)
                console.log(i);
        }
        //}

        res.send('{ "code": 200, "message": "Success" }');
    /*} catch (err) {
        res.send('{"code": 500, "message": "'+err+'"}');
    }*/
});

const getGameMatch = async (userNum) => {
    const matchLately = await Match.find({ userNum:userNum }, null, { sort: { startDtm:-1 } });
    let lately;

    if (matchLately.length !== 0)
        lately = new Date(matchLately['startDtm']);
    else
        lately = new Date('2020-01-01');

    console.log(lately);

    let isChange = false;
    let next;
    while(true) {
        const _matchs = await getUserGame(userNum, next);
        const matchs = _matchs.data.userGames;
        next = _matchs.data.next;

        const insertMatchs = matchs.filter(m => new Date(m['startDtm']) > lately);

        if (insertMatchs.length !== 0) {
            isChange = true;
            insertMatchs.forEach(m => {
                let equipmentOrder = '_';
                let skillOrder = '_';

                for (const key in m['equipment']) {
                    equipmentOrder += m['equipment'][key] + '_';
                }
                for (const key in m['skillOrderInfo']) {
                    skillOrder += m['skillOrderInfo'][key] + '_';
                }

                m['equipmentOrder'] = equipmentOrder;
                m['skillOrder'] = skillOrder;

                new Match(m).save();
            })
        } else {
            break;
        }

        if (!next)
            break;
    }
}

router.post('/userStat', async (req, res, next) => {
    //try {
        const ranks = await Rank.find({}, { _id:0, userNum: 1 }, { sort : { _id: -1 }});
        const ranksList = [];

        for (let i = 0 ; i < ranks.length ; i++) {
            const _rank = ranks[i];

            if (ranksList.includes(_rank['userNum']))
                continue;

            ranksList.push(_rank['userNum']);
            
            getUserData(_rank['userNum']);
            await sleep(100);

            if (i%100 === 0)
                console.log(i);
        }
        //}

        res.send('{ "code": 200, "message": "Success" }');
    /*} catch (err) {
        res.send('{"code": 500, "message": "'+err+'"}');
    }*/
});