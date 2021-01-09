import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import AdSense from 'react-adsense';
import { Header, SubBanner, AdS, Footer } from 'components/banner'
import { Search, Characters } from 'components/Main/left'
import { Rank } from 'components/Main/right'

class Main extends Component {
    render() {
        const { intl } = this.props;
        
        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.Main'}),
        }

        return (
            <div>
                <Header data={metaData}/>
                <SubBanner actived={'Tier'} />
                <div className="Ad_box">
                    <AdSense.Google
                        className='mainpage_ad'
                        client='ca-pub-7215780243476450'
                        slot='1329310229'
                        style={{ display: 'block', width:970, height:250 }}
                        format=''
                        />
                </div>
                <div className='main'>
                    <div className='main-left'>
                        <Characters />
                    </div>
                    <div className='main-right'>
                        <Rank />
                    </div>
                </div>
                <AdS type={'Main'}/>
                <Footer />
                {/* <ScriptTag src="//t1.daumcdn.net/kas/static/ba.min.js" async /> */}
                {/* <ScriptTag src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" async /> */}
            </div>
        );
    };
}

export default injectIntl(Main);