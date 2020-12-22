import item from 'data/inGame/item.json'
import weapon from 'data/inGame/weapon.json'
import armor from 'data/inGame/armor.json'


let select = { type:'단검', start: '단검' };
let filterType = { };
let filterMap = { };
const defultOutList = ['물', '가죽', '돌멩이', '나뭇가지', '미스릴', '운석', 'VF혈액샘플'];
const typeList = ['무기', '머리', '옷', '팔', '다리', '장식'];
const type = ["단검","양손검","도끼","쌍검","권총","돌격소총","저격총","레이피어","창","망치","배트","투척","암기","활","석궁","글러브","톤파","기타","쌍절곤"];
const start = ["단검","양손검","도끼","권총","돌격소총","저격총","레이피어","창","망치","배트","투척","암기","활","석궁","글러브","톤파","기타","쌍절곤"];
const mapMove = {
    '골목길': ['절', '번화가', '연못', '병원', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '성당', '모래사장', '고급 주택가', '항구'],
    '절': ['골목길', '번화가', '연못', '병원', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '성당', '모래사장', '고급 주택가', '항구'],
    '번화가': ['골목길', '절', '연못', '병원', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '성당', '모래사장', '고급 주택가', '항구'],
    '연못': ['번화가', '절', '병원', '묘지'], 
    '병원': ['골목길', '절', '번화가', '연못', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '성당', '모래사장', '고급 주택가', '항구'],
    '양궁장': ['골목길', '절', '번화가', '연못', '병원', '학교', '묘지', '공장', '호텔', '숲', '성당', '모래사장', '고급 주택가', '항구'],
    '학교': ['양궁장', '골목길', '숲', '호텔', '번화가'],
    '묘지': ['성당', '공장', '병원', '연못'],
    '공장': ['항구', '성당', '묘지', '병원'],
    '호텔': ['골목길', '절', '번화가', '연못', '병원', '양궁장', '학교', '묘지', '공장', '숲', '성당', '모래사장', '고급 주택가', '항구'],
    '숲': ['학교', '호텔', '모래사장', '고급 주택가', '번화가', '성당'],
    '성당': ['골목길', '절', '번화가', '연못', '병원', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '모래사장', '고급 주택가', '항구'],
    '모래사장': ['골목길', '절', '번화가', '연못', '병원', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '성당', '고급 주택가', '항구'],
    '고급 주택가': ['골목길', '절', '번화가', '연못', '병원', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '성당', '모래사장', '항구'],
    '항구': ['고급 주택가', '성당', '공장'],
}

const mapSrc = {}
for (const mapName in map) {
    const _map = map[mapName]['quest'];
    mapSrc[mapName] = _map;
}


let allSrc = [];
let extSrc = {};
let selectSrc = {}
export const routeCalc = (ref_select, ref_filterType, ref_filterMap) => {
    select = { ...ref_select };
    filterType = { ...ref_filterType };
    filterMap = { ...ref_filterMap };

    if (Object.keys(select).length !== 8) return;
    //console.log('select', select); 

    this.selectSrc();
    
    allSrc = [];
    
    typeList.forEach(type => {
        selectSrc[type].forEach(src => { 
            if (!allSrc.includes(src)) allSrc.push(src);
        });
    });
    
    extSrc = {
        ALL: this.extMapByAll(),
    };
    typeList.forEach(type => {
        extSrc[type] = this.extMapByType(type);

        // TBD : 하위 아이템 먼저 제작 할 경우 추가 점수
        // if (selectSrc['_'+type] !== undefined) {
        //     extSrc['_'+type] = [];
        //     selectSrc['_'+type].forEach(sub => {
        //         extSrc['_'+type].push(this.extMapByType(mapSrc, type, selectSrc));
        //     })
        // }
    });

    const filterTypeList = [];
    const _filterType = {};

    [1, 2, 3, 4, 5].forEach(index => {
        if (filterType[index] !== undefined && filterType[index] !== '' && !filterTypeList.includes(filterType[index])) {
            _filterType[index] = filterType[index];
            filterTypeList.push(filterType[index]);
        }
    });

    [1, 2, 3, 4].forEach(index => {
        if (_filterType[index] === undefined || _filterType[index] === '') {
            if (_filterType[index+1] !== undefined && _filterType[index+1] !== '') {
                _filterType[index] = _filterType[index+1];
                _filterType[index+1] = undefined;
            }
        }
    })        

    if (filterType['2'] === undefined || filterType['2'] === '') {
        if (_filterType['1'] === undefined || _filterType['1'] === '') {
            _filterType['1'] = '무기';
            _filterType['2'] = '다리';
        } else if (_filterType['1'] !== '무기') {
            _filterType['2'] = '무기';
        } else {
            _filterType['2'] = '다리';
        }
    }      

    filterType = _filterType;

    let routeList = this.routeListByAll(6);

    if (routeList.length < 20)
        routeList = this.routeListByAll(7);

    const extTypeList = typeList.filter(type => !filterTypeList.includes(type));

    routeList.forEach(route => {
        const score = {
            '1': -route[_filterType['1']] *10.1,
            '2': -route[_filterType['2']] *6.9,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0,
        };

        [3, 4, 5].forEach(index => {
            if (_filterType[index] !== undefined && _filterType[index] !== '') {
                score[index] = -route[_filterType[index]] *(12.5-index*2.5); // 3순위 5점, 4순위 2.5점, 5순위 0점
            }
        });

        extTypeList.forEach((type, idx) => {
            const index = 7-extTypeList.length+idx;
            score[index] = -route[type] *(extTypeList.length-1.5); // 6순위부터 -1.5점, 5순위부터 -0.5점, 4순위부터 0.5점, 3순위부터 1.5점
        });

        route['score'] = score['1'] + score['2'] + score['3'] + score['4'] + score['5'] + score['6'] - route['route'].length*3;
    });
    const topList = this.routeSortTop(routeList, 20);
    console.log('topList', topList);

    this.setRouteListForItem(mapSrc, selectSrc, topList);
    console.log('topList', topList);

    return routeList;
    //this.setState({routeList: topList, selectRoute:{route:[]}, selectMap:'', selectMapSrc: []});
};

