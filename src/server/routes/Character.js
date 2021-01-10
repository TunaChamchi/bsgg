const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const schedule = require('node-schedule');
const { logger } = require("../config/logConfig");

const Character = require('../schemas/characterStat');
const CharacterTier = require('../schemas/characterTier');
const Match = require('../schemas/match');
const character = require('../../data/inGame/character.json');

const router = express.Router();

const searchSeason = [0, 1];
const searchTeamMode = [1, 2, 3];
let currentVersion = { versionMajor:23, versionMinor:1 };
let previousVersion = { versionMajor:22, versionMinor:5 };
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

// 8시 0분에 캐릭터 데이터 업데이트 1
// schedule.scheduleJob('0 0 0 * * *', () => {
//     SetCharacterStats();
// })

// 현재 버전 확인
router.get('/GetVersionList', async (req, res, next) => {
    logger.info('/Character/GetVersionList ' + JSON.stringify(req.query));

    const list = await CharacterTier.find({}, { _id:-1, versionMajor:1, versionMinor:1, matchingTeamMode:1, totalGames:1 }, { sort:{versionMajor:-1, versionMinor:-1 } });

    res.json({ code:200, message:'Success', data:list });
});

// 캐릭터 티어
router.get('/Tier', async (req, res, next) => {
    const tier = await CharacterTier.find({ versionMajor:currentVersion.versionMajor, versionMinor:currentVersion.versionMinor });
    const preTier = await CharacterTier.find({ versionMajor:previousVersion.versionMajor, versionMinor:previousVersion.versionMinor });
    const response = {
        tier:tier,
        preTier:preTier
    }
    res.json(response);
});

// 캐릭터 검색
router.get('/:character', async (req, res, next) => {
    logger.info('/Character/:character ' + JSON.stringify(req.params) + ' ' + JSON.stringify(req.query));
    const characterNum = parseInt(req.params.character);

    const tier = await CharacterTier.find(
        { versionMajor:currentVersion.versionMajor, versionMinor:currentVersion.versionMinor }
    );
    const stats = await Character.find({ versionMajor:currentVersion.versionMajor, versionMinor:currentVersion.versionMinor, characterNum: characterNum });
    const response = {
        tier:tier,
        stats:stats
    }
    res.json(response);
});

router.post('/Version', async (req, res, next) => {
    logger.info('/Character/Version ' + JSON.stringify(req.query));
    currentVersion = {
        versionMajor: parseInt(req.query.currentVersionMajor),
        versionMinor: parseInt(req.query.currentVersionMinor)
    } 
    previousVersion = {
        versionMajor: parseInt(req.query.previousVersionMajor),
        versionMinor: parseInt(req.query.previousVersionMinor)
    }
    res.json({ currentVersion: currentVersion, previousVersion: previousVersion});
});
router.post('/SetCharacterStats', async (req, res, next) => {
    logger.info('/Character/SetCharacterStats ' + JSON.stringify(req.query));
    const MinVersion = {
        versionMajor: parseInt(req.query.minVersionMajor),
        versionMinor: parseInt(req.query.minVersionMinor)
    }
    const MaxVersion = {
        versionMajor: parseInt(req.query.maxVersionMajor),
        versionMinor: parseInt(req.query.maxVersionMinor)
    } 

    setCharacterStats(MinVersion, MaxVersion);
    res.json({ code:200, message:'Success' });
});

module.exports = router;

const getChacterStat = async (MinVersion, MaxVersion, characterNum, matchingTeamMode, seasonId) => {
    return await Match.aggregate([
        { 
            $match: { 
                $and: [
                    { versionMajor: {$gte: MinVersion.versionMajor} }, { versionMajor: {$lte: MaxVersion.versionMajor} },
                    { versionMinor: {$gte: MinVersion.versionMinor} }, { versionMinor: {$lte: MaxVersion.versionMinor} },
                    { characterNum: characterNum }, { seasonId: seasonId }, { matchingTeamMode: matchingTeamMode }, { mmrBefore: {$gte:900} }
                ]
            } 
        },
        { 
            $group: {
                _id: '$bestWeapon',
                totalGames: { $sum: 1 },
                totalKills:{ $sum: '$playerKill' },
                totalAssistants:{ $sum: '$playerAssistant' },
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
                }
            }
        }
    ]);
}

