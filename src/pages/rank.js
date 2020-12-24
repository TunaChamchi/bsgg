import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import ScriptTag from 'react-script-tag';
import { Header, SubBanner, Footer } from 'components/banner'

class Rank extends Component {
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
                <div className="rank_top">
                    <div className="rank_top_2">
                        <img className="rank_top_iconimg" src="img/Characters/재키.jpg" />
                        <img className="rank_top_iconborder" src="img/border/이터널.png" />
                        <span className="rank_top_lv">50</span>
                        <div className="rank_top_span_box">
                            <div className="rank_top2_span1">2</div>
                            <div className="rank_top_span2">에미디</div>
                            <div className="rank_top_span3">Eternal 66 LP</div>
                                <div className="rank_top_graph">
                                    <div className="rank_top_graphW"></div>
                                    <div className="rank_top_graphL"></div>
                                    <div className="rank_top_span4">41</div>
                                    <div className="rank_top_span5">81</div>
                                    <div className="rank_top_span6">250</div>
                                    <div className="rank_top_span7">23%</div>
                                </div>
                                <div className="rank_top_span8">KDA 5 / 5 / 3</div>
                        </div>
                    </div>
                    <div className="rank_top_1">
                        <img className="rank_top_iconimg" src="img/Characters/재키.jpg" />
                        <img className="rank_top_iconborder" src="img/border/이터널.png" />
                        <span className="rank_top_lv">50</span>
                        <div className="rank_top_span_box">
                            <div className="rank_top1_span1">1</div>
                            <div className="rank_top_span2">에미디</div>
                            <div className="rank_top_span3">Eternal 66 LP</div>
                                <div className="rank_top_graph">
                                    <div className="rank_top_graphW"></div>
                                    <div className="rank_top_graphL"></div>
                                    <div className="rank_top_span4">41</div>
                                    <div className="rank_top_span5">81</div>
                                    <div className="rank_top_span6">250</div>
                                    <div className="rank_top_span7">23%</div>
                                </div>
                                <div className="rank_top_span8">KDA 5 / 5 / 3</div>
                        </div>
                    </div>
                    <div className="rank_top_3">
                        <img className="rank_top_iconimg" src="img/Characters/재키.jpg" />
                        <img className="rank_top_iconborder" src="img/border/이터널.png" />
                        <span className="rank_top_lv">50</span>
                        <div className="rank_top_span_box">
                            <div className="rank_top3_span1">3</div>
                            <div className="rank_top_span2">에미디</div>
                            <div className="rank_top_span3">Eternal 66 LP</div>
                                <div className="rank_top_graph">
                                    <div className="rank_top_graphW"></div>
                                    <div className="rank_top_graphL"></div>
                                    <div className="rank_top_span4">41</div>
                                    <div className="rank_top_span5">81</div>
                                    <div className="rank_top_span6">250</div>
                                    <div className="rank_top_span7">23%</div>
                                </div>
                                <div className="rank_top_span8">KDA 5 / 5 / 3</div>
                        </div>
                    </div>
                </div>
                <div className="record_main">
                        <div className="record_cha">
                            <div className="record_cha0">
                                <span className="record_cha0_span">RANK</span>
                                <div className="record_cha0_tabs">
                                    <div className="record_cha0_tab actived">ALL</div>
                                    <div className="record_cha0_tab">Character</div>
                                </div>
                            </div>
                            <div className="rank_cha_tabs">
                                <div className="rank_cha_tab1 actived">솔로</div>
                                <div className="rank_cha_tab1">듀오</div>
                                <div className="rank_cha_tab1">스쿼드</div>
                            </div>
                            <div className="rank_cha_select">
                                <div className="rank_cha_select_box">
                                    <img className="record_select_img actived" src="img/rank/재키.jpg" />
                                    <span className="record_select_span">재키</span>
                                </div>
                                <div className="rank_cha_select_box">
                                    <img className="record_select_img" src="img/rank/재키.jpg" />
                                    <span className="record_select_span">재키</span>
                                </div>
                                <div className="rank_cha_select_box">
                                    <img className="record_select_img" src="img/rank/재키.jpg" />
                                    <span className="record_select_span">재키</span>
                                </div>
                                <div className="rank_cha_select_box">
                                    <img className="record_select_img" src="img/rank/재키.jpg" />
                                    <span className="record_select_span">재키</span>
                                </div>
                                <div className="rank_cha_select_box">
                                    <img className="record_select_img" src="img/rank/재키.jpg" />
                                    <span className="record_select_span">재키</span>
                                </div>
                                <div className="rank_cha_select_box">
                                    <img className="record_select_img" src="img/rank/재키.jpg" />
                                    <span className="record_select_span">재키</span>
                                </div>
                                <div className="rank_cha_select_box">
                                    <img className="record_select_img" src="img/rank/재키.jpg" />
                                    <span className="record_select_span">재키</span>
                                </div>
                                <div className="rank_cha_select_box">
                                    <img className="record_select_img" src="img/rank/재키.jpg" />
                                    <span className="record_select_span">재키</span>
                                </div>
                                <div className="rank_cha_select_box">
                                    <img className="record_select_img" src="img/rank/재키.jpg" />
                                    <span className="record_select_span">재키</span>
                                </div>
                                <div className="rank_cha_select_box">
                                    <img className="record_select_img" src="img/rank/재키.jpg" />
                                    <span className="record_select_span">재키</span>
                                </div>
                                <div className="rank_cha_select_box">
                                    <img className="record_select_img" src="img/rank/재키.jpg" />
                                    <span className="record_select_span">재키</span>
                                </div>
                                <div className="rank_cha_select_box">
                                    <img className="record_select_img" src="img/rank/재키.jpg" />
                                    <span className="record_select_span">재키</span>
                                </div>
                                <div className="rank_cha_select_box">
                                    <img className="record_select_img" src="img/rank/재키.jpg" />
                                    <span className="record_select_span">재키</span>
                                </div>
                                <div className="rank_cha_select_box">
                                    <img className="record_select_img" src="img/rank/재키.jpg" />
                                    <span className="record_select_span">재키</span>
                                </div>
                                <div className="rank_cha_select_box">
                                    <img className="record_select_img" src="img/rank/재키.jpg" />
                                    <span className="record_select_span">재키</span>
                                </div>
                                <div className="rank_cha_select_box">
                                    <img className="record_select_img" src="img/rank/재키.jpg" />
                                    <span className="record_select_span">재키</span>
                                </div>
                                <div className="rank_cha_select_box">
                                    <img className="record_select_img" src="img/rank/재키.jpg" />
                                    <span className="record_select_span">재키</span>
                                </div>
                                <div className="rank_cha_select_box">
                                    <img className="record_select_img" src="img/rank/재키.jpg" />
                                    <span className="record_select_span">재키</span>
                                </div>
                            </div>
                            <div className="record_cha_filter">
                                <div className="record_cha_filter1">#</div>
                                <div className="record_cha_filter2">플레이어</div>
                                <div className="record_rank_filter1">티어</div>
                                <div className="record_rank_filter2">점수</div>
                                <div className="record_cha_filter3">게임수</div>
                                <div className="record_cha_filter4">우승</div>
                                <div className="record_cha_filter5">승률</div>
                                <div className="record_rank_filter3">KDA</div>
                            </div>
                            <div className="record_cha_box">
                                <div className="record_cha_span1">4</div>
                                <img className="record_cha_img" src="img/rank/재키.jpg" />
                                <div className="record_cha_span2">아드리아나</div>
                                <img className="record_cha_rankimg" src="img/rankicon/gold.png" />
                                <div className="record_rank_span1">Eternal</div>
                                <div className="record_rank_span2">66 LP</div>
                                <div className="record_cha_span3">370</div>
                                <div className="record_cha_graph">
                                    <div className="record_cha_graphW"></div>
                                    <div className="record_cha_graphL"></div>
                                    <div className="record_cha_span4">41</div>
                                    <div className="record_cha_span5">81</div>
                                    <div className="record_cha_span6">250</div>
                                </div>
                                <div className="record_cha_span7">23%</div>
                                <div className="record_rank_span3">5 / 5 / 3</div>
                            </div>
                        </div>
                <button className="rank_left_button"><div className="rank_left_button_tri"></div></button>
                <button className="rank_right_button"><div className="rank_right_button_tri"></div></button>
                </div>
                <Footer />
                <ScriptTag src="//t1.daumcdn.net/kas/static/ba.min.js" async />
            </div>
        );
    };
}

export default injectIntl(Rank);