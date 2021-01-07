const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const schedule = require('node-schedule');
const { logger } = require("../config/logConfig")

const UserStat = require('../schemas/userStat');
const User = require('../schemas/user');
const Match = require('../schemas/match');

const router = express.Router();

const searchSeason = [0, 1];
const searchTeamMode = [1, 2, 3];
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

// 6시 0분에 전체 유저 전적 검색
schedule.scheduleJob('0 10 21 * * *', async () => {
    logger.info('GetUserStat Start');
    const users = await User.find({}, { _id:0, nickname: 1 }, { sort : { updateDate: 1 }});

    for (let i = 0 ; i < users.length ; i++) {        
        await getUserData(users[i]['nickname']);
        
        if (i%100===99)
            logger.info('GetUserStat : ' + (i+1) + ' ' + users[i]['nickname']);
    }

    logger.info('GetUserStat Complete : ' + users.length);
})

const getUserSreach = async (userName) => {
    while (true) {
        try {
            return await axios.get('https://open-api.bser.io/v1/user/nickname?query='+encodeURI(userName), {
                    headers: {
                        'x-api-key': 'sWNQXtP4Po3Sd1dWWzHqT5EZSKQfj8478omeZWg0'
                    }
            });
        } catch (error) {
            if (error.response.status !== 429) {
                logger.error('getUserSreach() ' +  error.response.status + ' ' + JSON.stringify({ userName }));
                return;
            }
            
            await sleep(250);
        }
    }
};
const getUserStats = async (userNum, seasonId) => {
    while (true) {
        try {
            return await axios.get('https://open-api.bser.io/v1/user/stats/'+userNum+'/'+seasonId, {
                    headers: {
                        'x-api-key': 'sWNQXtP4Po3Sd1dWWzHqT5EZSKQfj8478omeZWg0'
                    }
            });
        } catch (error) {
            if (error.response.status !== 429) {
                logger.error('getUserStats() ' +  error.response.status + ' ' + JSON.stringify({ userNum, seasonId }));
                return;
            }
            
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
            if (error.response.status !== 429) {
                logger.error('getUserGame() ' +  error.response.status + ' ' + JSON.stringify({ userNum, next }));
                return;
            }
            
            await sleep(250);
        }
    }
};

// 메인 화면 유저 이름 검색
router.get('/', async (req, res, next) => {
    const search = req.query.search;

    const users = await UserStat.find({ nickname: { $regex: '^'+search, $options: 'i' } });
    res.json(users.slice(0, 5));
});

// 유저 검색 DB
router.get('/:userName', async (req, res, next) => {
    try {
        logger.info('/User/:userName ' + JSON.stringify(req.params));
        const userName = req.params.userName;

        let user = await User.findOne({ nickname: { $regex: '^'+userName+'$', $options: 'i' } });
        if (!user) {
            await getUserData(userName);
            user = await User.findOne({ nickname: { $regex: '^'+userName+'$', $options: 'i' } });
        }
        let userNum = user.userNum;
        const userStat = await UserStat.findOne({ userNum: userNum });
        
        const ranking = {};
        if (userStat && userStat['seasonStats'] && userStat['seasonStats'][1]) {
            for (const key in userStat['seasonStats'][1]) {
                ranking[key] = await UserStat.find({ ["seasonStats.1."+key+".mmr"]: { $gt: userStat['seasonStats'][1][key]['mmr'] } }).count();
                ++ranking[key];
            }
        }

        const response = {
            user:user,
            userStat:userStat,
            ranking:ranking
        }
        res.json(response);
    } catch (error) {
        logger.error('/User/:userName ' + error.message + ' ' + JSON.stringify(req.params));

        const response = {
            user:null,
            userStat:null,
            ranking:null
        }
        res.json(response);
    }
});

// 유저 전적 검색 DB
router.get('/:userNum/match', async (req, res, next) => {
    logger.info('/User/:userNum/match ' + JSON.stringify(req.params) + ' ' + JSON.stringify(req.query));
    const userNum = parseInt(req.params.userNum) || -1;
    const matchMode =  parseInt(req.query.matchMode) || 0;
    const teamMode =  parseInt(req.query.teamMode) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const skip =  parseInt(req.query.skip) || 0;

    if (userNum === -1) {
        res.json(null);
    } else {
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
    }
});