const getChacterStatSkill = async (MinVersion, MaxVersion, characterNum, bestWeapon, matchingTeamMode, seasonId) => {
    return await Match.aggregate([
        { 
            $match: { 
                $and: [
                    { versionMajor: {$gte: MinVersion.versionMajor} }, { versionMajor: {$lte: MaxVersion.versionMajor} },
                    { versionMinor: {$gte: MinVersion.versionMinor} }, { versionMinor: {$lte: MaxVersion.versionMinor} },
                    { characterNum: characterNum }, { seasonId: seasonId }, { matchingTeamMode: matchingTeamMode }, { bestWeapon: bestWeapon }, { mmrBefore: {$gte:900} },
                    { skillOrder: { $ne : "_" } }
                ]
            } 
        },
        { 
            $group: {
                _id: '$skillOrder',
                totalGames: { $sum: 1 },
                top1: { 
                    $sum: {
                        $cond : [
                            { $eq: [ '$gameRank', 1 ] },
                            1, 
                            0
                        ]
                    }
                },
            }
        },
        { $sort: { totalGames: -1 } },
    ]);
}

const getChacterStatItem = async (MinVersion, MaxVersion, characterNum, bestWeapon, matchingTeamMode, seasonId) => {
    return await Match.aggregate([
        { 
            $match: { 
                $and: [
                    { versionMajor: {$gte: MinVersion.versionMajor} }, { versionMajor: {$lte: MaxVersion.versionMajor} },
                    { versionMinor: {$gte: MinVersion.versionMinor} }, { versionMinor: {$lte: MaxVersion.versionMinor} },
                    { characterNum: characterNum }, { seasonId: seasonId }, { matchingTeamMode: matchingTeamMode }, { bestWeapon: bestWeapon }, { mmrBefore: {$gte:900} }
                ]
            } 
        },
        { 
            $group: {
                _id: '$equipmentOrder',
                totalGames: { $sum: 1 },
                top1: { 
                    $sum: {
                        $cond : [
                            { $eq: [ '$gameRank', 1 ] },
                            1, 
                            0
                        ]
                    }
                },
            }
        },
        { $sort: { totalGames: -1 } },
        { $limit: 50 }
    ]);
}

const getChacterStatItemType = async (MinVersion, MaxVersion, characterNum, bestWeapon, type, matchingTeamMode, seasonId) => {
    return await Match.aggregate([
        { 
            $match: { 
                $and: [
                    { versionMajor: {$gte: MinVersion.versionMajor} }, { versionMajor: {$lte: MaxVersion.versionMajor} },
                    { versionMinor: {$gte: MinVersion.versionMinor} }, { versionMinor: {$lte: MaxVersion.versionMinor} },
                    { characterNum: characterNum }, { seasonId: seasonId }, { matchingTeamMode: matchingTeamMode }, { bestWeapon: bestWeapon }, { mmrBefore: {$gte:900} }
                ]
            } 
        },
        { 
            $group: {
                _id: '$equipment.'+type,
                totalGames: { $sum: 1 },
                top1: { 
                    $sum: {
                        $cond : [
                            { $eq: [ '$gameRank', 1 ] },
                            1, 
                            0
                        ]
                    }
                },
            }
        },
        { $match: { _id: { $ne: null } } },
        { $sort: { totalGames: -1 } }
    ]);
}

