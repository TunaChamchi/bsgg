import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import ScriptTag from 'react-script-tag';
import { Header, SubBanner, Footer } from 'components/banner'
import rank from 'server/schemas/rank';

class Rank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 3,
            rank: [],

        };
    }

    componentDidMount() {
        console.log('componentDidMount');  
        fetch('/api/rank?mode='+1)
            .then(res => res.json())
            .then(rank => this.setState({ rank }));
    }

    /*componentDidUpdate(prevProps, prevState){
        const { rank } = this.props;
    }*/

    rankTopView = () => {
        const { rank } = this.state;
        if (rank.length === 0) return;

        return [1, 0, 2].map((number, idx) => 
            <div className={"rank_top_"+number} key={"rank_top_"+idx}>
                <img className="rank_top_iconimg" src="img/Characters/재키.jpg" />
                <img className="rank_top_iconborder" src="img/border/이터널.png" />
                <span className="rank_top_lv">50</span>
                <div className="rank_top_span_box">
                    <div className="rank_top2_span1">{rank[number]['rank']}</div>
                    <div className="rank_top_span2">{rank[number]['nickname']}</div>
                    <div className="rank_top_span3">Eternal {rank[number]['mmr']} LP</div>
                        <div className="rank_top_graph">
                            <div className="rank_top_graphW"></div>
                            <div className="rank_top_graphL"></div>
                            <div className="rank_top_span4">41</div>
                            <div className="rank_top_span5">81</div>
                            <div className="rank_top_span6">250</div>
                            <div className="rank_top_span7">23%</div>
                        </div>
                </div>
            </div>
        )
    }

    rankTableView = () => {
        const { rank, index } = this.state;
        if (rank.length === 0) return;
        
        return rank.map((user, idx) => 
            <div className="record_cha_box" key={'record_cha_'+idx}>
                <div className="record_cha_span1">{user['rank']}</div>
                <img className="record_cha_img" src="img/rank/재키.jpg" />
                <div className="record_cha_span2">{user['nickname']}</div>
                <div className="record_rank_span1">Eternal</div>
                <div className="record_rank_span2">{user['mmr']} LP</div>
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
        )
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
                    {this.rankTopView()}
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
                            {this.rankTableView()}
                        </div>
                </div>
                <Footer />
                <ScriptTag src="//t1.daumcdn.net/kas/static/ba.min.js" async />
            </div>
        );
    };
}

export default injectIntl(Rank);