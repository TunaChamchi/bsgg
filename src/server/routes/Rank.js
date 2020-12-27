const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const Rank = require('../schemas/rank');
const RankStat = require('../schemas/rankStat');
const UserStat = require('../schemas/userStat');
const User = require('../schemas/user');
const Match = require('../schemas/match');
const character = require('../../data/inGame/character.json');

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
router.get('/character', async (req, res, next) => {
    console.log(req.query);
    const code =  parseInt(req.query.characterCode);
    const characterRank = await UserStat.find(
        { ['characterStats.'+code]: {$exists:true} }, 
        { _id: 0, userNum: 1, ['characterStats.'+code]: 1, nickname: 1 }, 
        { 
            limit: 50,
            sort: { ['characterStats.'+code]: -1 }
        });
    
    res.json(characterRank);
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

router.post('/rankStat', async (req, res, next) => {
    //try {
        const ranks = await Rank.find({}, { _id:0, userNum: 1 });
        const ranksList = [];

        for (let i = 0 ; i < ranks.length ; i++) {
            const _rank = ranks[i];

            if (ranksList.includes(_rank['userNum']))
                continue;

            ranksList.push(_rank['userNum']);
            
            const _user = await getUserStats(_rank['userNum'], 1);//.userStats;
            const user = _user.data.userStats;
        
            if (user !== undefined) {
                for (let j = 0 ; j < user.length ; j++) {
                    const userStats = user[j];
                    nickname = userStats['nickname'];
        
                    const _userStats = { };
                    _userStats['index'] = userStats['userNum'] + '_' + userStats['seasonId'] + '_' + userStats['matchingTeamMode'];
                    _userStats['userNum'] = userStats['userNum'];
        
                    const most = userStats['characterStats'].sort((c1, c2) => c2['totalGames']-c1['totalGames'])[0];
                    
                    _userStats['mostCharacter'] = most['characterCode'];
                    _userStats['mmr'] = userStats['mmr'];
                    _userStats['averageAssistants'] = userStats['averageAssistants'];
                    _userStats['averageHunts'] = userStats['averageHunts'];
                    _userStats['averageKills'] = userStats['averageKills'];
                    _userStats['averageRank'] = userStats['averageRank'];
                    _userStats['totalGames'] = userStats['totalGames'];
                    _userStats['totalWins'] = userStats['totalWins'];
                    _userStats['top1'] = userStats['top1'];
                    _userStats['top3'] = userStats['top3'];
        
                    await RankStat.findOneAndUpdate({ index: _userStats['index'] }, _userStats, { upsert:true });
                }
            }
            
            //await sleep(250);

            if (i%100 === 0)
                console.log(i);
        }
        //}

        res.send('{ "code": 200, "message": "Success" }');
    /*} catch (err) {
        res.send('{"code": 500, "message": "'+err+'"}');
    }*/
});

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
            await sleep(1000);

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

const searchSeason = [0, 1];
const searchTeamMode = [1, 2, 3];
const getUserData = async (userNum) => {
    // nickname으로 아이디 검색하게 변경
    let nickname = '';

    //console.log('userNum', userNum);

    const matchLately = await Match.findOne({ userNum:userNum }, null, { sort: { startDtm:-1 } });
    let lately;

    if (matchLately !== null)
        lately = new Date(matchLately['startDtm']);
    else
        lately = new Date('2020-01-01');

    //console.log(lately);

    let isChange = false;
    let next;
    while(true) {
        const _matchs = await getUserGame(userNum, next);
        const matchs = _matchs.data.userGames;
        next = _matchs.data.next;

        const insertMatchs = matchs.filter(m => new Date(m['startDtm']) > lately);

        if (insertMatchs.length !== 0) {
            isChange = true;
            insertMatchs.forEach(m => 
                new Match(m).save()
            )
        } else {
            break;
        }

        if (!next)
            break;
    }

    //if (!isChange)
    //    return null;
    await sleep(5000);

    const isUser = await UserStat.find({ userNum: userNum });
    if (isUser.length !== 0)
        return null;

    //console.log('nickname', nickname);

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
                    console.log(err);
                    console.log(userStat['nickname'], userNum, seasonId, teamMode);
                    userStat['seasonStats'][seasonId][teamMode]['mmr'] = 0;
                }
            }
        }
    }

    console.log('nickname', userStat['nickname']);
    
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

router.get('/userStat', async (req, res, next) => {
    console.log(req.query);
    const userNum = parseInt(req.query.userNum);
    // const seasonId = parseInt(req.query.seasonId);
    // const matchingTeamMode = parseInt(req.query.matchingTeamMode);

    const userStat = (await getUserStats1(userNum))[0];
    userStat['_id'] = undefined;
    userStat['userNum'] = userNum;
    
    userStat['seasonStats'] = {};
    for (var i = 0 ; i < searchSeason.length ; i++) {
        const seasonId = searchSeason[i];
        userStat['seasonStats'][seasonId] = {};

        const teamModeStats = await getUserStats2(userNum, seasonId);
        for (var j = 0 ; j < teamModeStats.length ; j++) {
            const teamModeStat = teamModeStats[j];
            const teamMode = teamModeStat['_id'];
            teamModeStat['_id'] = undefined;
            teamModeStat['characterStats'] = {};

            const characterStats = await getUserStats3(userNum, seasonId, teamMode);
            teamModeStat['mostCharacter'] = characterStats[0]['_id'];
            for (var k = 0 ; k < characterStats.length ; k++) {
                const characterStat = characterStats[k];
                const characterCode = characterStat['_id'];
                characterStat['_id'] = undefined;

                teamModeStat['characterStats'][characterCode] = characterStat;
            }
            
            userStat['seasonStats'][seasonId][teamMode] = teamModeStat;
        }

        // mmr 값 가져오기
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
                    console.log(err);
                    console.log(userStat['nickname'], userNum, seasonId, teamMode);
                    userStat['seasonStats'][seasonId][teamMode]['mmr'] = 0;
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
        characterStat['_id'] = undefined;

        userStat['characterStats'][characterCode] = characterStat;
    }

    const response = {
        code:200,
        message:'Success',
        data: userStat
    }
    res.send(response);
    // charKeys.forEach(c => {
    //     const ranks = await Match.aggregate([
    //         { $match: { characterNum: mode } },
    //         { $skip:  skip },
    //         { $limit: limit },
    //         { 
    //             $lookup: {
    //                 from: 'userstats',
    //                 localField: 'userNum',
    //                 foreignField: 'userNum',
    //                 as: 'stat'
    //             }
    //         },
    //     ]);
    // })
})

router.get('/userStatDB', async (req, res, next) => {
    console.log(req.query);
    const userNum = parseInt(req.query.userNum);
    
    const userStat = UserStat.findOne({userNum:userNum})

    const response = {
        code:200,
        message:'Success',
        data: userStat
    }
    console.log(userStat);
    res.send(response);
})


module.exports = router;