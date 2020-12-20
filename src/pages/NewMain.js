import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import logo from 'img/main_logo.svg';
import { Footer, Langauge  } from 'components/banner';

class Main extends Component {
    render() {
        const { intl } = this.props;
        
        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.Main'}),
            description: '영원회귀 : 블랙 서바이벌 통계, 캐릭터 티어, 아이템 트렌드, BS:ER Stats, Character Tier, Item Trend'
        }

        return (
            <div>
                <div className="mainpage_banner">
                    <img className="mainpage_logo" src={logo} />
                    <div className="mainpage_buttons">
                        <div className="mainpage_langauge">
                            <Langauge />
                        </div>
                        <button className="mainpage_button">
                            랭크
                        </button>
                        <button className="mainpage_button">
                            루트
                        </button>
                        <button className="mainpage_button">
                            캐릭터 / 티어
                        </button>
                    </div>
                </div>
                <div className="mainpage_search">
                    <div className="mainpage_search_select">
                        <img className="mainpage_search_selectimg" src="img/jackie.png" />
                        <button className="mainpage_search_selectCircle"></button>
                    </div>
                    <input className="mainpage_search_box" onChange={this.searchHandler} placeholder={intl.formatMessage({id:'main.left.characters.placeholder'})} /> 
                </div>
                <div className="mainpage_ad">
                    d
                </div>
                <Footer />
            </div>
        );
    };
}

export default injectIntl(Main);