// 유저 전적 갱신
router.get('/:userName/renew', async (req, res, next) => {
    logger.info('/User/:userName/renew ' + JSON.stringify(req.params));
    const userName = req.params.userName;
    try {    
        await getUserData(userName);
        
        res.json('{ "code": 200, "message": "Success" }');
    } catch (error) {
        res.json('{ "code": 500, "message": "Fail" }');
    }
});

// 상제 전적
router.get('/Detail/:gameId', async (req, res, next) => {
    try {
        logger.info('/User/Detail/:gameId ' + JSON.stringify(req.params));
        const gameId = parseInt(req.params.gameId);

        //const match = await Match.find({ gameId: gameId }, null, { sort: { gameRank: 1 } });
        const match = await Match.aggregate([
            { $match: { gameId: gameId } }, 
            { 
                $project: {
                    _id:0,
                    gameRank:1,
                    userNum:1,
                    characterNum:1,
                    equipment:1,
                    killDetail:1,
                    damageToPlayer:1,
                    mmrBefore:1,
                    playerKill:1,
                    playerAssistant:1,
                    matchingTeamMode:1,
                }
            }, 
            { 
                $lookup: {
                    from: 'users',
                    localField: 'userNum',
                    foreignField: 'userNum',
                    as: 'user'
                }
            },
            { $sort: { gameRank: 1 } }
        ]);
        res.json(match);
    } catch (error) {
        logger.error('/User/Detail/:gameId ' + error.message + ' ' + JSON.stringify(req.params));
        res.json(null);
    }
});

// 유저 전적 검색 API
router.post('/userData', async (req, res, next) => {
    logger.info('/userData');

    const userNum = parseInt(req.query.userNum);
    await getUserData(userNum);

    const response = { 
        code: 200, 
        message: 'Success'
    }
    res.json(response);
});

module.exports = router;

