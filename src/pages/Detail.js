import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import queryString from 'query-string';
import { Header, SubBanner, AdS, Footer } from 'components/banner';
import { Top, Trend, Skill } from 'components/detail';
import { Weapons, Armors, ItemOrder } from 'components/item';
import { getCharacter, getWeaponType, getSkill, getItem } from 'lib/data';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            stats: [],
            data: {},
            character: -1,
            gameMode: 1,
            bestWeapon: -1,
            weaponList: [],
            weaponTotal:0,
            ad_style: {},
            skillTree: [],
            skillTree2: [],
            mapList: {
                '양궁장': 'Archery',
                '골목길': 'Alley',
                '학교': 'School',
                '호텔': 'Hotel',
                '모래사장': 'Beach',
                '숲': 'Forest',
                '고급주택가': 'Uptown',
                '고급 주택가': 'Uptown',
                '연못': 'Pond',
                '절': 'Temple',
                '병원': 'Hospital',
                '성당': 'Chapel',
                '공장': 'Factory',
                '항구': 'Dock',
                '묘지': 'Cemetery',
                '번화가': 'Avenue'
            },
        };
    }
    
    componentDidMount() {
        window.scrollTo(0, 0);
        this.setState({ isLoad: true })
    }

    componentDidUpdate(prevProps, prevState) {
        const { location } = this.props;
        const query = queryString.parse(location.search);

        this.fetchHandler(query, prevState)
    }

    fetchHandler = async (query, prevState) => {
        const { stats, tier } = this.state
        const character = parseInt(query.character) || 1;
        const bestWeapon = parseInt(query.bestWeapon) || 0;
        const gameMode = parseInt(query.gameMode) || 1;

        if (character !== prevState.character) {
            let _stats;
            let _tier;
            
            await fetch('/api/character/'+character)
                .then(res => res.json())
                .then(res => { _stats = res['stats']; _tier = res['tier']; });
            
            this.init(query, _stats, _tier);
        } else if (bestWeapon !== prevState.bestWeapon || gameMode !== prevState.gameMode) {
            this.init(query, stats, tier);
        }
    }

    init(query, stats, tier) {
        const character = parseInt(query.character) || 1;
        const bestWeapon = parseInt(query.bestWeapon) || 0;
        const gameMode = parseInt(query.gameMode) || 1;

        let stat = stats.filter(s => s['matchingTeamMode'] === gameMode && s['bestWeapon'] === bestWeapon);
        if (stat.length === 0) {
            stat = stats.filter(s => s['matchingTeamMode'] === gameMode)[0];
        } else {
            stat = stat[0];
        }

        let _bestWeapon = stat['bestWeapon'];
        
        const weaponList = [];
        let weaponTotal = 0
        stats.filter(s => s['matchingTeamMode'] === gameMode)
            .sort((s1, s2) => s2['totalGames']-s1['totalGames'])
            .forEach(s => {
                weaponTotal += parseInt(s['totalGames']);
                weaponList.push({
                    code: s['bestWeapon'],
                    total: s['totalGames']
                });
            });
        
        const skillTree = [];
        stat['skillOrder'].forEach(skillOrder => {
            const tree = [];
            const count = { Q: 0, W: 0, E: 0, T: 0 };

            const _skillOrder = skillOrder['_id'].split('_').slice(1, 17);
            const order = [];

            _skillOrder.forEach(skill => {
                const button = getSkill(skill)['button'];
                count[button]++
                if ((button === 'T' && count[button] === 2) || count[button] === 5) {
                    tree.push(button);
                }
                order.push(button);
            });

            if (tree.length === 2) {
                if (count['Q'] < 5) { 
                    tree.push('Q');
                    order.push('Q');
                    order.push('Q');
                } else if (count['W'] < 5) { 
                    tree.push('W');
                    order.push('W');
                    order.push('W');
                } else if (count['E'] < 5) { 
                    tree.push('E');
                    order.push('E');
                    order.push('E');
                }
                tree.push('T');
                order.push('T');
                order.push('T');
            } else {
                if (count['Q'] < 5) { 
                    tree.push('Q');
                    order.push('Q');
                    order.push('Q');
                    order.push('Q');
                    order.push('Q');
                } else if (count['W'] < 5) { 
                    tree.push('W');
                    order.push('W');
                    order.push('W');
                    order.push('W');
                    order.push('W');
                } else if (count['E'] < 5) { 
                    tree.push('E');
                    order.push('E');
                    order.push('E');
                    order.push('E');
                    order.push('E');
                }
            }

            skillTree.push({
                tree: tree,
                order: order,
                win: skillOrder['top1'],
                pick: skillOrder['totalGames']/stat['totalGames'],
                total: skillOrder['totalGames'],
            });
        })

        const itemOrder = [];
        stat['itemOrder'].forEach(order => {
            if (order['_id'].split('_').slice(1, 8).length === 7) {
                const _order = order['_id'].split('_').slice(1, 7);
                const itemList = [];
                
                let isCommon = false;
                _order.forEach(i => {
                    const item = getItem(i);
                    if (item['itemGrade'] === '일반') isCommon = true;

                    const _item = {
                        name: item['name'],
                        itemGrade: item['itemGrade']
                    }
                    itemList.push(_item);
                })

                if (!isCommon) {
                    itemOrder.push({
                        itemList: itemList,
                        win: order['top1'],
                        pick: order['totalGames']/stat['totalGames'],
                        total: order['totalGames'],
                    })
                }
            }
        })

        this.setState({ 
            character:character, bestWeapon:_bestWeapon, 
            gameMode:gameMode, stats:stats, stat:stat, tier:tier,
            skillTree:skillTree, itemOrder:itemOrder,
            weaponList:weaponList, weaponTotal:weaponTotal 
        });
    }

    render() {
        const { intl } = this.props;
        const { stat, tier, character, bestWeapon, gameMode, weaponList, weaponTotal, skillTree, itemOrder } = this.state;
        
        const metaData = {
            title: 'BSGG.kr - ' + character, //+ intl.formatMessage({id: 'characters.'+data['character']}) + ' ' + intl.formatMessage({id: 'weapons.'+data['weapon']}),
            description: '영원회귀 : 블랙 서바이벌 통계, 캐릭터 티어, 아이템 트렌드, BS:ER Stats, Character Tier, Item Trend'
        }

        if (!stat || !tier) return(<div></div>);

        return (
            <div>
                <Header data={metaData}/>
                <SubBanner />
                <div className="S_main">
                    <Top 
                        stat={stat}
                        tier={tier}
                        weaponData={{weaponList, weaponTotal}}
                        parameter={{character, bestWeapon, gameMode}}
                        />
                    <div className="S_left">
                        <span className="S_left0">Guide</span>
                        <div className="tabHeaders">
                            <div className="S_left_tab actived">솔로</div>
                            <div className="S_left_tab">듀오</div>
                            <div className="S_left_tab">스쿼드</div>
                        </div>
                        <Skill
                            stat={stat}
                            skillTree={skillTree}
                            parameter={{character, bestWeapon, gameMode}}
                            />
                        <div className="item">
                            <div className="item0"> 
                                <div className="item0_span">추천 아이템</div>
                                <div className="tabHeaders">
                                    <div className="item0_tab">순위</div>
                                    <div className="item0_tab actived">빌드</div>
                                </div>
                            </div>
                            <ItemOrder 
                                itemOrder={itemOrder}
                                startWeapon={bestWeapon}
                                />
                            <div className="item_rank">
                                <Weapons 
                                    stat ={stat}
                                    />
                                <Armors 
                                    stat={stat}
                                    />
                            </div>
                        </div>
                    </div>
                    <Trend 
                        stat={stat}
                        tier={tier}
                        parameter={{character, bestWeapon, gameMode}}
                        />
                </div>
                <AdS type={'Detail'}/>
                <Footer />
            </div>
            
        );
    };
}

export default injectIntl(Detail);