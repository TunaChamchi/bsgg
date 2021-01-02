import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import { Header, SubBanner, AdS, Footer } from 'components/banner'
import { Search, Characters } from 'components/Main/left'
import { Rank } from 'components/Main/right'

class Main extends Component {
    render() {
        const { intl } = this.props;
        
        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.Main'}),
            description: '영원회귀 : 블랙 서바이벌 통계, 캐릭터 티어, 아이템 트렌드, BS:ER Stats, Character Tier, Item Trend'
        }

        return (
            <div>
                <Header data={metaData}/>
                <SubBanner />
                <div className="Loading_main">
                    <div id="loading_animation"></div>
                    <div className="Loading_main_span">{intl.formatMessage({id: '로딩'})}</div>
                </div>

            </div>
        );
    };
}

export default injectIntl(Main);