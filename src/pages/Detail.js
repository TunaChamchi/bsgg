import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import queryString from 'query-string';
import ScriptTag from 'react-script-tag';
import { Header, SubBanner, AdS, Footer } from 'components/banner';
import { Top, Trend, Skill } from 'components/detail';
import { Weapons, Armors } from 'components/item';
import { CharacterScore, skillTreeList } from 'lib/data';
import mapImg from 'img/map2.png';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            character: '',
            weapon: '',
            weaponList: [],
            rangeFocus: '',
            typeFocus: '',
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
    componentWillMount() {
        window.scrollTo(0, 0);

        this.init();
    };
    componentDidUpdate(prevProps, prevState){
        const { location } = this.props;
        const prevquery = queryString.parse(prevProps.location.search);
        const query = queryString.parse(location.search);

        if (query.character !== prevquery.character || query.weapon !== prevquery.weapon
            || query.range !== prevquery.range || query.type !== prevquery.type) {
            if (query.character !== prevquery.character) {
                window.scrollTo(0, 0);
            }
            this.init();
        }
    };

    init() {
        const { location } = this.props;
        const query = queryString.parse(location.search);

        this.state.weaponList = [];

        const rangeFocus = query.range || 'RANKER';
        const typeFocus = query.type || 'solo';

        const list = CharacterScore(rangeFocus, typeFocus);

        const character = query.character;

        let weaponTotal = 0;
        list.forEach(data => {
            if (data['character'] === character) {
                weaponTotal += data['data']['pick-rate'];
                this.state.weaponList.push({
                    name: data['weapon'],
                    pick: data['data']['pick-rate']
                });
            }
        });

        this.state.weaponList.sort((a, b) => b['pick'] - a['pick']);
        let weapon = query.weapon || this.state.weaponList[0]['name'];

        list.forEach(data => {
            if (data['character'] === character) {
                if (data['weapon'] === weapon) {
                    this.setState({ data: data });
                }
            }
        });

        const skillTree = [];
        const skillTree2 = skillTreeList(character, weapon);

        for (const key in skillTree2) {
            const tree = [];
            const count = { Q: 0, W: 0, E: 0, T: 0 };

            skillTree2[key].forEach(skill => {
                count[skill]++
                if ((skill === 'T' && count[skill] === 2) || count[skill] === 5) {
                    tree.push(skill);
                }
            })

            skillTree.push({
                name: key,
                tree: tree
            });
        }
        
        this.setState({ 
            weaponTotal: weaponTotal,
            rangeFocus: rangeFocus,
            typeFocus: typeFocus,
            character: character,
            weapon: weapon,
            skillTree: skillTree,
            skillTree2: skillTree2,
        });
    };

    render() {
        const { intl } = this.props;
        const { data, character, weapon, rangeFocus, typeFocus, weaponList, weaponTotal, skillTree, skillTree2, mapList } = this.state;
        
        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'characters.'+data['character']}) + ' ' + intl.formatMessage({id: 'weapons.'+data['weapon']}),
            description: '영원회귀 : 블랙 서바이벌 통계, 캐릭터 티어, 아이템 트렌드, BS:ER Stats, Character Tier, Item Trend'
        }

        return (
            <div>
                <Header data={metaData}/>
                <SubBanner />
                <div className="S_main">
                    <Top 
                        data={data}
                        weaponData={{weaponList, weaponTotal}}
                        parameter={{character, weapon, rangeFocus, typeFocus}}
                        />
                    <div className="S_left">
                        <span className="S_left0">Guide</span>
                        <div className="tabHeaders">
                            <div className="S_left_tab actived">솔로</div>
                            <div className="S_left_tab">듀오</div>
                            <div className="S_left_tab">스쿼드</div>
                        </div>
                        <Skill
                            data={data}
                            skillTree={skillTree}
                            skillTree2={skillTree2}
                            parameter={{character, weapon, rangeFocus, typeFocus}}
                            />
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
                                        Object.keys(mapList).map((key, idx) => {
                                            const en = mapList[key].toLowerCase();
                                            return <img className={"Route_R_Mapimg_"+en} src={'img/map/'+key+'.png'} key={'Mapimg_'+idx} /> 
                                            
                                        })
                                    }
                                    <div className="Route_R_Mapspan_box">
                                        {
                                            Object.keys(mapList).map((key, idx) => {
                                                const en = mapList[key].toLowerCase();
                                                //const index = selectRoute['route'].indexOf(key);
                                                //const isSelect = selectMap === key ? ' actived' : '';
                                                //if (index >= 0) {
                                                    return (
                                                        <div key={'Mapspan_'+idx}>
                                                            <span className={"Route_R_Mapspan_"+en+"1"} key={'Mapspan_'+idx} > {idx+1} </span>
                                                            <span className={"Route_R_Mapspan_"+en}> {intl.formatMessage({id: mapList[key]})} </span>
                                                        </div>
                                                    )
                                                //}
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item_rank">
                                    <Weapons 
                                    character={character}
                                    weapon={weapon}
                                    range={rangeFocus}
                                    type={typeFocus}
                                    />
                                    <Armors 
                                        range={typeFocus}
                                    />
                        </div>
                    </div>
                        <Trend 
                        data={data}
                        parameter={{character, weapon, rangeFocus, typeFocus}}
                        />
                        
                    
                </div>
                <AdS type={'Detail'}/>
                <Footer />
                <ScriptTag src="//t1.daumcdn.net/kas/static/ba.min.js" async />
            </div>
            
        );
    };
}

export default injectIntl(Detail);