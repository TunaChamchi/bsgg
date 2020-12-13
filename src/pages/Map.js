import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import ScriptTag from 'react-script-tag';
import { Header, SubBanner, AdS, Footer } from 'components/banner'
import { Search, Characters } from 'components/Main/left'
import { Rank } from 'components/Main/right'
import map from 'img/map.png';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metaData: {
                title: 'BSGG.kr - 블랙 서바이벌 통계 / BS:ER Stats',
                description: '영원회귀 : 블랙 서바이벌 통계, 캐릭터 티어, 아이템 트렌드, BS:ER Stats, Character Tier, Item Trend'
            }
        };
    }


    render() {
        const { intl } = this.props;

        return (
            <div>
                <Header data={this.state.metaData}/>
                <SubBanner />
                <div className="map_main">
                    <div className="tri"></div>
                    <div className="map_title">
                        <span className="map_title_span">MAP</span>
                    </div>
                    <div className="map_right">
                        <div className="map_square">
                            <div className="map_tab">드랍 아이템</div>
                            <img className="map_img_item" src={'img/Item/Weapons/권총/악켈테.png'} />
                            <img className="map_img_item" src={'img/Item/Weapons/권총/악켈테.png'} />
                            <img className="map_img_item" src={'img/Item/Weapons/권총/악켈테.png'} />
                            <img className="map_img_item" src={'img/Item/Weapons/권총/악켈테.png'} />
                            <img className="map_img_item" src={'img/Item/Weapons/권총/악켈테.png'} />
                            <img className="map_img_item" src={'img/Item/Weapons/권총/악켈테.png'} />
                            <img className="map_img_item" src={'img/Item/Weapons/권총/악켈테.png'} />
                        </div>
                        <div className="map_square">
                            <div className="map_tab">출연 동물</div>
                            <img className="map_img_animal" src={'img/Animal/곰.png'} />
                            <img className="map_img_animal" src={'img/Animal/곰.png'} />
                            <img className="map_img_animal" src={'img/Animal/곰.png'} />
                            <img className="map_img_animal" src={'img/Animal/곰.png'} />
                            <div className="map_tab2">아이템</div>
                            <img className="map_img_item" src={'img/Item/Weapons/권총/악켈테.png'} />
                            <img className="map_img_item" src={'img/Item/Weapons/권총/악켈테.png'} />
                            <img className="map_img_item" src={'img/Item/Weapons/권총/악켈테.png'} />
                        </div>
                    </div>
                    <div className="map_left">
                        <img className="mapimg" src={map} />
                        <div className="tabHeaders">
                            <div className="map_Archery actived">{intl.formatMessage({id: 'Archery'})}</div>
                            <div className="map_Alley">{intl.formatMessage({id: 'Alley'})}</div>
                            <div className="map_School">{intl.formatMessage({id: 'School'})}</div>
                            <div className="map_Hotel">{intl.formatMessage({id: 'Hotel'})}</div>
                            <div className="map_Avenue">{intl.formatMessage({id: 'Avenue'})}</div>
                            <div className="map_Temple">{intl.formatMessage({id: 'Temple'})}</div>
                            <div className="map_Pond">{intl.formatMessage({id: 'Pond'})}</div>
                            <div className="map_Hospital">{intl.formatMessage({id: 'Hospital'})}</div>
                            <div className="map_Cemetery">{intl.formatMessage({id: 'Cemetery'})}</div>
                            <div className="map_Factory">{intl.formatMessage({id: 'Factory'})}</div>
                            <div className="map_Chapel">{intl.formatMessage({id: 'Chapel'})}</div>
                            <div className="map_Forest">{intl.formatMessage({id: 'Forest'})}</div>
                            <div className="map_Uptown">{intl.formatMessage({id: 'Uptown'})}</div>
                            <div className="map_Dock">{intl.formatMessage({id: 'Dock'})}</div>
                            <div className="map_Beach">{intl.formatMessage({id: 'Beach'})}</div>
                            <div className="map_Research">{intl.formatMessage({id: 'Research'})}</div>
                        </div>
                    </div>
                </div>
                <AdS type={'Main'}/>
                <Footer />
                <ScriptTag src="//t1.daumcdn.net/kas/static/ba.min.js" async />
            </div>
        );
    };
}

export default injectIntl(Map);