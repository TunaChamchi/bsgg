import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import ScriptTag from 'react-script-tag';
import { Header, SubBanner, AdS, Footer } from 'components/banner'
import map from 'img/map.png';

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

export default injectIntl(Map);