const setCharacterStats = async (MinVersion, MaxVersion) => {
    for (var matchingTeamMode = 1 ; matchingTeamMode < 4 ; matchingTeamMode++) {
        const charList = [];
        for (const code in character) {
            let seasonId = 1;
            let isRank = true;
            const characterNum = parseInt(code);
            let chars = await getChacterStat(MinVersion, MaxVersion, characterNum, matchingTeamMode, seasonId);
            if (chars.length === 0) {
                logger.info('setCharacterStats character is Null : ' + JSON.stringify({code, MinVersion, MaxVersion, matchingTeamMode}));
                seasonId = 0;
                isRank = false;
                chars = await getChacterStat(MinVersion, MaxVersion, characterNum, matchingTeamMode, seasonId);
            }
            
            for (var i = 0 ; i < chars.length ; i++) {
                const char = chars[i];
                const bestWeapon = parseInt(char['_id']);
                delete char['_id'];
                char['matchingTeamMode'] = matchingTeamMode;
                char['versionMajor'] = MaxVersion.versionMajor;
                char['versionMinor'] = MaxVersion.versionMinor;

                char['characterNum'] = characterNum;
                char['bestWeapon'] = bestWeapon;

                const skillOrder = await getChacterStatSkill(MinVersion, MaxVersion, characterNum, bestWeapon, matchingTeamMode, seasonId);
                const itemOrder = await getChacterStatItem(MinVersion, MaxVersion, characterNum, bestWeapon, matchingTeamMode, seasonId);

                char['skillOrder'] = skillOrder;
                char['itemOrder'] = itemOrder;

                char['itemStats'] = {};
                for (var j = 0 ; j < 6 ; j++) {
                    const itemType = await getChacterStatItemType(MinVersion, MaxVersion, characterNum, bestWeapon, j, matchingTeamMode, seasonId);
                    const itemCode = itemType['_id'];
                    delete itemType['_id'];
                    itemType['itemCode'] = itemCode;

                    char['itemStats'][j] = itemType;
                }

                if (isRank) charList.push(char);

                await Character.findOneAndUpdate(
                    { versionMajor: MaxVersion.versionMajor, versionMinor: MaxVersion.versionMinor, matchingTeamMode: matchingTeamMode, characterNum:characterNum, bestWeapon:bestWeapon }, 
                    char, 
                    { upsert:true }
                );
            }
        }
        setCharacterTier(MinVersion, MaxVersion, matchingTeamMode, charList);
    }
}

