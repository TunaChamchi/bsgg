import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import ScriptTag from 'react-script-tag';
import { Header, SubBanner, AdS, Footer } from 'components/banner'
import map from 'img/map2.png';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectMap: '',
        };
    }

    onClick = (e, selectMap) => {
        this.setState({selectMap: selectMap});
    }

    render() {
        const { intl } = this.props;
        const { selectMap } = this.state;

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
                        <div className="Route_L_Item">
                            <div className="Route_L_ItemX">
                                <div className="Route_L_StartItem_box"> 
                                    <img className="Route_L_StartItem1" src={'img/Weapons/돌격소총.jpg'} />
                                    <span className="Route_L_StartItem2">최종아이템</span>
                                </div>
                                <div className="Route_L_PickItem_box"> 
                                    <div className="Route_L_PickItem">
                                        <img className="Route_L_PickItem1" src={'img/Item/BackGround/영웅.jpg'} />
                                        <img className="Route_L_PickItem2" src={'img/Item/AK-12.png'} />
                                    </div>
                                    <span className="Route_L_PickItem3">AK-12</span>
                                </div>
                                <div className="Route_L_PickItem_box"> 
                                    <div className="Route_L_PickItem">
                                        <img className="Route_L_PickItem1" src={'img/Item/BackGround/영웅.jpg'} />
                                        <img className="Route_L_PickItem2" src={'img/Item/AK-12.png'} />
                                    </div>
                                    <span className="Route_L_PickItem3">AK-12</span>
                                </div>
                                <div className="Route_L_PickItem_box"> 
                                    <div className="Route_L_PickItem">
                                        <img className="Route_L_PickItem1" src={'img/Item/BackGround/영웅.jpg'} />
                                        <img className="Route_L_PickItem2" src={'img/Item/AK-12.png'} />
                                    </div>
                                    <span className="Route_L_PickItem3">AK-12</span>
                                </div>
                            </div>
                            <div className="Route_L_ItemX">
                                <div className="Route_L_StartItem_box"> 
                                    <img className="Route_L_StartItem1" src={'img/Weapons/돌격소총.jpg'} />
                                    <span className="Route_L_StartItem2">시작아이템</span>
                                </div>
                                <div className="Route_L_PickItem_box"> 
                                    <div className="Route_L_PickItem">
                                        <img className="Route_L_PickItem1" src={'img/Item/BackGround/영웅.jpg'} />
                                        <img className="Route_L_PickItem2" src={'img/Item/AK-12.png'} />
                                    </div>
                                    <span className="Route_L_PickItem3">AK-12</span>
                                </div>
                                <div className="Route_L_PickItem_box"> 
                                    <div className="Route_L_PickItem">
                                        <img className="Route_L_PickItem1" src={'img/Item/BackGround/영웅.jpg'} />
                                        <img className="Route_L_PickItem2" src={'img/Item/AK-12.png'} />
                                    </div>
                                    <span className="Route_L_PickItem3">AK-12</span>
                                </div>
                                <div className="Route_L_PickItem_box"> 
                                    <div className="Route_L_PickItem">
                                        <img className="Route_L_PickItem1" src={'img/Item/BackGround/영웅.jpg'} />
                                        <img className="Route_L_PickItem2" src={'img/Item/AK-12.png'} />
                                    </div>
                                    <span className="Route_L_PickItem3">AK-12</span>
                                </div>
                            </div>
                        </div>
                        <div className="Route_L_Route">
                            <div className="Route_L_Route_FilterX">
                                <div className="Route_L_Route_Filter">우선아이템</div>
                                <div className="Route_L_Route_Filter">filter</div>
                                <div className="Route_L_Route_Filter">filter</div>
                                <div className="Route_L_Route_Filter">filter</div>
                                <div className="Route_L_Route_Filter">filter</div>
                                <div className="Route_L_Route_Filter">filter</div>
                                <div className="Route_L_Route_Filter">filter</div>
                            </div>
                            <div className="Route_L_Route_FilterX">
                                <div className="Route_L_Route_Filter2">filter</div>
                                <div className="Route_L_Route_Filter2">filter</div>
                                <div className="Route_L_Route_Filter2">filter</div>
                                <div className="Route_L_Route_Filter2">filter</div>
                                <div className="Route_L_Route_Filter2">filter</div>
                                <div className="Route_L_Route_Filter2">filter</div>
                                <div className="Route_L_Route_Filter2">filter</div>
                            </div> 
                            <div className="Route_L_RouteX_all">
                                <div className="Route_L_RouteX">
                                    <div className="Route_L_RouteY">
                                        <div className="Route_L_Route_region">filter</div>
                                        <div className="Route_L_Route_item_bigbox">
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Route_L_RouteY">
                                        <div className="Route_L_Route_region">filter</div>
                                        <div className="Route_L_Route_item_bigbox">
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Route_L_RouteY">
                                        <div className="Route_L_Route_region">filter</div>
                                        <div className="Route_L_Route_item_bigbox">
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Route_L_RouteY">
                                        <div className="Route_L_Route_region">filter</div>
                                        <div className="Route_L_Route_item_bigbox">
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Route_L_RouteY">
                                        <div className="Route_L_Route_region">filter</div>
                                        <div className="Route_L_Route_item_bigbox">
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Route_L_RouteY">
                                        <div className="Route_L_Route_region">filter</div>
                                        <div className="Route_L_Route_item_bigbox">
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Route_L_RouteY">
                                        <div className="Route_L_Route_region">filter</div>
                                        <div className="Route_L_Route_item_bigbox">
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                            <div className="Route_L_Route_item_box">
                                                <img className="Route_L_Route_item1" src={'img/Item/BackGround/영웅.jpg'} />
                                                <img className="Route_L_Route_item2" src={'img/Item/AK-12.png'} />
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>  
                        </div>
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

export default injectIntl(Map);