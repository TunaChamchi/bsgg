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
        console.error(error);
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
        console.error(error);
    }
};

router.get('/', async (req, res, next) => {
    const mode = req.query.mode;
    const ranks = await Rank
                    .find({matchingTeamMode:mode}, null
                        , {sort:{rank:1}});

    
    
    res.json(ranks);
});

router.post('/', async (req, res, next) => {
    try {
        //await Rank.deleteMany({matchingTeamMode:[1, 2, 3]});
        const ranks = await Rank.find({});
        //let count = 0;
        //for (let index = 1; index < 4; index++) {            
        //    const _rank = await getRank(1, index);
        //    const ranks = _rank.data.topRanks;
            
            //await sleep(1000);
            for (let i = 0 ; i < ranks.length ; i++) {
                //const r = ranks[i];
                //r['matchingTeamMode'] = index;
                //new Rank(r).save();
                
                const user = await getUserStats(ranks[i]['userNum'], 1);

                for (let j = 0 ; j < ranks.length ; j++) {

                }

                console.log(user.data.userStats[0]);
                new Users(user.data.userStats[0]).save(); 
                await sleep(1000);

                count++;
            }
        //}

        res.send('{"code": 200, "message": "Success", "count": '+count+'}');
    } catch (err) {
        res.send('{"code": 500, "message": "'+err+'"}');
    }
});




module.exports = router;