const getUserData = async (userName) => {
    try {
        // api에서 유저 검색
        const u = (await getUserSreach(userName)).data.user;
        if (!u) {
            return;
        }

        const userNum = u.userNum;
        let nickname = u.nickname;

        let isStats = false;
        let max_mmr = 0;
        const mmr = {};
        const rank = {};
        const rankSize = {};
        
        // 닉네임 / mmr  값 가져오기
        for (var i = 0 ; i < searchSeason.length ; i++) {
            const seasonId = searchSeason[i];
            const _userStats = await getUserStats(userNum, seasonId);//.userStats;
            const userStats = _userStats.data.userStats;
            if (userStats !== undefined) {
                mmr[seasonId] = {};
                rank[seasonId] = {};
                rankSize[seasonId] = {};
                for (let j = 0 ; j < userStats.length ; j++) {
                    const userStat = userStats[j];
                    const teamMode = userStat['matchingTeamMode'];

                    nickname = userStat['nickname'];
                    mmr[seasonId][teamMode] = userStat['mmr'];
                    rank[seasonId][teamMode] = userStat['rank'];
                    rankSize[seasonId][teamMode] = userStat['rankSize'];

                    if (seasonId === 1 && max_mmr < userStat['mmr']) {
                        max_mmr = userStat['mmr'];
                    }
                    isStats = true;
                }
            }
        }

        if ((userName+"").toLowerCase() !== (nickname+"").toLowerCase()) {
            logger.info('getUserData() ' + nickname + ' -> ' + userName);
            nickname = userName;
        }

        // 유저 등록
        const user = {
            userNum: userNum,
            nickname: nickname,
            updateDate: Date.now()
        }
        await User.findOneAndUpdate({ userNum: user['userNum'] }, user, { upsert:true });

        if (!isStats) {
            return null;
        }

        // 최근 매치 전적 검색
        const matchLately = await Match.findOne({ userNum:userNum }, null, { sort: { startDtm:-1 } });
        let lately;

        if (matchLately !== null)
            lately = new Date(matchLately['startDtm']);
        else
            lately = new Date('2020-01-01');

        // 매치 검색
        let isChange = false;
        let next;
        while(true) {
            const _matchs = await getUserGame(userNum, next);
            const matchs = _matchs.data.userGames;
            next = _matchs.data.next;

            if (!matchs) {
                logger.error('getUserData() ' + JSON.stringify({ _matchs }));
                return;
            }
                
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

                    const keys = Object.keys(m['skillOrderInfo']).filter(code => parseInt(m['skillOrderInfo'][code]/1000000)!==3);
                    if (keys.length >= 16) {
                        for (var j = 0 ; j < 16 ; j++) {
                            const key = keys[j];
                            let skillCode = parseInt(m['skillOrderInfo'][key]);
                            if (skillCode > 1016500 && skillCode < 1017000) {
                                m['skillOrderInfo'][key] -= 400;
                                skillCode -= 400;
                            }
                            if (skillCode === 1016900) {
                                m['skillOrderInfo'][key] = 1016900;
                                skillCode = 1016900;
                            }
                            skillOrder += skillCode + '_';
                        }
                    }

                    let startDtm = new Date(m['startDtm']);
                    m['startDtm'] = startDtm.setSeconds(startDtm.getSeconds() + m['playTime']);
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

        // 매치 추가 확인
        if (!isChange) {
            return null;
        }

        // userStat 변경
        const userStat = (await getUserStats1(userNum))[0];
        try {
            delete userStat['_id'];
        } catch (err) {
            logger.error('getUserData() ' + JSON.stringify({ userNum, userStat }));
            return;
        }
        userStat['userNum'] = userNum;
        userStat['nickname'] = nickname;
        userStat['max_mmr'] = max_mmr;

        
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

                try {
                    userStat['seasonStats'][seasonId][teamMode]['mmr'] = mmr[seasonId][teamMode];
                    userStat['seasonStats'][seasonId][teamMode]['rank'] = rank[seasonId][teamMode];
                    userStat['seasonStats'][seasonId][teamMode]['rankSize'] = rankSize[seasonId][teamMode];
                } catch (err) {
                    logger.error('getUserData() ' + JSON.stringify({ nickname, userNum, seasonId, teamMode }));
                    logger.error(JSON.stringify(mmr) + ' ' + JSON.stringify(rankPercent));
                    logger.error(JSON.stringify(userStat['seasonStats'][seasonId][teamMode]));
                    logger.error(err.message);
                    return null;
                }
            }
        }
        
        const characterStats = await getCharacterStats(userNum);
        if (characterStats.length > 0) {
            userStat['mostCharacter'] = characterStats[0]['_id'];
            userStat['characterStats'] = {};
            for (var i = 0 ; i < characterStats.length ; i++) {
                const characterStat = characterStats[i];
                const characterCode = characterStat['_id'];
                delete characterStat['_id'];
    
                userStat['characterStats'][characterCode] = characterStat;
            }
        } else {
            const mostCharacter = await getMostCharacter(userNum);
            userStat['mostCharacter'] = mostCharacter[0]['_id'];
        }

        await UserStat.findOneAndUpdate({ userNum: userStat['userNum'] }, userStat, { upsert:true });
        
        return 'Success';
    } catch (error) {
        logger.error('getUserData() ' + JSON.stringify({ userName }));
        logger.error(error.message);
        return null;
    }
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
                avgRank:{ $avg: '$gameRank' },
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

const getMostCharacter = async (userNum) => {
    return await Match.aggregate([
    { $match: { userNum: userNum } },
        { 
            $group: {
                _id: '$characterNum',
                totalGames: { $sum: 1 }
            }
        },
        { $sort: { totalGames: -1 } }
    ]);
}

router.post('/userStat', async (req, res, next) => {
    logger.info('/userStat Start');

    const users = await User.find({}, { _id:0, nickname: 1 }, { sort : { updateDate: 1 }});

    for (let i = 0 ; i < users.length ; i++) {        
        await getUserData(users[i]['nickname']);

        if (i%100===99)
            logger.info('/userStat : ' + (i+1) + ' ' + users[i]['nickname']);
    }
    logger.info('/userStat Complete : ' + users.length);
    res.json("{ 'data': Date.now() }")
});