const setCharacterTier = async (MinVersion, MaxVersion, matchingTeamMode, charList) => {
    const tier = [];
    let max = {};
    let min = {};
    let avg = {};

    let max_score = 0;
    let max_winRate = 0;
    let max_pickRate = 0;
    let max_avgKAM = 0;
    let max_avgRank = 18;

    let min_winRate = 100;
    let min_pickRate = 100;
    let min_avgKAM = 100;
    let min_avgRank = 0;

    let total_winRate = 0;
    let total_pickRate = 0;
    let total_avgKAM = 0;
    let total_avgRank = 0;
    
    // 값 가져오기
    let totalGames = 0;
    charList.forEach(char => {
        totalGames += char['totalGames'];
    }) 
    charList.forEach(char => {
        const data = {
            'winRate' : Math.round(char['top1']/char['totalGames']*1000)/1000,
            'pickRate': Math.round(char['totalGames']/totalGames*1000)/1000,
            'avgKAM'  : Math.round((char['totalKills']+char['totalAssistants'])/char['totalGames']*10)/10,
            'avgRank' : Math.round(char['rank']*10)/10,
        };

        tier.push({ 
            characterNum: char['characterNum'], 
            bestWeapon: char['bestWeapon'], 
            data: data 
        })

        total_winRate  += data['winRate'];
        total_pickRate += data['pickRate'];
        total_avgKAM   += data['avgKAM'];
        total_avgRank  += data['avgRank'];

        if (data['winRate']  > max_winRate)   max_winRate  = data['winRate'];
        if (data['pickRate'] > max_pickRate)  max_pickRate = data['pickRate'];
        if (data['avgKAM']   > max_avgKAM)    max_avgKAM   = data['avgKAM'];
        if (data['avgRank']  < max_avgRank)   max_avgRank  = data['avgRank'];
        
        if (data['winRate']  < min_winRate)   min_winRate  = data['winRate'];
        if (data['pickRate'] < min_pickRate)  min_pickRate = data['pickRate'];
        if (data['avgKAM']   < min_avgKAM)    min_avgKAM   = data['avgKAM'];
        if (data['avgRank']  > min_avgRank)   min_avgRank  = data['avgRank'];
    })

    // max, min 값 지정
    max = {
        'winRate' : max_winRate,
        'pickRate': max_pickRate,
        'avgKAM' : max_avgKAM,
        'avgRank' : max_avgRank 
    }
    min = {
        'winRate' : min_winRate,
        'pickRate': min_pickRate,
        'avgKAM' : min_avgKAM,
        'avgRank' : min_avgRank 
    }
    avg = {
        'winRate' : total_winRate/charList.length,
        'pickRate': total_pickRate/charList.length,
        'avgKAM'  : total_avgKAM/charList.length,
        'avgRank' : total_avgRank/charList.length, 
    }

    // 순위 계산
    tier.forEach(data1 => {
        data1['rank'] = {
            'winRate' : 1,
            'pickRate': 1,
            'avgKAM' : 1,
            'avgRank' : 1
        }

        tier.forEach(data2 => {
            if (data1['data']['winRate'] < data2['data']['winRate']) {
                data1['rank']['winRate']++;
            }
            if (data1['data']['pickRate'] < data2['data']['pickRate']) {
                data1['rank']['pickRate']++;
            }
            if (data1['data']['avgKAM'] < data2['data']['avgKAM']) {
                data1['rank']['avgKAM']++;
            }
            if (data1['data']['avgRank'] > data2['data']['avgRank']) {
                data1['rank']['avgRank']++;
            }
        });
    });

    // 점수 계산
    tier.forEach(data => {
        data['score'] = {
            'winRate' : data['data']['winRate']   /max_winRate*100,
            'pickRate': (1-data['rank']['pickRate']/tier.length)*100,
            'avgKAM' : data['data']['avgKAM']   /max_avgKAM*100,
            'avgRank' : (1-data['rank']['avgRank']/tier.length)*100
        }

        data['score']['total'] = (data['score']['winRate']*1   + data['score']['pickRate']*0.8 + data['score']['avgKAM']*1    + data['score']['avgRank']*0.5)/3;
        
        if (data['score']['total'] > max_score) max_score = data['score']['total'];
    });

    // 티어, 순위 계산
    tier.forEach(data1 => {
        const tier_score = data1['score']['total']/max_score;
        if (tier_score > 0.95) {
            data1['tier'] = 1;
        } else if (tier_score > 0.85) {
            data1['tier'] = 2;
        } else if (tier_score > 0.70) {
            data1['tier'] = 3;
        } else if (tier_score > 0.45) {
            data1['tier'] = 4;
        } else {
            data1['tier'] = 5;
        }

        data1['rank']['total'] = 1;
        tier.forEach(data2 => {
            if (data1['score']['total'] < data2['score']['total'])
                data1['rank']['total']++;
        });
    });

    const characterTier = {
        versionMajor: MaxVersion.versionMajor, 
        versionMinor: MaxVersion.versionMinor,
        matchingTeamMode: matchingTeamMode,
        max: max, min: min, avg: avg,
        totalGames: totalGames,
        tier: {},
    }
    tier.forEach(data => {
        const characterNum = data['characterNum'];
        const bestWeapon = data['bestWeapon'];

        if (!characterTier['tier'][characterNum])
            characterTier['tier'][characterNum] = {}
        
        characterTier['tier'][characterNum][bestWeapon] = {
            tier: data['tier'],
            rank: data['rank'],
            winRate:  data['data']['winRate'],
            pickRate: data['data']['pickRate'],
            avgKAM:   data['data']['avgKAM'],
            avgRank:  data['data']['avgRank'],
        }
    });
    await CharacterTier.findOneAndUpdate(
        { versionMajor: MaxVersion.versionMajor, versionMinor: MaxVersion.versionMinor, matchingTeamMode: matchingTeamMode }, 
        characterTier, 
        { upsert:true }
    );

    logger.info('SetCharacterTier Complete : ' + JSON.stringify({MinVersion, MaxVersion, matchingTeamMode}));
}

const currentVersionView = async () => {
    const list = await CharacterTier.find({ matchingTeamMode: 1 }, { _id:-1, versionMajor:1, versionMinor:1, totalGames:1 }, { sort:{versionMajor:-1, versionMinor:-1 } });
    currentVersion = {
        versionMajor: parseInt(list[0].versionMajor),
        versionMinor: parseInt(list[0].versionMinor)
    } 
    previousVersion = {
        versionMajor: parseInt(list[1].versionMajor),
        versionMinor: parseInt(list[1].versionMinor)
    }

    logger.info('currentVersionView currentVersion : ' + JSON.stringify(currentVersion));
    logger.info('currentVersionView previousVersion : ' +  JSON.stringify(previousVersion));
}

currentVersionView();