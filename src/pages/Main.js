import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import ScriptTag from 'react-script-tag';
import { Header, MainBanner, AdS, Footer } from 'components/banner'
import { Search, Characters } from 'components/Main/left'
import { Rank } from 'components/Main/right'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metaData: {
                title: 'BSGG.kr - 블랙 서바이벌 통계 / BS:ER Stats / 永遠回歸 : 黑色幸存者 统计 / ブラックサバイバル: 永遠回帰 情報',
                description: '영원회귀 : 블랙 서바이벌 통계, 캐릭터 티어, 아이템 트렌드, BS:ER Stats, Character Tier, Item Trend'
            }
        };
    }
    render() {
        return (
            <div>
                <Header data={this.state.metaData}/>
                <MainBanner />
                <div className='main'>
                    <div className='main-left'>
                        <Search />
                        <Characters />
                        <div className="Ad_box_Main">
                            {/* {<ins 
                                className="kakao_ad_area" 
                                style={{display: 'none'}} 
                                data-ad-unit="DAN-WUlvSzBZfRSTMEEX" 
                                data-ad-width="300" 
                                data-ad-height="250"></ins> } */}
                        </div>
                    </div>
                    <div className='main-right'>
                        <Rank />
                    </div>
                </div>
                <AdS type={'Main'}/>
                <Footer />
                <ScriptTag src="//t1.daumcdn.net/kas/static/ba.min.js" async />
            </div>
        );
    };
}

export default injectIntl(Main);