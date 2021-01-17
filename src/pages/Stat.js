import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import { Header, SubBanner, AdS, Footer } from 'components/banner'

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onClick = (e, selectMap) => {
        this.setState({selectMap: selectMap});
    }

    render() {
        const { intl } = this.props;

        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.Map'}),
        }

        return (
            <div>
                <Header data={metaData}/>
                <SubBanner actived={'Route'} />
                    <div className="stat">
                        <div className="stat_span">Statistics</div>
                        <div className="stat_span_tabs">
                            <div className="stat_span_tab actived">솔로</div>
                            <div className="stat_span_tab">듀오</div>
                            <div className="stat_span_tab">스쿼드</div>
                        </div>
                        <div className="stat_left">
                            <div className="stat_left_bar">
                                <div className="stat_left_bar_span">분포도 그래프</div>
                                <div className="stat_left_bar_graphs">
                                    <div className="stat_left_bar_graph_iron"></div>
                                    <div className="stat_left_bar_graph_iron"></div>
                                    <div className="stat_left_bar_graph_iron"></div>
                                    <div className="stat_left_bar_graph_iron"></div>
                                    <div className="stat_left_bar_graph_bronze"></div>
                                    <div className="stat_left_bar_graph_bronze"></div>
                                    <div className="stat_left_bar_graph_bronze"></div>
                                    <div className="stat_left_bar_graph_bronze"></div>
                                    <div className="stat_left_bar_graph_silver"></div>
                                    <div className="stat_left_bar_graph_silver"></div>
                                    <div className="stat_left_bar_graph_silver"></div>
                                    <div className="stat_left_bar_graph_silver"></div>
                                    <div className="stat_left_bar_graph_gold"></div>
                                    <div className="stat_left_bar_graph_gold"></div>
                                    <div className="stat_left_bar_graph_gold"></div>
                                    <div className="stat_left_bar_graph_gold"></div>
                                    <div className="stat_left_bar_graph_platinum"></div>
                                    <div className="stat_left_bar_graph_platinum"></div>
                                    <div className="stat_left_bar_graph_platinum"></div>
                                    <div className="stat_left_bar_graph_platinum"></div>
                                    <div className="stat_left_bar_graph_diamond"></div>
                                    <div className="stat_left_bar_graph_diamond"></div>
                                    <div className="stat_left_bar_graph_diamond"></div>
                                    <div className="stat_left_bar_graph_diamond"></div>
                                    <div className="stat_left_bar_graph_demigod"></div>
                                    <div className="stat_left_bar_graph_demigod"></div>
                                    <div className="stat_left_bar_graph_demigod"></div>
                                    <div className="stat_left_bar_graph_demigod"></div>
                                    <div className="stat_left_bar_graph_eternity"></div>
                                    <div className="stat_left_bar_graph_eternity"></div>
                                    <div className="stat_left_bar_graph_eternity"></div>
                                    <div className="stat_left_bar_graph_eternity"></div>
                                </div>
                                <div className="stat_left_bar_graph_spans_all">
                                    <div className="stat_left_bar_graph_spans">
                                        <div className="stat_left_bar_graph_span">4 3 2 1</div>
                                        <div className="stat_left_bar_graph_span">4 3 2 1</div>
                                        <div className="stat_left_bar_graph_span">4 3 2 1</div>
                                        <div className="stat_left_bar_graph_span">4 3 2 1</div>
                                        <div className="stat_left_bar_graph_span">4 3 2 1</div>
                                        <div className="stat_left_bar_graph_span">4 3 2 1</div>
                                        <div className="stat_left_bar_graph_span">4 3 2 1</div>
                                        <div className="stat_left_bar_graph_span">4 3 2 1</div>
                                    </div>
                                    <div className="stat_left_bar_graph_span2s">
                                        <div className="stat_left_bar_graph_span2">아이언</div>
                                        <div className="stat_left_bar_graph_span2">브론즈</div>
                                        <div className="stat_left_bar_graph_span2">실버</div>
                                        <div className="stat_left_bar_graph_span2">골드</div>
                                        <div className="stat_left_bar_graph_span2">플래티넘</div>
                                        <div className="stat_left_bar_graph_span2">다이아몬드</div>
                                        <div className="stat_left_bar_graph_span2">데미갓</div>
                                        <div className="stat_left_bar_graph_span2">이터니티</div>
                                    </div>
                                </div>
                            </div>
                            <div className="stat_left_server">
                                <div className="stat_left_server_span">서버 분포도</div>
                                <div className="stat_left_server_tabs">
                                    <div className="stat_left_server_tab actived">한국</div>
                                    <div className="stat_left_server_tab">홍콩</div>
                                    <div className="stat_left_server_tab">북미</div>
                                    <div className="stat_left_server_tab">유럽</div>
                                </div>
                                <div className="stat_left_server_circle_box">
                                    <div className="stat_left_server_circle"></div>
                                    <div className="stat_left_server_circle_spans">
                                        <div className="stat_left_server_circle_span_kr">한국 50.2%</div>
                                        <div className="stat_left_server_circle_span_hk">홍콩 50.2%</div>
                                        <div className="stat_left_server_circle_span_us">북미 50.2%</div>
                                        <div className="stat_left_server_circle_span_eu">유럽 50.2%</div>
                                        <div className="stat_left_server_circle_span_kr">한국 50.2%</div>
                                        <div className="stat_left_server_circle_span_hk">홍콩 50.2%</div>
                                        <div className="stat_left_server_circle_span_us">북미 50.2%</div>
                                        <div className="stat_left_server_circle_span_eu">유럽 50.2%</div>
                                    </div>
                                </div>
                                <div className="stat_left_server_graphs_box">    
                                    <div className="stat_left_server_graphs">
                                        <div className="stat_left_bar_server_iron"></div>
                                        <div className="stat_left_bar_server_iron"></div>
                                        <div className="stat_left_bar_server_iron"></div>
                                        <div className="stat_left_bar_server_iron"></div>
                                        <div className="stat_left_bar_server_bronze"></div>
                                        <div className="stat_left_bar_server_bronze"></div>
                                        <div className="stat_left_bar_server_bronze"></div>
                                        <div className="stat_left_bar_server_bronze"></div>
                                        <div className="stat_left_bar_server_silver"></div>
                                        <div className="stat_left_bar_server_silver"></div>
                                        <div className="stat_left_bar_server_silver"></div>
                                        <div className="stat_left_bar_server_silver"></div>
                                        <div className="stat_left_bar_server_gold"></div>
                                        <div className="stat_left_bar_server_gold"></div>
                                        <div className="stat_left_bar_server_gold"></div>
                                        <div className="stat_left_bar_server_gold"></div>
                                        <div className="stat_left_bar_server_platinum"></div>
                                        <div className="stat_left_bar_server_platinum"></div>
                                        <div className="stat_left_bar_server_platinum"></div>
                                        <div className="stat_left_bar_server_platinum"></div>
                                        <div className="stat_left_bar_server_diamond"></div>
                                        <div className="stat_left_bar_server_diamond"></div>
                                        <div className="stat_left_bar_server_diamond"></div>
                                        <div className="stat_left_bar_server_diamond"></div>
                                        <div className="stat_left_bar_server_demigod"></div>
                                        <div className="stat_left_bar_server_demigod"></div>
                                        <div className="stat_left_bar_server_demigod"></div>
                                        <div className="stat_left_bar_server_demigod"></div>
                                        <div className="stat_left_bar_server_eternity"></div>
                                        <div className="stat_left_bar_server_eternity"></div>
                                        <div className="stat_left_bar_server_eternity"></div>
                                        <div className="stat_left_bar_server_eternity"></div>
                                    </div>
                                    <div className="stat_left_bar_server_spans_all">
                                        <div className="stat_left_bar_server_spans">
                                            <div className="stat_left_bar_server_span">4 3 2 1</div>
                                            <div className="stat_left_bar_server_span">4 3 2 1</div>
                                            <div className="stat_left_bar_server_span">4 3 2 1</div>
                                            <div className="stat_left_bar_server_span">4 3 2 1</div>
                                            <div className="stat_left_bar_server_span">4 3 2 1</div>
                                            <div className="stat_left_bar_server_span">4 3 2 1</div>
                                            <div className="stat_left_bar_server_span">4 3 2 1</div>
                                            <div className="stat_left_bar_server_span">4 3 2 1</div>
                                        </div>
                                        <div className="stat_left_bar_server_span2s">
                                            <div className="stat_left_bar_server_span2">아이언</div>
                                            <div className="stat_left_bar_server_span2">브론즈</div>
                                            <div className="stat_left_bar_server_span2">실버</div>
                                            <div className="stat_left_bar_server_span2">골드</div>
                                            <div className="stat_left_bar_server_span2">플래티넘</div>
                                            <div className="stat_left_bar_server_span2">다이아몬드</div>
                                            <div className="stat_left_bar_server_span2">데미갓</div>
                                            <div className="stat_left_bar_server_span2">이터니티</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="stat_right">
                            <div className="stat_right_span">티어 통계</div>
                            <div className="stat_right_span_filter">
                                <div className="stat_right_span_filter1">티어</div>
                                <div className="stat_right_span_filter2">유저 수</div>
                                <div className="stat_right_span_filter3">누계</div>
                            </div>
                            <div className="stat_right_span_tier">
                                <div className="stat_right_span_tier_eternity">
                                    <div className="stat_right_span_tier1">이터니티 1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_eternity">
                                    <div className="stat_right_span_tier1">이터니티 2</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_eternity">
                                    <div className="stat_right_span_tier1">이터니티 3</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_eternity">
                                    <div className="stat_right_span_tier1">이터니티 4</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_demigod">
                                    <div className="stat_right_span_tier1">데미갓 1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_demigod">
                                    <div className="stat_right_span_tier1">이터니티1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_demigod">
                                    <div className="stat_right_span_tier1">이터니티1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_demigod">
                                    <div className="stat_right_span_tier1">다이아몬드 1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_diamond">
                                    <div className="stat_right_span_tier1">이터니티1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_diamond">
                                    <div className="stat_right_span_tier1">이터니티1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_diamond">
                                    <div className="stat_right_span_tier1">이터니티1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_diamond">
                                    <div className="stat_right_span_tier1">이터니티1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_platinum">
                                    <div className="stat_right_span_tier1">플래티넘 1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_platinum">
                                    <div className="stat_right_span_tier1">이터니티1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_platinum">
                                    <div className="stat_right_span_tier1">이터니티1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_platinum">
                                    <div className="stat_right_span_tier1">이터니티1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_gold">
                                    <div className="stat_right_span_tier1">골드 1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_gold">
                                    <div className="stat_right_span_tier1">이터니티1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_gold">
                                    <div className="stat_right_span_tier1">이터니티1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_gold">
                                    <div className="stat_right_span_tier1">이터니티1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_silver">
                                    <div className="stat_right_span_tier1">실버1 </div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_silver">
                                    <div className="stat_right_span_tier1">이터니티1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_silver">
                                    <div className="stat_right_span_tier1">이터니티1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_silver">
                                    <div className="stat_right_span_tier1">이터니티1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_bronze">
                                    <div className="stat_right_span_tier1">브론즈 1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_bronze">
                                    <div className="stat_right_span_tier1">이터니티1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_bronze">
                                    <div className="stat_right_span_tier1">이터니티1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_bronze">
                                    <div className="stat_right_span_tier1">이터니티1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_iron">
                                    <div className="stat_right_span_tier1">이터니티1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_iron">
                                    <div className="stat_right_span_tier1">아이언 1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_iron">
                                    <div className="stat_right_span_tier1">이터니티1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_iron">
                                    <div className="stat_right_span_tier1">이터니티1</div>
                                    <div className="stat_right_span_tier2">25,555 (15.6%)</div>
                                    <div className="stat_right_span_tier3">251,555 (15.6%)</div>
                                </div>
                                <div className="stat_right_span_tier_bot"></div>    
                            </div>    
                        </div>
                    </div>
                <AdS type={'Map'}/>
                <Footer />
            </div>
        );
    };
}

export default injectIntl(Map);