selectSrc = () => {
    selectSrc = {};
    ['무기', '머리', '옷', '팔', '다리', '장식'].forEach(type => {
        selectSrc[type] = [];
        this.itemSrc(selectSrc[type], select[type], type);
    });
};

itemSrc = (src, itemName, type) =>  {
    const outList = [...defultOutList, startWeapon[select['type']]];

    let list = [];

    item[itemName]['src'].forEach(_srcName => {
        if (item[_srcName]['src']) {
            const srcList = this.itemSrc(src, _srcName, type);

            if (type === '무기') {
                if (weapon[select['type']][_srcName] !== undefined) {
                    const _src = { name: _srcName, grade: item[_srcName]['grade'], src: [...srcList] };
                    if (selectSrc['_무기'] !== undefined) {
                        selectSrc['_무기'].push(_src);
                    } else {
                        selectSrc['_무기'] = [_src];
                    }
                }
            } else {
                if (armor[type][_srcName] !== undefined) {
                    const _src = { name: _srcName, grade: item[_srcName]['grade'], src: [...srcList] };
                    if (selectSrc['_'+type] !== undefined) {
                        selectSrc['_'+type].push(_src);
                    } else {
                        selectSrc['_'+type] = [_src];
                    }
                }
            }

            list = [...list, ...srcList];
        } else {
            if (!src.includes(_srcName) && !outList.includes(_srcName)){
                src.push(_srcName);
                list.push(_srcName);
            }
        }
    })

    return list;
}

extMapByAll = () => {
    const extMapSrc = {}
    for (const mapName in mapSrc) {
        extMapSrc[mapName] = allSrc.filter(src => !mapSrc[mapName].includes(src));
    }
    return extMapSrc;
}

extMapByType = (type) => {
    const extMapSrc = {}
    for (const mapName in mapSrc) {
        extMapSrc[mapName] = selectSrc[type].filter(src => !mapSrc[mapName].includes(src));
    }
    return extMapSrc;
}

routeListByAll = (MapIdx) => {
    const list = [];

    for (const mapName in mapMove) {
        const route = {
            route: []
        };

        this.routeListByAll2(list, route, extSrc['ALL'][mapName], mapName, 1, MapIdx);
    }

    return list;
}

routeListByAll2 = (list, route, _extSrc, mapName, idx, MapIdx) => {
    if (filterMap[idx] !== undefined && mapName !== filterMap[idx]) {
        return;
    }
    if (route['route'].length > MapIdx || idx > MapIdx) {
        return;
    }
    
    // if (list.length < 20) {
    //     if ((route[filterType['1']] === undefined && idx > 4) || route[filterType['1']] > 3) {
    //         return
    //     }
    //     if ((route[filterType['2']] === undefined && idx > 5) || route[filterType['2']] > 4) {
    //         return;
    //     }
    // }
    if (MapIdx === 7 && idx === MapIdx-1) {
        let count = 0;
        ['무기', '다리', '머리', '옷', '팔', '장식'].forEach(type => {
            if (route[type] === undefined) {
                count++;
            }
        });
        if (count > 2) { return };
    }
    if (idx === MapIdx) {
        let count = 0;
        ['무기', '다리', '머리', '옷', '팔', '장식'].forEach(type => {
            if (route[type] === undefined) {
                count++;
            }
        });
        if (count > 1) { return };
    }

    _extSrc = _extSrc.filter(src => extSrc['ALL'][mapName].includes(src));

    const _route = {
        ...route,
        route: [...route['route'], mapName]
    };

    ['무기', '머리', '옷', '팔', '다리', '장식'].forEach(type => {
        if (_route[type] !== undefined) return;

        const _extSrcType = _extSrc.filter(src => extSrc[type][mapName].includes(src));
        if (_extSrcType.length === 0) {
            _route[type] = idx
        }

    });

    if (_extSrc.length === 0) {
        list.push(_route);
        //console.log(_route);
    } else {
        mapMove[mapName].forEach(nextMap => {
            if (_route['route'].includes(nextMap)) return;

            this.routeListByAll2(list, _route, _extSrc, nextMap, idx+1), MapIdx;
        });
    }
}

routeSortTop = (routeList, topCount) => {
    const list = routeList;//.filter(route => route['score'] > 0);
    list.sort((r1, r2) => r2['score']-r1['score']);

    try {
        const top = list[topCount-1]['score'];

        return list.filter(route => route['score'] >= top);
    } catch(error) {
        return list;
    }
}