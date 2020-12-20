import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import ScriptTag from 'react-script-tag';
import { Header, SubBanner, AdS, Footer } from 'components/banner'
import { Route, Stat } from 'components/route'
import item from 'data/inGame/item.json'
import weapon from 'data/inGame/weapon.json'
import armor from 'data/inGame/armor.json'
import map from 'img/map.png';

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
                            <img className="Route_R_Mapimg" src={map} /> 
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