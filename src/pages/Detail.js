import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import queryString from 'query-string';
import { Header, SubBanner, AdS, Footer } from 'components/banner';
import { Top, Trend, Skill } from 'components/detail';
import { Weapons, Armors } from 'components/item';
import { CharacterScore, skillTreeList } from 'lib/data';
import mapImg from 'img/map2.png';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        console.log('componentDidMount()');
        window.scrollTo(0, 0);
        const { location } = this.props;
        const query = queryString.parse(location.search);

        const character = parseInt(query.character) || 1;
        const gameMode = parseInt(query.type) || 1;
        
        this.setState({ character:character, gameMode:gameMode });
    };
    componentDidUpdate(prevProps, prevState){
        console.log('componentDidUpdate()');
        const { location } = this.props;
        const query = queryString.parse(location.search);

        this.fetchHandler(query, prevState);
    };

    fetchHandler = async (query, prevState) => {
        const character = parseInt(query.character) || 1;
        const gameMode = parseInt(query.gameMode) || 1;

        if (character !== prevState.character) {
            console.log('character', character, prevState.character);
            let _stats;
            
            await fetch('/api/character/'+character)
                .then(res => res.json())
                .then(stats => _stats = stats);
            
            this.setState({ character:character, stats:_stats });
            this.init();
        } else if (gameMode !== prevState.gameMode) {
            console.log('gameMode', gameMode, prevState.gameMode);
            this.init();
        }
    }

    init() {
        const { stats, gameMode, bestWeapon } = this.state;

        if (stats.length === 0) return;

        let stat = stats.filter(s => s['matchingTeamMode'] === gameMode && s['bestWeapon'] === bestWeapon);
        if (stat.length === 0) {
            stat = stats.filter(s => s['matchingTeamMode'] === gameMode)[0];
        } else {
            stat = stat[0];
        }

        console.log(stat);
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
        
        this.setState({ stat:stat, bestWeapon:_bestWeapon, weaponList:weaponList, weaponTotal:weaponTotal });
    }

    render() {
        const { intl } = this.props;
        const { stat, character, bestWeapon, gameMode, weaponList, weaponTotal, mapList } = this.state;
        
        const metaData = {
            title: 'BSGG.kr - ' + character, //+ intl.formatMessage({id: 'characters.'+data['character']}) + ' ' + intl.formatMessage({id: 'weapons.'+data['weapon']}),
            description: '영원회귀 : 블랙 서바이벌 통계, 캐릭터 티어, 아이템 트렌드, BS:ER Stats, Character Tier, Item Trend'
        }

        if (!stat) return(<div></div>);

        return (
            <div>
                <Header data={metaData}/>
                <SubBanner />
                <div className="S_main">
                    <Top 
                        stat={stat}
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
                        {/* <Skill
                            data={data}
                            skillTree={skillTree}
                            skillTree2={skillTree2}
                            parameter={{character, weapon, rangeFocus, gameMode}}
                            /> */}
                        <div className="item">
                            <div className="item0"> 
                                <div className="item0_span">추천 아이템</div>
                                <div className="tabHeaders">
                                    <div className="item0_tab">순위</div>
                                    <div className="item0_tab actived">빌드</div>
                                </div>
                            </div>
                            <div className='item_tabs'>
                                <div className='item_tab actived'>
                                    <div className="item_tab_imgbox_all">
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                            <div className="S_item_tooltip4">
                                                <span>ㅇㅇ</span>
                                            </div>
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                            <div className="S_item_tooltip5">
                                                <span>ㅇㅇ</span>
                                            </div>
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                            <div className="S_item_tooltip6">
                                                <span>ㅇㅇ</span>
                                            </div>
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                            <div className="S_item_tooltip4">
                                                <span>ㅇㅇ</span>
                                            </div>
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                            <div className="S_item_tooltip5">
                                                <span>ㅇㅇ</span>
                                            </div>
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                            <div className="S_item_tooltip6">
                                                <span>ㅇㅇ</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='item_tab_span'>
                                        <span className='item_tab_span1'>픽률 27.6%</span>
                                        <span className='item_tab_span2'>승률 34.6%</span>
                                        <span className='item_tab_span3'>340</span>
                                    </div>
                                </div>
                                <div className='item_tab'>
                                    <div className="item_tab_imgbox_all">
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                    </div>
                                    <div className='item_tab_span'>
                                        <span className='item_tab_span1'>픽률 27.6%</span>
                                        <span className='item_tab_span2'>승률 34.6%</span>
                                        <span className='item_tab_span3'>340</span>
                                    </div>
                                </div>
                                <div className='item_tab'>
                                    <div className="item_tab_imgbox_all">
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                    </div>
                                    <div className='item_tab_span'>
                                        <span className='item_tab_span1'>픽률 27.6%</span>
                                        <span className='item_tab_span2'>승률 34.6%</span>
                                        <span className='item_tab_span3'>340</span>
                                    </div>
                                </div>
                                <div className='item_tab'>
                                    <div className="item_tab_imgbox_all">
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                    </div>
                                    <div className='item_tab_span'>
                                        <span className='item_tab_span1'>픽률 27.6%</span>
                                        <span className='item_tab_span2'>승률 34.6%</span>
                                        <span className='item_tab_span3'>340</span>
                                    </div>
                                </div>
                                <div className='item_tab'>
                                    <div className="item_tab_imgbox_all">
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                        <div className="item_tab_imgbox">
                                            <img className="item_tab_bg" src="img/item/BackGround/영웅.jpg" />
                                            <img className="item_tab_img" src="img/item/AK-12.png" />
                                        </div>
                                    </div>
                                    <div className='item_tab_span'>
                                        <span className='item_tab_span1'>픽률 27.6%</span>
                                        <span className='item_tab_span2'>승률 34.6%</span>
                                        <span className='item_tab_span3'>340</span>
                                    </div>
                                </div>
                            </div>
                            <div className="item_route">
                                <div className="tabHeaders">
                                    <div className="item_route_tab actived">루트1</div>
                                    <div className="item_route_tab">루트2</div>
                                    <div className="item_route_tab">루트3</div>
                                    <div className="item_route_tab">루트4</div>
                                    <div className="item_route_tab">루트5</div>
                                </div>
                                <div className="item_route_map">
                                    <img className="item_route_map2" src={mapImg} /> 
                                    {
                                        // Object.keys(mapList).map((key, idx) => {
                                        //     const en = mapList[key].toLowerCase();
                                        //     return <img className={"Route_R_Mapimg_"+en} src={'img/map/'+key+'.png'} key={'Mapimg_'+idx} /> 
                                            
                                        // })
                                    }
                                    <div className="Route_R_Mapspan_box">
                                        {
                                            // Object.keys(mapList).map((key, idx) => {
                                            //     const en = mapList[key].toLowerCase();
                                            //     //const index = selectRoute['route'].indexOf(key);
                                            //     //const isSelect = selectMap === key ? ' actived' : '';
                                            //     //if (index >= 0) {
                                            //         return (
                                            //             <div key={'Mapspan_'+idx}>
                                            //                 <span className={"Route_R_Mapspan_"+en+"1"} key={'Mapspan_'+idx} > {idx+1} </span>
                                            //                 <span className={"Route_R_Mapspan_"+en}> {intl.formatMessage({id: mapList[key]})} </span>
                                            //             </div>
                                            //         )
                                            //     //}
                                            // })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item_route_spawn">
                            <div className="item_route_spawnY">
                                <div className="item_route_spawn_title">1 골목길</div>
                                <div className="item_route_spawn_Make">
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                </div>
                                <div className="item_route_spawn_Need">
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                </div>
                            </div>
                            <div className="item_route_spawnY">
                                <div className="item_route_spawn_title">2 골목길</div>
                                <div className="item_route_spawn_Make">
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                </div>
                                <div className="item_route_spawn_Need">
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                </div>
                            </div>
                            <div className="item_route_spawnY-R">
                                <div className="item_route_spawn_title">3 골목길</div>
                                <div className="item_route_spawn_Make">
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                </div>
                                <div className="item_route_spawn_Need">
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                </div>
                            </div>
                            <div className="item_route_spawnY">
                                <div className="item_route_spawn_title">4 골목길</div>
                                <div className="item_route_spawn_Make">
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                </div>
                                <div className="item_route_spawn_Need">
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                </div>
                            </div>
                            <div className="item_route_spawnY">
                                <div className="item_route_spawn_title">5 골목길</div>
                                <div className="item_route_spawn_Make">
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                </div>
                                <div className="item_route_spawn_Need">
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                </div>
                            </div>
                            <div className="item_route_spawnY-R">
                                <div className="item_route_spawn_title">6 골목길</div>
                                <div className="item_route_spawn_Make">
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                </div>
                                <div className="item_route_spawn_Need">
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="item_route_spawn_Make_img">
                                        <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item_rank">
                            {/* <Weapons 
                                character={character}
                                weapon={weapon}
                                range={rangeFocus}
                                type={gameMode}
                            />
                            <Armors 
                                range={gameMode}
                            /> */}
                        </div>
                    </div>
                    <Trend 
                        stat={stat}
                        />
                </div>
                <AdS type={'Detail'}/>
                <Footer />
            </div>
            
        );
    };
}

export default injectIntl(Detail);