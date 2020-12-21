import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import ScriptTag from 'react-script-tag';
import { Header, SubBanner, Footer } from 'components/banner'

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
                    <img className="record_top_medal" src="img/rankicon/topgod.png" />
                    <img className="record_top_medal" src="img/rankicon/topgod.png" />
                    <img className="record_top_medal" src="img/rankicon/topgod.png" />
                    <img className="record_top_medal" src="img/rankicon/topgod.png" />
                </div>
                <div className="record_main">
                    <div className="record_left">
                        <div className="record_rank">
                            <span className="record_rank0">RANK</span>
                            <div className="record_rank_box">
                                <img className="record_rank_icon" src="img/rankicon/gold.png" />
                                <div className="record_rank_span1">솔로</div>
                                <div className="record_rank_span2">골드 4 / 10 LP</div>
                                <div className="record_rank_span3">25전 6승 24.4%</div>
                                <div className="record_rank_span4">3112위 / 상위 6.8%</div>
                                <div className="record_rank_graph"></div>
                            </div>
                            <div className="record_rank_box">
                                <img className="record_rank_icon" src="img/rankicon/gold.png" />
                                <div className="record_rank_span1">듀오</div>
                                <div className="record_rank_span2">골드 4 / 10 LP</div>
                                <div className="record_rank_span3">25전 6승 24.4%</div>
                                <div className="record_rank_span4">3112위 / 상위 6.8%</div>
                                <div className="record_rank_graph"></div>
                            </div>
                            <div className="record_rank_box">
                                <img className="record_rank_icon" src="img/rankicon/gold.png" />
                                <div className="record_rank_span1">스쿼드</div>
                                <div className="record_rank_span2">골드 4 / 10 LP</div>
                                <div className="record_rank_span3">25전 6승 24.4%</div>
                                <div className="record_rank_span4">3112위 / 상위 6.8%</div>
                                <div className="record_rank_graph"></div>
                            </div>
                        </div>
                        <div className="record_most">
                            <span className="record_most0">MOST 5</span>
                            <div className="record_most_tabs">
                                <div className="record_most_tab1 actived">전체</div>
                                <div className="record_most_tab1">랭크게임</div>
                            </div>
                            <div className="record_most_tabs">
                                <div className="record_most_tab2 actived">전체</div>
                                <div className="record_most_tab2">솔로</div>
                                <div className="record_most_tab2">듀오</div>
                                <div className="record_most_tab2">스쿼드</div>
                            </div>
                            <div className="record_most_box">
                                <img className="record_most_img" src="img/rank/재키.jpg" />
                                <div className="record_most_span">
                                    <div className="record_most_span1">재키</div>
                                    <div className="record_most_span2">승률 24.4%</div>
                                    <div className="record_most_span3">4.1 KDA</div>
                                    <div className="record_most_span4">34게임</div>
                                </div>
                            </div>
                            <div className="record_most_box">
                                <img className="record_most_img" src="img/rank/재키.jpg" />
                                <div className="record_most_span">
                                    <div className="record_most_span1">재키</div>
                                    <div className="record_most_span2">승률 24.4%</div>
                                    <div className="record_most_span3">4.1 KDA</div>
                                    <div className="record_most_span4">34게임</div>
                                </div>
                            </div>
                            <div className="record_most_box">
                                <img className="record_most_img" src="img/rank/재키.jpg" />
                                <div className="record_most_span">
                                    <div className="record_most_span1">재키</div>
                                    <div className="record_most_span2">승률 24.4%</div>
                                    <div className="record_most_span3">4.1 KDA</div>
                                    <div className="record_most_span4">34게임</div>
                                </div>
                            </div>
                            <div className="record_most_box">
                                <img className="record_most_img" src="img/rank/재키.jpg" />
                                <div className="record_most_span">
                                    <div className="record_most_span1">재키</div>
                                    <div className="record_most_span2">승률 24.4%</div>
                                    <div className="record_most_span3">4.1 KDA</div>
                                    <div className="record_most_span4">34게임</div>
                                </div>
                            </div>
                            <div className="record_most_box">
                                <img className="record_most_img" src="img/rank/재키.jpg" />
                                <div className="record_most_span">
                                    <div className="record_most_span1">재키</div>
                                    <div className="record_most_span2">승률 24.4%</div>
                                    <div className="record_most_span3">4.1 KDA</div>
                                    <div className="record_most_span4">34게임</div>
                                </div>
                            </div>
                            <button className="record_most_button">더 보기</button>
                        </div>
                        <div className="record_with">
                            <div className="record_with0">RECENT 20</div>
                            <div className="record_with_box">
                                <div className="record_with_span1">팀원</div>
                            </div>
                        </div>
                    </div>
                    <div className="record_rigth">
                        <div className="record_match">
                            <div className="record_match0">
                                <span className="record_match0_span">Match History</span>
                                <div className="record_match0_tabs">
                                    <div className="record_match0_tab">ALL</div>
                                    <div className="record_match0_tab actived">RECENT</div>
                                </div>
                            </div>
                            <div className="record_most_tabs">
                                <div className="record_match_tab2 actived">전체</div>
                                <div className="record_match_tab2">솔로</div>
                                <div className="record_match_tab2">듀오</div>
                                <div className="record_match_tab2">스쿼드</div>
                            </div>
                            <div className="record_trend">
                                <div className="record_trend_winrate"></div>
                                    <div className="record_trend_winrate_graph">
                                        <div className="record_trend_winrate_graph2"></div>
                                        <div className="record_trend_avg">24.4%</div>
                                    </div>
                                    <div className="record_trend_winrate_span">
                                        <div className="record_trend_winrate_span1">승 2</div>
                                        <div className="record_trend_winrate_span2">탑3 5</div>
                                        <div className="record_trend_winrate_span3">게임 20</div>
                                    </div>
                                <div className="record_trend_kda">
                                    <div className="record_trend_kda1">2.4 KDA</div>
                                    <div className="record_trend_kda2">1.2/1.7/0.8</div>
                                </div>
                                <div className="record_trend_win">
                                    <div className="record_trend_winspan">15 win</div>
                                    <div className="record_trend_winspan">#5.5</div>
                                </div>
                            </div>
                            <div className="record_trend_most_box">
                                <div className="record_trend_most">
                                    <img className="record_trend_most_img" src="img/rank/재키.jpg" />
                                    <div className="record_trend_most_span">
                                        <div className="record_trend_most_span1">1승 / 34게임 / 24.4%</div>
                                        <div className="record_trend_most_span2">4.1 KDA</div>
                                    </div>
                                </div>
                                <div className="record_trend_most">
                                    <img className="record_trend_most_img" src="img/rank/재키.jpg" />
                                    <div className="record_trend_most_span">
                                        <div className="record_trend_most_span1">1승 / 34게임 / 24.4%</div>
                                        <div className="record_trend_most_span2">4.1 KDA</div>
                                    </div>
                                </div>
                                <div className="record_trend_most">
                                    <img className="record_trend_most_img" src="img/rank/재키.jpg" />
                                    <div className="record_trend_most_span">
                                        <div className="record_trend_most_span1">1승 / 34게임 / 24.4%</div>
                                        <div className="record_trend_most_span2">4.1 KDA</div>
                                    </div>
                                </div>
                            </div>
                            <div className="record_match">

                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <ScriptTag src="//t1.daumcdn.net/kas/static/ba.min.js" async />
            </div>
        );
    };
}

export default injectIntl(Map);