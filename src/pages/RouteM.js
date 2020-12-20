import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import ScriptTag from 'react-script-tag';
import { Header, SubBanner, AdS, Footer } from 'components/banner'
import { Route, Stat } from 'components/route'
import item from 'data/inGame/item.json'
import weapon from 'data/inGame/weapon.json'
import armor from 'data/inGame/armor.json'
import map from 'img/map2.png';

class RouteM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectMap: '',
            select: {},
            type: [
                "단검",
                "양손검",
                "도끼",
                "쌍검",
                "권총",
                "돌격소총",
                "저격총",
                "레이피어",
                "창",
                "망치",
                "배트",
                "투척",
                "암기",
                "활",
                "석궁",
                "글러브",
                "톤파",
                "기타",
                "쌍절곤"
            ],
            start: [
                "단검",
                "양손검",
                "도끼",
                "권총",
                "돌격소총",
                "저격총",
                "레이피어",
                "창",
                "망치",
                "배트",
                "투척",
                "암기",
                "활",
                "석궁",
                "글러브",
                "톤파",
                "기타",
                "쌍절곤"
            ],
            selectView: {
                무기: [],
                type: [],
                start: [],
                머리: [],
                옷: [],
                팔: [],
                다리: [],
                장식: [],
            },
        };
    }

    init() {

    }

    selectHandler = (type, value) => {
        const { select } = this.state;
        select[type] = value;
        if (type === 'type' && value !== '쌍검') select['start'] = value

        const selectView = {
            무기: [],
            type: [],
            start: [],
            머리: [],
            옷: [],
            팔: [],
            다리: [],
            장식: [],
        };
        this.setState({select: select, selectView: selectView});
    }
    selectTypeHandler = (type) => {
        const { select } = this.state;
        const selectView = {
            무기: [],
            type: [],
            start: [],
            머리: [],
            옷: [],
            팔: [],
            다리: [],
            장식: [],
        };
        if (type === 'type' || type === 'start' ) {
            selectView[type] = this.state[type];
        } else if (type === '무기') {
            if (!select['type']) return;
            const _weapon = weapon[select['type']];
            let list = [];
            for (const key in _weapon) {
                if (_weapon[key]['grade'] !== '일반')
                    list.push(key);
            }
            selectView[type] = list;
        } else {
            const _armor = armor[type];
            let list = [];
            for (const key in _armor) {
                if (_armor[key]['grade'] !== '일반')
                    list.push(key);
            }
            selectView[type] = list;
        }
        
        this.setState({selectView: selectView});
    }

    itemFilterView = () => {
        const { select } = this.state;
        const imgType = select['type'] ? 'img/Weapons/'+select['type']+'.jpg' : '';
        const imgStart = select['start'] ? 'img/Weapons/'+select['start']+'.jpg' : '';

        return (
            <div className="Route_L_Item">
                <div className="Route_L_ItemX">
                    <div className="Route_L_StartItem_box"> 
                        <div onClick={(e) => this.selectTypeHandler('type')}>
                            <img className="Route_L_StartItem1" src={imgType} />
                            <span className="Route_L_StartItem2">최종아이템</span>
                        </div>
                        <div className="Route_L_StartItem_dropbox"> 
                            {this.itemFilterDropBoxView('type')}
                        </div> 
                    </div>
                    {this.itemFilterView2(['무기', '머리', '옷'])}
                </div>
                <div className="Route_L_ItemX">
                    <div className="Route_L_StartItem_box"> 
                        <div onClick={(e) => this.selectTypeHandler('start')}>
                            <img className="Route_L_StartItem1" src={imgStart} />
                            <span className="Route_L_StartItem2">시작아이템</span>
                        </div>
                        <div className="Route_L_StartItem_dropbox"> 
                            {this.itemFilterDropBoxView('start')}
                        </div> 
                    </div>
                    {this.itemFilterView2(['팔', '다리', '장식'])}
                </div>
            </div>
        );
    }
    itemFilterView2 = (list) => {
        const { select } = this.state;
        return list.map((type, idx) => {
            const itemName = select[type] || '';
            const imgGrade = select[type] ? 'img/Item/BackGround/'+item[select[type]]['grade']+'.jpg' : '';
            const imgItem = select[type] ? 'img/Item/'+itemName+'.png' : '';
            return (
                <div className="Route_L_PickItem_box"> 
                    <div onClick={(e) => this.selectTypeHandler(type)}>
                        <div className="Route_L_PickItem">
                            <img className="Route_L_PickItem1" src={imgGrade} />
                            <img className="Route_L_PickItem2" src={imgItem} />
                        </div>
                        <span className="Route_L_PickItem3">{itemName}</span>
                    </div>
                    <div className="Route_L_PickItem_dropbox"> 
                        {this.itemFilterDropBoxView(type)}
                    </div>
                </div>
            )
        });
    }
    itemFilterDropBoxView = (type) => {
        const { selectView } = this.state;

        return selectView[type].map((name, idx) => {
            if (type === 'type' || type === 'start' ) {
                return (
                    <div key={type+'_list'+idx} onClick={(e) => this.selectHandler(type, name)}>
                        <img className="Route_L_StartItem1" src={'img/Weapons/'+name+'.jpg'} />
                        <span className="Route_L_StartItem2">{name}</span>
                    </div>
                )
            } else {
                return (
                    <div key={type+'_list'+idx} onClick={(e) => this.selectHandler(type, name)}>
                        <div className="Route_L_PickItem">
                            <img className="Route_L_PickItem1" src={'img/Item/BackGround/'+item[name]['grade']+'.jpg'} />
                            <img className="Route_L_PickItem2" src={'img/Item/'+name+'.png'} />
                        </div>
                        <span className="Route_L_PickItem3">{name}</span>
                    </div>
                )
            }
        });        
    }

    render() {
        const { intl } = this.props;
        const { select } = this.state;

        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.Map'}),
            description: '영원회귀 : 블랙 서바이벌 통계, 캐릭터 티어, 아이템 트렌드, BS:ER Stats, Character Tier, Item Trend'
        }

        return (
            <div>
                <Header data={metaData}/>
                <SubBanner />
                <div className="map_main">
                    <div className="tri"></div>
                    <div className="map_title">
                        <span className="map_title_span">MAP</span>
                    </div>
                    <div className="tabHeaders">
                        <span className="map_tab0 actived">{intl.formatMessage({id:'지도 도감'})}</span>
                        <span className="map_tab0">{intl.formatMessage({id:'루트제작'})}</span>
                    </div>
                    <div className="Route_L">
                        {this.itemFilterView()}
                        <Route select={select}/>
                    </div>
                    <div className="Route_R">
                        <div className="Route_R_stat">
                            <span className="Route_R_stat_title">능력치</span>
                        </div>
                        <div className="Route_R_Map">
                            <div className="Route_R_Mapimg_box">
                                <img className="Route_R_Mapimg" src={map} /> 
                                <img className="Route_R_Mapimg_archery actived" src='img/map/양궁장.png' /> 
                                <img className="Route_R_Mapimg_alley" src='img/map/골목길.png' /> 
                                <img className="Route_R_Mapimg_school" src='img/map/학교.png' /> 
                                <img className="Route_R_Mapimg_hotel" src='img/map/호텔.png' /> 
                                <img className="Route_R_Mapimg_beach" src='img/map/모래사장.png' /> 
                                <img className="Route_R_Mapimg_forest" src='img/map/숲.png' /> 
                                <img className="Route_R_Mapimg_uptown" src='img/map/고급주택가.png' /> 
                                <img className="Route_R_Mapimg_pond" src='img/map/연못.png' /> 
                                <img className="Route_R_Mapimg_temple" src='img/map/절.png' /> 
                                <img className="Route_R_Mapimg_hospital" src='img/map/병원.png' /> 
                                <img className="Route_R_Mapimg_chapel" src='img/map/성당.png' /> 
                                <img className="Route_R_Mapimg_factory" src='img/map/공장.png' /> 
                                <img className="Route_R_Mapimg_dock" src='img/map/항구.png' /> 
                                <img className="Route_R_Mapimg_cemetery" src='img/map/묘지.png' /> 
                                <img className="Route_R_Mapimg_avenue" src='img/map/번화가.png' /> 
                                <div className="Route_R_Mapspan_box">
                                    <span className="Route_R_Mapspan_archery actived"> {intl.formatMessage({id: 'Archery'})} </span>
                                    <span className="Route_R_Mapspan_alley"> {intl.formatMessage({id: 'Alley'})} </span>
                                    <span className="Route_R_Mapspan_school"> {intl.formatMessage({id: 'School'})} </span>
                                    <span className="Route_R_Mapspan_hotel"> {intl.formatMessage({id: 'Hotel'})} </span>
                                    <span className="Route_R_Mapspan_beach"> {intl.formatMessage({id: 'Beach'})} </span>
                                    <span className="Route_R_Mapspan_forest"> {intl.formatMessage({id: 'Forest'})} </span>
                                    <span className="Route_R_Mapspan_uptown"> {intl.formatMessage({id: 'Uptown'})} </span>
                                    <span className="Route_R_Mapspan_pond"> {intl.formatMessage({id: 'Pond'})} </span>
                                    <span className="Route_R_Mapspan_temple"> {intl.formatMessage({id: 'Temple'})} </span>
                                    <span className="Route_R_Mapspan_hospital"> {intl.formatMessage({id: 'Hospital'})} </span>
                                    <span className="Route_R_Mapspan_chapel"> {intl.formatMessage({id: 'Chapel'})} </span>
                                    <span className="Route_R_Mapspan_factory"> {intl.formatMessage({id: 'Factory'})} </span>
                                    <span className="Route_R_Mapspan_dock"> {intl.formatMessage({id: 'Dock'})} </span>
                                    <span className="Route_R_Mapspan_cemetery"> {intl.formatMessage({id: 'Cemetery'})} </span>
                                    <span className="Route_R_Mapspan_avenue"> {intl.formatMessage({id: 'Avenue'})} </span>
                                    <span className="Route_R_Mapspan_research"> {intl.formatMessage({id: 'Research'})} </span>
                                    
                                    <span className="Route_R_Mapspan_archery1 actived"> {intl.formatMessage({id: '1'})} </span>
                                    <span className="Route_R_Mapspan_alley1"> {intl.formatMessage({id: '2'})} </span>
                                    <span className="Route_R_Mapspan_school1"> {intl.formatMessage({id: '3'})} </span>
                                    <span className="Route_R_Mapspan_hotel1"> {intl.formatMessage({id: '4'})} </span>
                                    <span className="Route_R_Mapspan_beach1"> {intl.formatMessage({id: '5'})} </span>
                                    <span className="Route_R_Mapspan_forest1"> {intl.formatMessage({id: '6'})} </span>
                                    <span className="Route_R_Mapspan_uptown1"> {intl.formatMessage({id: '7'})} </span>
                                    <span className="Route_R_Mapspan_pond1"> {intl.formatMessage({id: '1'})} </span>
                                    <span className="Route_R_Mapspan_temple1"> {intl.formatMessage({id: '2'})} </span>
                                    <span className="Route_R_Mapspan_hospital1"> {intl.formatMessage({id: '3'})} </span>
                                    <span className="Route_R_Mapspan_chapel1"> {intl.formatMessage({id: '4'})} </span>
                                    <span className="Route_R_Mapspan_factory1"> {intl.formatMessage({id: '5'})} </span>
                                    <span className="Route_R_Mapspan_dock1"> {intl.formatMessage({id: '6'})} </span>
                                    <span className="Route_R_Mapspan_cemetery1"> {intl.formatMessage({id: '7'})} </span>
                                    <span className="Route_R_Mapspan_avenue1"> {intl.formatMessage({id: '1'})} </span>
                                    <span className="Route_R_Mapspan_research1"> {intl.formatMessage({id: '2'})} </span>
                                </div>
                            </div>
                            <div className="Route_R_Mapitem_allbox">
                                <span className="Route_R_Mapitem_title">드랍 아이템</span>
                                <div className="Route_R_Mapitem_box">
                                    <img className="Route_R_Mapitem1" src={'img/Item/BackGround/영웅.jpg'} />
                                    <img className="Route_R_Mapitem2" src={'img/Item/AK-12.png'} />
                                </div>
                                <div className="Route_R_Mapitem_box">
                                    <img className="Route_R_Mapitem1" src={'img/Item/BackGround/영웅.jpg'} />
                                    <img className="Route_R_Mapitem2" src={'img/Item/AK-12.png'} />
                                </div>
                                <div className="Route_R_Mapitem_box">
                                    <img className="Route_R_Mapitem1" src={'img/Item/BackGround/영웅.jpg'} />
                                    <img className="Route_R_Mapitem2" src={'img/Item/AK-12.png'} />
                                </div>
                                <div className="Route_R_Mapitem_box">
                                    <img className="Route_R_Mapitem1" src={'img/Item/BackGround/영웅.jpg'} />
                                    <img className="Route_R_Mapitem2" src={'img/Item/AK-12.png'} />
                                </div>
                                <div className="Route_R_Mapitem_box">
                                    <img className="Route_R_Mapitem1" src={'img/Item/BackGround/영웅.jpg'} />
                                    <img className="Route_R_Mapitem2" src={'img/Item/AK-12.png'} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <AdS type={'Map'}/>
                <Footer />
                <ScriptTag src="//t1.daumcdn.net/kas/static/ba.min.js" async />
            </div>
        );
    };
}

export default injectIntl(RouteM);