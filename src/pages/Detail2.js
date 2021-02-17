import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import AdSense from 'react-adsense';
import queryString from 'query-string';
import { Header, SubBanner, AdS, Footer } from 'components/banner';
import { Top, Trend, Skill } from 'components/detail';
import { Weapons, Armors, ItemOrder } from 'components/item';
import { getCharacter, getWeaponType, getSkill, getItem } from 'lib/data';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStartLoad: false,
            stats: [],
            mostUser: [],
            character: -1,
            gameMode: 1,
            bestWeapon: -1,
            weaponList: [],
            weaponTotal:0,
            skillTree: [],
            itemTabFocus: 0,
            mapList: {
                '양궁장': 'Archery',
                '골목길': 'Alley',
                '학교': 'School',
                '호텔': 'Hotel',
                '모래사장': 'Beach',
                '숲': 'Forest',
                '고급주택가': 'Uptown',
                '고급주택가': 'Uptown',
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
        this.setState({ isStartLoad: true })
    }

    componentDidUpdate(prevProps, prevState) {
        const { location } = this.props;
        const query = queryString.parse(location.search);

        this.fetchHandler(query, prevState)
    }

    fetchHandler = async (query, prevState) => {
        const { stats, tier, mostUser } = this.state
        const character = parseInt(query.character) || 1;
        const bestWeapon = parseInt(query.bestWeapon) || 0;
        const gameMode = parseInt(query.gameMode) || 1;

        if (character !== prevState.character) {
            let _stats;
            let _tier;
            let _most;
            
            await fetch('/api/character/'+character)
                .then(res => res.json())
                .then(res => { _stats = res['stats']; _tier = res['tier']; });

            await fetch('/api/Rank/character?characterCode='+character+'&limit=5')
                .then(res => res.json())
                .then(res => _most = res );
            
            this.init(query, _stats, _tier, _most);
        } else if (bestWeapon !== prevState.bestWeapon || gameMode !== prevState.gameMode) {
            this.init(query, stats, tier, mostUser);
        }
    }

    init(query, stats, tier, mostUser) {
        const character = parseInt(query.character) || 1;
        const bestWeapon = parseInt(query.bestWeapon) || 0;
        const gameMode = parseInt(query.gameMode) || 1;

        if (stats.length === 0) {
            window.location.href = '/404';
        }

        let stat = stats.filter(s => s['matchingTeamMode'] === gameMode && s['bestWeapon'] === bestWeapon);
        if (stat.length === 0) {
            //console.log('1');
            stat = stats.filter(s => s['matchingTeamMode'] === gameMode)[0];
            window.location.href = '/Detail?gameMode='+gameMode+'&character='+character+'&bestWeapon='+stat['bestWeapon'];
            return;
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
                } else {
                    tree.push('T');
                    order.push('R');
                    order.push('R');
                    order.push('T');
                    order.push('T');
                }
            }

            skillTree.push({
                tree: tree,
                order: order,
                win: skillOrder['top1'],
                pick: skillOrder['totalGames']/stat['totalGames'],
                total: skillOrder['totalGames'],
            });
        });

        const skillTree2 = [];
        skillTree.forEach(order => {
            const index = order['tree'][0] + order['tree'][1] + order['tree'][2] + order['tree'][3];

            const isSkill = skillTree2.filter(s => s['index'] === index);
            if (isSkill.length !== 0) {
                //const i = skillTree2.indexOf()
                isSkill[0]['win'] += order['win'];
                isSkill[0]['pick'] += order['pick'];
                isSkill[0]['total'] += order['total'];
            } else {
                const skill = {
                    index: index,
                    tree: order['tree'],
                    order: order['order'],
                    win: order['win'],
                    pick: order['pick'],
                    total: order['total'],
                };
                skillTree2.push(skill);
            }
        });
        skillTree2.sort((s1, s2) => s2['total']-s1['total']);

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
                        code: i,
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
            skillTree:skillTree2, itemOrder:itemOrder,
            weaponList:weaponList, weaponTotal:weaponTotal,
            mostUser:mostUser
        });
    }

    gameModeTabView = () => {
        const { intl } = this.props;
        const { character, bestWeapon, gameMode } = this.state;
        return ['solo', 'duo', 'squad'].map((type, idx) => 
            <Link to={'Detail?gameMode='+(idx+1)+'&character='+character+'&bestWeapon='+bestWeapon} key={'S_left_tab_'+idx}>
                <div className={"S_left_tab"+(idx===(gameMode-1)?' actived':'')}>{intl.formatMessage({id: type})}</div>
            </Link>
        )
    }

    mostUserView = () => {
        const { character, mostUser } = this.state

        return mostUser.map((user, idx) => 
            <div className="master_rank" key={"master_rank"+idx}>
                <span className="master_rank1">{idx+1}</span>
                <Link to={'/Match?userName=' + user['nickname']}>
                    <span className="master_rank2">{user['nickname']}</span>
                </Link>
                <span className="master_rank3">{user['characterStats'][character]['totalGames']}게임</span>
            </div>
        )
    }

    render() {
        const { intl } = this.props;
        const { stat, tier, character, bestWeapon, gameMode, weaponList, weaponTotal, skillTree, itemOrder, itemTabFocus } = this.state;
        
        if (!stat || !tier) return(<div></div>);

        const metaData = {
            title: 'BSGG.kr - ' +  intl.formatMessage({id: 'Title.Detail1'})+ " " + intl.formatMessage({id: 'characters.'+getCharacter(stat['characterNum'])['name']}) + ' ' + intl.formatMessage({id: 'weapons.'+getWeaponType(stat['bestWeapon'])}) + intl.formatMessage({id: 'Title.Detail2'}),
        }

        return (
            <div>
                <Header data={metaData}/>
                <SubBanner actived={'Tier'} />
                <div className="S_main2">
                    <Top 
                        stat={stat}
                        tier={tier}
                        weaponData={{weaponList, weaponTotal}}
                        parameter={{character, bestWeapon, gameMode}}
                        />
                    <div className="S_detail_tabbanner">
                        <div className="S_detail_tabs">
                            <div className="S_detail_tab">종합</div>
                            <div className="S_detail_tab">랭커빌드</div>
                            <div className="S_detail_tab actived">정보</div>
                            <div className="S_detail_tab">스킨</div>
                        </div>
                    </div>
                    <div className="S_left">
                        <div className="S_left_title">
                            <span className="S_left0">Skill Info</span>
                        </div>
                        <div className="S_left_wiki">
                            <div className="S_left_wiki_skill"></div>
                            <div className="S_left_wiki_vod"></div>
                            <div className="S_left_wiki_skill_imgbox">
                                <img className="S_left_wiki_skill_img actived" src="img/Skill/로지/로지_Q.jpg" />
                                <img className="S_left_wiki_skill_img" src="img/Skill/로지/로지_Q.jpg" />
                                <img className="S_left_wiki_skill_img" src="img/Skill/로지/로지_Q.jpg" />
                                <img className="S_left_wiki_skill_img" src="img/Skill/로지/로지_Q.jpg" />
                                <img className="S_left_wiki_skill_img" src="img/Skill/로지/로지_Q.jpg" />
                                <img className="S_left_wiki_skill_img" src="img/Skill/로지/로지_Q.jpg" />
                            </div>
                            <div className="S_left_wiki_skill_detailbox">
                                <span className="S_left_wiki_skill_detail1">스킬설명</span>
                                <span className="S_left_wiki_skill_detail2">세부스탯</span>
                            </div>
                        </div>
                    </div>
                    <div className="S_left_wiki_stats_all">
                        <div className="S_left_wiki_stats_title">Stats</div>
                        <div className="S_left_wiki_stats">
                            <div className="S_left_wiki_stat_title">LV1 능력치</div>
                            <div className="S_left_wiki_stat">
                                <div className="S_left_wiki_stat1">공격력</div>
                                <div className="S_left_wiki_stat2">33</div>
                            </div>
                            <div className="S_left_wiki_stat">
                                <div className="S_left_wiki_stat1">공격력</div>
                                <div className="S_left_wiki_stat2">33</div>
                            </div>
                            <div className="S_left_wiki_stat">
                                <div className="S_left_wiki_stat1">공격력</div>
                                <div className="S_left_wiki_stat2">33</div>
                            </div>
                            <div className="S_left_wiki_stat">
                                <div className="S_left_wiki_stat1">공격력</div>
                                <div className="S_left_wiki_stat2">33</div>
                            </div>
                            <div className="S_left_wiki_stat">
                                <div className="S_left_wiki_stat1">공격력</div>
                                <div className="S_left_wiki_stat2">33</div>
                            </div>
                            <div className="S_left_wiki_stat">
                                <div className="S_left_wiki_stat1">공격력</div>
                                <div className="S_left_wiki_stat2">33</div>
                            </div>
                            <div className="S_left_wiki_stat">
                                <div className="S_left_wiki_stat1">공격력</div>
                                <div className="S_left_wiki_stat2">33</div>
                            </div>
                        </div>
                        <div className="S_left_wiki_stats">
                            <div className="S_left_wiki_stat_title">LV20 능력치</div>
                            <div className="S_left_wiki_stat">
                                <div className="S_left_wiki_stat1">공격력</div>
                                <div className="S_left_wiki_stat2">33</div>
                            </div>
                            <div className="S_left_wiki_stat">
                                <div className="S_left_wiki_stat1">공격력</div>
                                <div className="S_left_wiki_stat2">33</div>
                            </div>
                            <div className="S_left_wiki_stat">
                                <div className="S_left_wiki_stat1">공격력</div>
                                <div className="S_left_wiki_stat2">33</div>
                            </div>
                            <div className="S_left_wiki_stat">
                                <div className="S_left_wiki_stat1">공격력</div>
                                <div className="S_left_wiki_stat2">33</div>
                            </div>
                            <div className="S_left_wiki_stat">
                                <div className="S_left_wiki_stat1">공격력</div>
                                <div className="S_left_wiki_stat2">33</div>
                            </div>
                            <div className="S_left_wiki_stat">
                                <div className="S_left_wiki_stat1">공격력</div>
                                <div className="S_left_wiki_stat2">33</div>
                            </div>
                            <div className="S_left_wiki_stat">
                                <div className="S_left_wiki_stat1">공격력</div>
                                <div className="S_left_wiki_stat2">33</div>
                            </div>
                        </div>
                        <div className="S_left_wiki_stats">
                            <div className="S_left_wiki_stat_title">성장치</div>
                            <div className="S_left_wiki_stat">
                                <div className="S_left_wiki_stat1">공격력</div>
                                <div className="S_left_wiki_stat2">33</div>
                            </div>
                            <div className="S_left_wiki_stat">
                                <div className="S_left_wiki_stat1">공격력</div>
                                <div className="S_left_wiki_stat2">33</div>
                            </div>
                            <div className="S_left_wiki_stat">
                                <div className="S_left_wiki_stat1">공격력</div>
                                <div className="S_left_wiki_stat2">33</div>
                            </div>
                            <div className="S_left_wiki_stat">
                                <div className="S_left_wiki_stat1">공격력</div>
                                <div className="S_left_wiki_stat2">33</div>
                            </div>
                            <div className="S_left_wiki_stat">
                                <div className="S_left_wiki_stat1">공격력</div>
                                <div className="S_left_wiki_stat2">33</div>
                            </div>
                            <div className="S_left_wiki_stat">
                                <div className="S_left_wiki_stat1">공격력</div>
                                <div className="S_left_wiki_stat2">33</div>
                            </div>
                            <div className="S_left_wiki_stat">
                                <div className="S_left_wiki_stat1">공격력</div>
                                <div className="S_left_wiki_stat2">33</div>
                            </div>
                        </div>
                    </div>
                </div>
                <AdS type={'Detail'}/>
                <Footer />
            </div>
        );
    };
}

export default injectIntl(Detail);