import avg from 'data/avg.json';
import CharList from 'data/character.json';
import CharListPre from 'data/character_pre.json';
import WeaponList from 'data/weapon.json';
import ArmorList from 'data/armor.json';
import version from 'data/version.json';
import dmg_plus from 'data/dmg_plus.json'

import character from 'data/inGame/character.json'
import weaponType from 'data/inGame/weaponType.json'
import item from 'data/inGame/item.json'
import skill from 'data/inGame/skill.json'
import armor from 'data/inGame/armor.json'
import weapon from 'data/inGame/weapon.json'

import skilTree from 'data/sub/skill.json'

const max = {};
const min = {};

export const Version = 'Upadated ' + version['updated'] + ' / Data period ' + version['data-period'];

export const Avg = (range, type) => {
    return avg[range][type];
}

export const Max = (range, type) => {
    return max[range][type];
}

export const Min = (range, type) => {
    return min[range][type];
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
    let max_avg_rank = 18;

    let min_score = 100;
    let min_win_rate = 100;
    let min_pick_rate = 100;
    let min_avg_kill = 100;
    let min_avg_rank = 0;

    // 값 가져오기
    for (const key1 in list) {
        for (const key2 in list[key1]) {
            const data = list[key1][key2];
            const value = {character:key1, weapon:key2, data:data};

            tier.push(value);
            if (data['winRate']  > max_win_rate)   max_win_rate  = data['winRate'];
            if (data['pickRate'] > max_pick_rate)  max_pick_rate = data['pickRate'];
            if (data['avgKAM']  > max_avg_kill)   max_avg_kill  = data['avgKAM'];
            if (data['avgRank']  < max_avg_rank)   max_avg_rank  = data['avgRank'];
            
            if (data['winRate']  < min_win_rate)   min_win_rate  = data['winRate'];
            if (data['pickRate'] < min_pick_rate)  min_pick_rate = data['pickRate'];
            if (data['avgKAM']  < min_avg_kill)   min_avg_kill  = data['avgKAM'];
            if (data['avgRank']  > min_avg_rank)   min_avg_rank  = data['avgRank'];
        }
    }

    // max, min 값 지정
    max[range] = {}
    max[range][type] = {
        'winRate' : max_win_rate,
        'pickRate': max_pick_rate,
        'avgKAM' : max_avg_kill,
        'avgRank' : max_avg_rank 
    }
    min[range] = {}
    min[range][type] = {
        'winRate' : min_win_rate,
        'pickRate': min_pick_rate,
        'avgKAM' : min_avg_kill,
        'avgRank' : min_avg_rank 
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
            'winRate' : data['data']['winRate']   /max_win_rate*100,
            'pickRate': (1-data['rank']['pickRate']/tier.length)*100,
            'avgKAM' : data['data']['avgKAM']   /max_avg_kill*100,
            'avgRank' : (1-data['rank']['avgRank']/tier.length)*100
        }

        if (type === "solo")
            data['score']['total'] = (data['score']['winRate']*1.3   + data['score']['pickRate']*0.8 + data['score']['avgKAM']*1.2    + data['score']['avgRank']*0.7  )/4;
        else if (type === "duo")
            data['score']['total'] = (data['score']['winRate']*1.3   + data['score']['pickRate']*1.1 + data['score']['avgKAM']*0.9    + data['score']['avgRank']*0.5)/3.8;
        else if (type === "squad")
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
    
    return tier;
}

export const CharacterPreRank = (range, type) => {
    const list = {};
    for (const key in CharListPre) {
        try {
        const data = CharListPre[key][range][type];

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
    let max_avg_rank = 18;

    // 값 가져오기
    for (const key1 in list) {
        for (const key2 in list[key1]) {
            const data = list[key1][key2];
            const value = {character:key1, weapon:key2, data:data};

            tier.push(value);
            if (data['winRate']  > max_win_rate)   max_win_rate  = data['winRate'];
            if (data['pickRate'] > max_pick_rate)  max_pick_rate = data['pickRate'];
            if (data['avgKAM']  > max_avg_kill)   max_avg_kill  = data['avgKAM'];
            if (data['avgRank']  < max_avg_rank)   max_avg_rank  = data['avgRank'];
        }
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
            'winRate' : data['data']['winRate']   /max_win_rate*100,
            'pickRate': data['data']['pickRate']  /max_pick_rate*100,
            'avgKAM' : data['data']['avgKAM']   /max_avg_kill*100,
            'avgRank' : (1-data['rank']['avgRank']/tier.length)*100
        }

        if (type === "solo")
            data['score']['total'] = data['score']['winRate']*1.5   + data['score']['pickRate'] + data['score']['avgKAM']    + data['score']['avgRank'];
        else if (type === "duo")
            data['score']['total'] = data['score']['winRate']*1.5   + data['score']['pickRate'] + data['score']['avgKAM']/2  + data['score']['avgRank']/2;
        else if (type === "squad")
            data['score']['total'] = data['score']['winRate']*1.5   + data['score']['pickRate'] + data['score']['avgKAM']/3  + data['score']['avgRank']/3;
        
        if (data['score']['total'] > max_score) max_score = data['score']['total'];
    });

    // 티어, 순위 계산
    tier.forEach(data1 => {
        data1['rank']['total'] = 1;
        tier.forEach(data2 => {
            if (data1['score']['total'] < data2['score']['total'])
                data1['rank']['total']++;
        });
    });

    const rank = {}

    tier.forEach(data => {
        const character = data['character'];
        const weapon    = data['weapon'];
        const char = {
            'total'    : data['rank']['total'],
            'winRate' : data['rank']['pickRate'],
            'pickRate': data['rank']['winRate'],
            'avgKAM' : data['rank']['avgKAM'],
            'avgRank' : data['rank']['avgRank']
        }

        rank[character+'-'+weapon] = char;
    });

    return rank;
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

export const Armor = (range, type) => {
    const armorist = ArmorList[type];
    const list = [];
    for (const key in armorist) {
        try {
            const data = {
                name: key,
                'winRate': armorist[key][range]
            };

            list.push(data);
        } catch {
            break;
        }
    }

    return list;    
}

export const dmgPlus = (character, type, name) => {
    return dmg_plus[character][type][name];
}

export const getStat = (name, stat, idx) => {
    return character[name]['stat'][stat][idx];
}

export const skillTreeList = (character, weapon) => {
    return skilTree[character][weapon];
}

export const itemBgI = (name) => {
    return 'img/Item/BackGround/'+item[name]['grade']+'.jpg'
}

export const statList = (name) => {
    return item[name]["stat"];
}


export const createJson = (json1, json2) => {
    for (const key in json2) {
        json1[key] = json2[key];
    }
}
export const addJson = (json1, json2) => {
    for (const key in json1) {
        json1[key] += json2[key];
    }
}


export const getCharacter = (code) => {
    return character[code];
}

export const getCharacterKeys = () => {
    return Object.keys(character);
}

export const getItem = (code) => {
    return item[code];
}

export const getWeaponType = (code) => {
    return weaponType[code];
}

export const getSkill = (code) => {
    return skill[code];
}


