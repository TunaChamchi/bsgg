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
schedule.scheduleJob('0 0 8 * * *', async () => {
    for (const code in character) {
        const characterNum = parseInt(code);
        const chars = await getChacterStat(characterNum);

        for (var i = 0 ; i < chars.length ; i++) {
            const char = chars[i];
            const bestWeapon = parseInt(char['_id']);
            delete char['_id'];
            char['characterNum'] = characterNum;
            char['bestWeapon'] = bestWeapon;

            const skillOrder = await getChacterStatSkill(characterNum, bestWeapon);
            const itemOrder = await getChacterStatItem(characterNum, bestWeapon);

            char['skillOrder'] = skillOrder;
            char['itemOrder'] = itemOrder;

            char['itemStats'] = {};
            for (var j = 0 ; j < 6 ; j++) {
                const itemType = await getChacterStatItemType(characterNum, bestWeapon, j);
                const itemCode = itemType['_id'];
                delete itemType['_id'];
                char['itemCode'] = itemCode;

                char['itemStats'][j] = itemType;
            }

            const _ = await new Character(char).save();
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
router.get('/:character/:bestWeapon', async (req, res, next) => {
    console.log(req.params, req.query);
    const characterNum = parseInt(req.params.character);
    const bestWeapon = parseInt(req.params.bestWeapon);

    const char = await Character.findOne({ characterNum: characterNum, bestWeapon:bestWeapon });
    res.json(char);
});

module.exports = router;

const getChacterStat = async (characterNum) => {
    return await Match.aggregate([
        { $match: { characterNum: characterNum } },
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

const getChacterStatSkill = async (characterNum, bestWeapon) => {
    return await Match.aggregate([
    { $match: { characterNum: characterNum, bestWeapon: bestWeapon } },
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

const getChacterStatItem = async (characterNum, bestWeapon) => {
    return await Match.aggregate([
        { $match: { characterNum: characterNum, bestWeapon: bestWeapon } },
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

const getChacterStatItemType = async (characterNum, bestWeapon, type) => {
    return await Match.aggregate([
        { $match: { characterNum: characterNum, bestWeapon: bestWeapon } },
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