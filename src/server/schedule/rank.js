

export const getRank = async () => {
    await Rank.deleteMany({matchingTeamMode:[1, 2, 3]});

    for (let index = 1; index < 4; index++) {
        const _rank = await getRank(1, index);
        const ranks = _rank.data.topRanks;

        for (let i = 0 ; i < ranks.length ; i++) {
            const r = ranks[i];
            r['matchingTeamMode'] = index;
            await new Rank(r).save();
        }
    }

    console.log(Data.now() + ' : getRank() Complete');
}

export const getRankStat = async () => {
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
    }

    console.log(Data.now() + ' : getRankStat() Complete');
}