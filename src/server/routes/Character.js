const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const schedule = require('node-schedule');

const UserStat = require('../schemas/userStat');
const Character = require('../schemas/characterStat');
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

// 8시 0분에 캐릭터 데이터 업데이트
schedule.scheduleJob('40 32 1 * * *', async () => {
    for (var matchingTeamMode = 1 ; matchingTeamMode < 4 ; matchingTeamMode++) {
        for (const code in character) {
            const characterNum = parseInt(code);
            const chars = await getChacterStat(characterNum, matchingTeamMode);
            
            for (var i = 0 ; i < chars.length ; i++) {
                const char = chars[i];
                const bestWeapon = parseInt(char['_id']);
                delete char['_id'];
                char['matchingTeamMode'] = matchingTeamMode;
                char['characterNum'] = characterNum;
                char['bestWeapon'] = bestWeapon;

                const skillOrder = await getChacterStatSkill(characterNum, bestWeapon, matchingTeamMode);
                const itemOrder = await getChacterStatItem(characterNum, bestWeapon, matchingTeamMode);

                char['skillOrder'] = skillOrder;
                char['itemOrder'] = itemOrder;

                char['itemStats'] = {};
                for (var j = 0 ; j < 6 ; j++) {
                    const itemType = await getChacterStatItemType(characterNum, bestWeapon, j, matchingTeamMode);
                    const itemCode = itemType['_id'];
                    delete itemType['_id'];
                    char['itemCode'] = itemCode;

                    char['itemStats'][j] = itemType;
                }

                const _ = await new Character(char).save();
            }
        }
    }

    console.log(Date.now() + ' : GetCharacterData Complete');
})

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

const getChacterStat = async (characterNum, matchingTeamMode) => {
    return await Match.aggregate([
        { $match: { characterNum: characterNum, seasonId: 1, matchingTeamMode: matchingTeamMode } },
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

const getChacterStatSkill = async (characterNum, bestWeapon, matchingTeamMode) => {
    return await Match.aggregate([
    { $match: { characterNum: characterNum, bestWeapon: bestWeapon, seasonId: 1, matchingTeamMode: matchingTeamMode } },
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

const getChacterStatItem = async (characterNum, bestWeapon, matchingTeamMode) => {
    return await Match.aggregate([
        { $match: { characterNum: characterNum, bestWeapon: bestWeapon, seasonId: 1, matchingTeamMode: matchingTeamMode } },
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

const getChacterStatItemType = async (characterNum, bestWeapon, type, matchingTeamMode) => {
    return await Match.aggregate([
        { $match: { characterNum: characterNum, bestWeapon: bestWeapon, seasonId: 1, matchingTeamMode: matchingTeamMode } },
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