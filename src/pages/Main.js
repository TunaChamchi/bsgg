import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import ScriptTag from 'react-script-tag';
import { MainBanner, AdS, Footer } from 'components/banner'
import { Search, Characters } from 'components/Main/left'
import { Rank } from 'components/Main/right'


class Main extends Component {
    render() {
        return (
            <div>
                <MainBanner />
                <div className='main'>
                    <div className='main-left'>
                        <Search />
                        <Characters />
                        <div className="Ad_box_Main">
                            <ins 
                                class="kakao_ad_area" 
                                style={{display: 'none'}} 
                                data-ad-unit="DAN-WUlvSzBZfRSTMEEX" 
                                data-ad-width="300" 
                                data-ad-height="250"></ins> 
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