router.post('/userStat/renew', async (req, res, next) => {
    logger.info('/User/userStat/renew ' + JSON.stringify(req.query));
    const userName = req.query.userName;

    try {
        // api에서 유저 검색
        const u = (await getUserSreach(userName)).data.user;
        if (!u) {
            return;
        }

        const userNum = u.userNum;
        let nickname = u.nickname;

        let isStats = false;
        const mmr = {};
        const rankPercent = {};
        
        // 닉네임 / mmr  값 가져오기
        for (var i = 0 ; i < searchSeason.length ; i++) {
            const seasonId = searchSeason[i];
            const _userStats = await getUserStats(userNum, seasonId);//.userStats;
            const userStats = _userStats.data.userStats;
            if (userStats !== undefined) {
                mmr[seasonId] = {};
                rankPercent[seasonId] = {}
                for (let j = 0 ; j < userStats.length ; j++) {
                    const userStat = userStats[j];
                    const teamMode = userStat['matchingTeamMode'];

                    nickname = userStat['nickname'];
                    mmr[seasonId][teamMode] = userStat['mmr']
                    rankPercent[seasonId][teamMode] = userStat['rankPercent'];

                    isStats = true;
                }
            }
        }

        if ((userName+"").toLowerCase() !== (nickname+"").toLowerCase()) {
            logger.info('getUserData() ' + nickname + ' -> ' + userName);
            nickname = userName;
        }

        // 유저 등록
        const user = {
            userNum: userNum,
            nickname: nickname,
            updateDate: Date.now()
        }
        await User.findOneAndUpdate({ userNum: user['userNum'] }, user, { upsert:true });

        if (!isStats) {
            logger.info('/User/userStat/renew Complete : ' + userName);
            res.json("{ 'data': Date.now() }")
            return null;
        }

        // 최근 매치 전적 검색
        const matchLately = await Match.findOne({ userNum:userNum }, null, { sort: { startDtm:-1 } });
        let lately;

        if (matchLately !== null)
            lately = new Date(matchLately['startDtm']);
        else
            lately = new Date('2020-01-01');

        // 매치 검색
        let isChange = false;
        let next;
        while(true) {
            const _matchs = await getUserGame(userNum, next);
            const matchs = _matchs.data.userGames;
            next = _matchs.data.next;

            if (!matchs) {
                logger.error('getUserData() ' + JSON.stringify({ _matchs }));
                return;
            }
                
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

                    const keys = Object.keys(m['skillOrderInfo']).filter(code => parseInt(m['skillOrderInfo'][code]/1000000)!==3);
                    if (keys.length >= 16) {
                        for (var j = 0 ; j < 16 ; j++) {
                            const key = keys[j];
                            let skillCode = parseInt(m['skillOrderInfo'][key]);
                            if (skillCode > 1016500 && skillCode < 1017000) {
                                m['skillOrderInfo'][key] -= 400;
                                skillCode -= 400;
                            }
                            if (skillCode === 1016900) {
                                m['skillOrderInfo'][key] = 1016900;
                                skillCode = 1016900;
                            }
                            skillOrder += skillCode + '_';
                        }
                    }

                    let startDtm = new Date(m['startDtm']);
                    m['startDtm'] = startDtm.setSeconds(startDtm.getSeconds() + m['playTime']);
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

        // userStat 변경
        const userStat = (await getUserStats1(userNum))[0];
        try {
            delete userStat['_id'];
        } catch (err) {
            logger.error('getUserData() ' + JSON.stringify({ userNum, userStat }));
            return;
        }
        userStat['userNum'] = userNum;
        userStat['nickname'] = nickname;
        
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

                try {
                    userStat['seasonStats'][seasonId][teamMode]['mmr'] = mmr[seasonId][teamMode];
                    userStat['seasonStats'][seasonId][teamMode]['rankPercent'] = rankPercent[seasonId][teamMode];
                } catch (err) {
                    logger.error('getUserData() ' + JSON.stringify({ nickname, userNum, seasonId, teamMode }));
                    logger.error(JSON.stringify(mmr) + ' ' + JSON.stringify(rankPercent));
                    logger.error(JSON.stringify(userStat['seasonStats'][seasonId][teamMode]));
                    logger.error(err.message);
                    return null;
                }
            }
        }
        
        const characterStats = await getCharacterStats(userNum);
        if (characterStats.length > 0) {
            userStat['mostCharacter'] = characterStats[0]['_id'];
            userStat['characterStats'] = {};
            for (var i = 0 ; i < characterStats.length ; i++) {
                const characterStat = characterStats[i];
                const characterCode = characterStat['_id'];
                delete characterStat['_id'];
    
                userStat['characterStats'][characterCode] = characterStat;
            }
        } else {
            const mostCharacter = await getMostCharacter(userNum);
            userStat['mostCharacter'] = mostCharacter[0]['_id'];
        }

        await UserStat.findOneAndUpdate({ userNum: userStat['userNum'] }, userStat, { upsert:true });
        
    } catch (error) {
        logger.error('getUserData() ' + JSON.stringify({ userName }));
        logger.error(error.message);
    }
    logger.info('/User/userStat/renew Complete : ' + userName);
    res.json("{ 'data': Date.now() }")
});