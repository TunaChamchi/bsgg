import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import { Header, SubBanner, Footer } from 'components/banner'

class Character extends Component {
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

        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.Map'}),
            description: '영원회귀 : 블랙 서바이벌 통계, 캐릭터 티어, 아이템 트렌드, BS:ER Stats, Character Tier, Item Trend'
        }

        return (
            <div>
                <Header data={metaData}/>
                <SubBanner />
                <div className="record_top">
                    <div className="record_top_icon">
                        <img className="record_top_iconimg" src="img/Characters/재키.jpg" />
                        <img className="record_top_iconborder" src="img/border/이터널.png" />
                        <span className="record_top_lv">50</span>
                    </div>
                    <div className="record_top_right">
                        <div className="record_top_name">
                            에미디
                        </div>
                        <button className="record_top_renew">
                            전적갱신
                        </button>
                        <span className="record_top_updated">최근 업데이트 2시간 전</span>
                    </div>
                    <img className="record_top_medal" src="img/Rankicon/topgod.png" />
                    <img className="record_top_medal" src="img/Rankicon/topgod.png" />
                    <img className="record_top_medal" src="img/Rankicon/topgod.png" />
                    <img className="record_top_medal" src="img/Rankicon/topgod.png" />
                </div>
                <div className="record_main">
                        <div className="record_cha">
                            <div className="record_cha0">
                                <span className="record_cha0_span">Character</span>
                                <div className="record_cha0_tabs">
                                    <div className="record_cha0_tab">ALL GAME</div>
                                    <div className="record_cha0_tab actived">RANK GAME</div>
                                </div>
                            </div>
                            <div className="record_cha_tabs">
                                <div className="record_cha_tab1 actived">전체</div>
                                <div className="record_cha_tab1">솔로</div>
                                <div className="record_cha_tab1">듀오</div>
                                <div className="record_cha_tab1">스쿼드</div>
                            </div>
                            <div className="record_cha_filter">
                                <div className="record_cha_filter1">#</div>
                                <div className="record_cha_filter2">캐릭터</div>
                                <div className="record_cha_filter3">게임수</div>
                                <div className="record_cha_filter4 actived">우승</div>
                                <div className="record_cha_filter5">승률</div>
                                <div className="record_cha_filter6">KDA</div>
                                <div className="record_cha_filter7">최다킬</div>
                                <div className="record_cha_filter8">평균킬</div>
                                <div className="record_cha_filter9">CS</div>
                            </div>
                            <div className="record_cha_box">
                                <div className="record_cha_span1">1</div>
                                <img className="record_cha_img" src="img/Rank/재키.jpg" />
                                <div className="record_cha_span2">아드리아나</div>
                                <div className="record_cha_span3">370</div>
                                <div className="record_cha_graph">
                                    <div className="record_cha_graphW"></div>
                                    <div className="record_cha_graphL"></div>
                                    <div className="record_cha_span4">41</div>
                                    <div className="record_cha_span5">81</div>
                                    <div className="record_cha_span6">250</div>
                                </div>
                                <div className="record_cha_span7">23%</div>
                                <div className="record_cha_span8">5 / 5 / 3</div>
                                <div className="record_cha_span9">7</div>
                                <div className="record_cha_span10">1.5</div>
                                <div className="record_cha_span11">24 (4.5)</div>
                            </div>
                        </div>
                </div>
                <Footer />
            </div>
        );
    };
}

export default injectIntl(Character);