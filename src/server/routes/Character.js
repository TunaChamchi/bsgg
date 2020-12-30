const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const schedule = require('node-schedule');

const UserStat = require('../schemas/userStat');
const Character = require('../schemas/characterStat');
const CharacterTier = require('../schemas/characterTier');
const Match = require('../schemas/match');
const character = require('../../data/inGame/character.json');

const router = express.Router();

const searchSeason = [0, 1];
const searchTeamMode = [1, 2, 3];
let previousVersion = { versionMajor:0, versionMinor:0 };
let currentVersion = { versionMajor:0, versionMinor:0 };
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

// 8시 0분에 캐릭터 데이터 업데이트
//schedule.scheduleJob('40 32 1 * * *', async () => {
const test = async () => {
    console.log(new Date().toString().slice(16,24), ': SetCharacterStats Start');
    const version = await getCurrentVersion();
    const versionMajor = version[0].versionMajor;
    const versionMinor = version[0].versionMinor;

    if (versionMinor !== currentVersion.versionMinor && versionMajor !== currentVersion.versionMajor) {
        previousVersion = {...currentVersion};
        currentVersion = { versionMajor:versionMajor, versionMinor:versionMinor };
    }
    // if (previousVersion.versionMajor === 0 && previousVersion.versionMinor ===0) {
    //     previousVersion = {...version[1]};
    // }
    console.log('currentVersion', currentVersion);
    console.log('previousVersion', previousVersion);

    for (var matchingTeamMode = 1 ; matchingTeamMode < 4 ; matchingTeamMode++) {
        const charList = [];
        for (const code in character) {
            const characterNum = parseInt(code);
            const chars = await getChacterStat(versionMajor, versionMinor, characterNum, matchingTeamMode);
            
            for (var i = 0 ; i < chars.length ; i++) {
                const char = chars[i];
                const bestWeapon = parseInt(char['_id']);
                delete char['_id'];
                char['matchingTeamMode'] = matchingTeamMode;
                char['versionMajor'] = versionMajor;
                char['versionMinor'] = versionMinor;

                char['characterNum'] = characterNum;
                char['bestWeapon'] = bestWeapon;

                const skillOrder = await getChacterStatSkill(versionMajor, versionMinor, characterNum, bestWeapon, matchingTeamMode);
                const itemOrder = await getChacterStatItem(versionMajor, versionMinor, characterNum, bestWeapon, matchingTeamMode);

                char['skillOrder'] = skillOrder;
                char['itemOrder'] = itemOrder;

                char['itemStats'] = {};
                for (var j = 0 ; j < 6 ; j++) {
                    const itemType = await getChacterStatItemType(versionMajor, versionMinor, characterNum, bestWeapon, j, matchingTeamMode);
                    const itemCode = itemType['_id'];
                    delete itemType['_id'];
                    char['itemCode'] = itemCode;

                    char['itemStats'][j] = itemType;
                }

                charList.push(char);
                await Character.findOneAndUpdate(
                    { versionMajor: versionMajor, versionMinor: versionMinor, characterNum:characterNum, matchingTeamMode: matchingTeamMode }, 
                    char, 
                    { upsert:true }
                );
            }
        }

        await setCharacterTier(versionMajor, versionMinor, matchingTeamMode, charList);
    }

    console.log(new Date().toString().slice(16,24) + ' : GetCharacterData Complete');
}

// 메인 화면 유저 이름 검색
router.get('/', async (req, res, next) => {
    console.log(req.query);
    const search = req.query.search;

    const users = await UserStat.find({});
    res.json(users);
});

// 캐릭터 검색
router.get('/:character', async (req, res, next) => {
    console.log(req.params, req.query);
    const characterNum = parseInt(req.params.character);

    const char = await Character.find({ characterNum: characterNum });
    res.json(char);
});

module.exports = router;

const getCurrentVersion = async () => {
    return Match.find({}, 
        { _id:0, versionMajor:1, versionMinor:1 }, 
        { sort: { versionMajor:-1, versionMinor:-1 }, limit: 2 });
}

