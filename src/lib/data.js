import avg from 'data/avg.json';
import CharList from 'data/character.json';
import WeaponList from 'data/weapon.json';
import ItemList from 'data/item.json';

const max = {};

export const Avg = (range, type) => {
    return avg[range][type];
}

export const Max = (range, type) => {
    console.log('max', max[range][type]);
    return max[range][type];
}

export const CharacterScore = (range, type) => {
    const list = {};
    for (const key in CharList) {
        try {
        const data = CharList[key][range][type];

        list[key] = data;
        } catch {
            break;
        }
    }

    const tier = [];
    let max_score = 0;
    let max_win_rate = 0;
    let max_pick_rate = 0;
    let max_avg_kill = 0;
    let max_avg_rank = 0;

    // 값 가져오기
    for (const key1 in list) {
        for (const key2 in list[key1]) {
            const data = list[key1][key2];
            const value = {character:key1, weapon:key2, data:data};

            tier.push(value);
            if (data['win-rate'] >  max_win_rate)   max_win_rate  = data['win-rate'];
            if (data['pick-rate'] > max_pick_rate)  max_pick_rate = data['pick-rate'];
            if (data['avg-kill'] >  max_avg_kill)   max_avg_kill  = data['avg-kill'];
            if (data['avg-rank'] >  max_avg_rank)   max_avg_rank  = data['avg-rank'];
        }
    }

    // max 값 지정
    max[range] = {}
    max[range][type] = {
        'win-rate' : max_win_rate,
        'pick-rate': max_pick_rate,
        'avg-kill' : max_avg_kill,
        'avg-rank' : max_avg_rank 
    }

    // 순위 계산
    tier.forEach(data1 => {
        data1['rank'] = {
            'win-rate' : 1,
            'pick-rate': 1,
            'avg-kill' : 1,
            'avg-rank' : 1
        }

        tier.forEach(data2 => {
            if (data1['data']['win-rate'] < data2['data']['win-rate']) {
                data1['rank']['win-rate']++;
            }
            if (data1['data']['pick-rate'] < data2['data']['pick-rate']) {
                data1['rank']['pick-rate']++;
            }
            if (data1['data']['avg-kill'] < data2['data']['avg-kill']) {
                data1['rank']['avg-kill']++;
            }
            if (data1['data']['avg-rank'] > data2['data']['avg-rank']) {
                data1['rank']['avg-rank']++;
            }
        });
    });

    // 점수 계산
    tier.forEach(data => {        
        data['score'] = {
            'win-rate' : data['data']['win-rate']   /max_win_rate*100,
            'pick-rate': data['data']['pick-rate']  /max_pick_rate*100,
            'avg-kill' : data['data']['avg-kill']   /max_avg_kill*100,
            'avg-rank' : (1-data['rank']['avg-rank']/tier.length)*100
        }

        if (type === "solo")
            data['score']['total'] = ( data['score']['win-rate']     + data['score']['pick-rate'] + data['score']['avg-kill']    + data['score']['avg-rank']/2 ) / 3.5;
        else if (type === "duo")
            data['score']['total'] = ( data['score']['win-rate']*1.5 + data['score']['pick-rate'] + data['score']['avg-kill']/2  + data['score']['avg-rank']/3 ) / 4;
        else if (type === "squad")
            data['score']['total'] = ( data['score']['win-rate']*2   + data['score']['pick-rate'] + data['score']['avg-kill']/3  + data['score']['avg-rank']/4 ) / 4.5;
        
        if (data['score']['total'] > max_score) max_score = data['score']['total'];
    });

    // 티어, 순위 계산
    tier.forEach(data1 => {
        const tier_score = data1['score']['total']/max_score;
        if (tier_score > 0.95) {
            data1['tier'] = 0;
        } else if (tier_score > 0.9) {
            data1['tier'] = 1;
        } else if (tier_score > 0.7) {
            data1['tier'] = 2;
        } else if (tier_score > 0.4) {
            data1['tier'] = 3;
        } else if (tier_score > 0.2) {
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
    
    return tier;
}

export const Weapon = (character, weapon, type) => {
    const weaponList = WeaponList[character][weapon]
    const list = [];
    for (const key in weaponList) {
        try {
            const data = weaponList[key][type];

            data.weapon = key;
            list.push(data);
        } catch {
            break;
        }
    }

    return list;
}

export const Item = () => {
    
}