const getChacterStat = async (versionMajor, versionMinor, characterNum, matchingTeamMode) => {
    return await Match.aggregate([
        { $match: { versionMajor: versionMajor, versionMinor: versionMinor, characterNum: characterNum, seasonId: 1, matchingTeamMode: matchingTeamMode } },
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

const getChacterStatSkill = async (versionMajor, versionMinor, characterNum, bestWeapon, matchingTeamMode) => {
    return await Match.aggregate([
        { $match: { versionMajor: versionMajor, versionMinor: versionMinor,characterNum: characterNum, bestWeapon: bestWeapon, seasonId: 1, matchingTeamMode: matchingTeamMode } },
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
        { $limit: 10 }
    ]);
}

const getChacterStatItem = async (versionMajor, versionMinor, characterNum, bestWeapon, matchingTeamMode) => {
    return await Match.aggregate([
        { $match: { versionMajor: versionMajor, versionMinor: versionMinor,characterNum: characterNum, bestWeapon: bestWeapon, seasonId: 1, matchingTeamMode: matchingTeamMode } },
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

const getChacterStatItemType = async (versionMajor, versionMinor, characterNum, bestWeapon, type, matchingTeamMode) => {
    return await Match.aggregate([
        { $match: { versionMajor: versionMajor, versionMinor: versionMinor,characterNum: characterNum, bestWeapon: bestWeapon, seasonId: 1, matchingTeamMode: matchingTeamMode } },
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
        { $sort: { totalGames: -1 } }
    ]);
}

const setCharacterTier = async (versionMajor, versionMinor, matchingTeamMode, charList) => {
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

    let total_winRate = 100;
    let total_pickRate = 100;
    let total_avgKAM = 100;
    let total_avgRank = 0;
    
    // 값 가져오기
    let totalGames = 0;
    charList.forEach(char => {
        totalGames += char['totalGames'];
    }) 
    charList.forEach(char => {
        const data = {
            'winRate' : char['top1']/totalGames,
            'pickRate': char['totalGames']/totalGames,
            'avgKAM'  : (char['totalKills']+char['totalAssistants'])/totalGames,
            'avgRank' : char['rank'],
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
        'winRate' : total_winRate/totalGames,
        'pickRate': total_pickRate/totalGames,
        'avgKAM'  : total_avgKAM/totalGames,
        'avgRank' : total_avgRank/totalGames 
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
            if (data1['data']['winRate'] < data2['data']['winRate']) {
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

        if (matchingTeamMode === 1)
            data['score']['total'] = (data['score']['winRate']*1.3   + data['score']['pickRate']*0.8 + data['score']['avgKAM']*1.2    + data['score']['avgRank']*0.7  )/4;
        else if (matchingTeamMode === 2)
            data['score']['total'] = (data['score']['winRate']*1.3   + data['score']['pickRate']*1.1 + data['score']['avgKAM']*0.9    + data['score']['avgRank']*0.5)/3.8;
        else if (matchingTeamMode === 3)
            data['score']['total'] = (data['score']['winRate']*1.3   + data['score']['pickRate']*1.3 + data['score']['avgKAM']*0.7    + data['score']['avgRank']*0.3)/3.6;
        
        if (data['score']['total'] > max_score) max_score = data['score']['total'];
    });

    // 티어, 순위 계산
    tier.forEach(data1 => {
        const tier_score = data1['score']['total']/max_score;
        if (tier_score > 0.90) {
            data1['tier'] = 1;
        } else if (tier_score > 0.75) {
            data1['tier'] = 2;
        } else if (tier_score > 0.6) {
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
        versionMajor: versionMajor, 
        versionMinor: versionMinor,
        matchingTeamMode: matchingTeamMode,
        max: max, min: min, avg: avg,
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
            pinkRate: data['data']['pinkRate'],
            avgKAM:   data['data']['avgKAM'],
            avgRank:  data['data']['avgRank'],
        }
    });
    await CharacterTier.findOneAndUpdate(
        { versionMajor: versionMajor, versionMinor: versionMinor, matchingTeamMode: matchingTeamMode }, 
        characterTier, 
        { upsert:true }
    );
    console.log(new Date().toString().slice(16,24) + ' : SetCharacterTier Complete');
}