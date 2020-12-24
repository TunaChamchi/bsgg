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
            gameMode: 0,
            gameModeList:['솔로', '듀오', '스쿼드'],
            rank: [],
            rankTop: [],
            tierList: ['Iron 4', 'Iron 3', 'Iron 2', 'Iron 1', 'Bronze 4', 'Bronze 3','Bronze 2', 'Bronze 1',
                    'Silver 4', 'Silver 3', 'Silver 2', 'Silver 1', 'Gold 4', 'Gold 3','Gold 2', 'Gold 1',
                    'Platinum 4', 'Platinum 3', 'Platinum 2', 'Platinum 1', 'Diamond 4', 'Diamond 3','Diamond 2', 'Diamond 1',
                    'Demigod 4', 'Demigod 3', 'Demigod 2', 'Demigod 1', 'Eternity 4', 'Eternity 3','Eternity 2', 'Eternity 1']
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        fetch('/api/rank?mode=1&skip=0&limit=3')
            .then(res => res.json())
            .then(rankTop => this.setState({ rankTop }));
            
        fetch('/api/rank?mode=1&skip=3&limit=100')
            .then(res => res.json())
            .then(rank => this.setState({ rank }));
    }

    componentDidUpdate(prevProps, prevState){
        const { gameMode, index } = this.state;

        if (gameMode !== prevState.gameMode) {
            fetch('/api/rank?mode='+(gameMode+1)+'&skip='+0+'&limit=3')
                .then(res => res.json())
                .then(rankTop => this.setState({ rankTop }));
                
            fetch('/api/rank?mode='+(gameMode+1)+'&skip='+index+'&limit=100')
                .then(res => res.json())
                .then(rank => this.setState({ rank }));
        } else if (index !== prevState.index) {
            fetch('/api/rank?mode='+(gameMode+1)+'&skip='+index+'&limit=100')
                .then(res => res.json())
                .then(rank => this.setState({ rank }));
        }
    }

    rankTopView = () => {
        const { rankTop, tierList, gameMode } = this.state;
        if (rankTop.length === 0) return;

        return [1, 0, 2].map((number, idx) => {
            const stat = rankTop[number]['stat'].filter(s => s['index'].includes('1_3_'+(gameMode+1)))[0];
            const loss = stat['totalGames'] - stat['totalWins'] - stat['top3']*stat['totalGames'];
            const ka   = stat['averageKills']*stat['totalGames'] + stat['averageAssistants']*stat['totalGames'];
            const tier = Math.floor(rankTop[number]['mmr']/100);
            const top1Width = stat['totalWins']/stat['totalGames'] * 130;
            const lossWidth = loss/stat['totalGames'] * 130;
            return (
                <div className={"rank_top_"+number} key={"rank_top_"+idx}>
                    <img className="rank_top_iconimg" src="img/Characters/재키.jpg" />
                    <img className="rank_top_iconborder" src={'img/border/'+tierList[tier].slice(0, -2)+'.png'} />
                    <span className="rank_top_lv"></span>
                    <div className="rank_top_span_box">
                        <div className="rank_top2_span1">{rankTop[number]['rank']}</div>
                        <div className="rank_top_span2">{rankTop[number]['nickname']}</div>
                        <div className="rank_top_span3">{tierList[tier]} {rankTop[number]['mmr']-tier*100} LP</div>
                            <div className="rank_top_graph">
                                <div className="rank_top_graphW" style={{width: top1Width}}></div>
                                <div className="rank_top_graphL" style={{width: lossWidth}}></div>
                                <div className="rank_top_span4" >{stat['totalWins']}</div>
                                <div className="rank_top_span5" >{(stat['top3']*stat['totalGames']).toFixed(0)}</div>
                                <div className="rank_top_span6" >{loss.toFixed(0)}</div>
                                <div className="rank_top_span7" >{(stat['top1']*100).toFixed(0)}%</div>
                            </div>
                            <div className="rank_top_span8">KA/M {(ka/stat['totalGames']).toFixed(2)}</div>
                    </div>
                </div>
            );
        });
    }
    rankTableView = () => {
        const { rank, tierList, gameMode } = this.state;
        if (rank.length === 0) return;
        
        return rank.map((user, idx) => {
            const stat = user['stat'].filter(s => s['index'].includes('1_3_'+(gameMode+1)))[0];
            const loss = stat['totalGames'] - stat['totalWins'] - Math.round(stat['top3']*stat['totalGames']);
            const ka   = stat['averageKills']*stat['totalGames'] + stat['averageAssistants']*stat['totalGames'];
            const tier = Math.abs(Math.floor(user['mmr']/100));
            const top1Width = stat['totalWins']/stat['totalGames'] * 130;
            const lossWidth = loss/stat['totalGames'] * 130;
            return (
                <div className="record_cha_box" key={'record_cha_'+idx}>
                    <div className="record_cha_span1">{user['rank']}</div>
                    <img className="record_cha_img" src="img/rank/재키.jpg" />
                    <div className="record_cha_span2">{user['nickname']}</div>
                    <img className="record_cha_rankimg" src={'img/rankicon/'+tierList[tier].slice(0, -2)+'.png'} />
                    <div className="record_rank_span1">{tierList[tier]}</div>
                    <div className="record_rank_span2">{user['mmr']-tier*100} LP</div>
                    <div className="record_cha_span3">{stat['totalGames']}</div>
                    <div className="record_cha_graph">
                        <div className="record_cha_graphW" style={{width: top1Width}}></div>
                        <div className="record_cha_graphL" style={{width: lossWidth}}></div>
                        <div className="record_cha_span4">{stat['totalWins']}</div>
                        <div className="record_cha_span5">{(stat['top3']*stat['totalGames']).toFixed(0)}</div>
                        <div className="record_cha_span6">{loss.toFixed(0)}</div>
                    </div>
                    <div className="record_cha_span7">{(stat['top1']*100).toFixed(0)}%</div>
                    <div className="record_rank_span3">{(ka/stat['totalGames']).toFixed(2)}</div>
                </div>
            );
        });
    }

    gameModeHandler = (e, index) => {
        this.setState({gameMode: index, index:3, rankTop:[], rank:[]});
    }
    gameModeTabView = () => {
        const { gameMode, gameModeList } = this.state;
        return gameModeList.map((mode, idx) => 
            <div className={'rank_cha_tab1'+(idx===gameMode?' actived':'')} key={'cha_tab_'+idx}
                onClick={(e) => this.gameModeHandler(e, idx)}>
                {mode}
            </div>
        )
    }

    indexHandler = (e, _index) => {
        const { index } = this.state;
        if (index + _index >= 3 && index + _index < 1003) {
            window.scrollTo(0, 0);
            this.setState({index: index+_index});
        }
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
                                {this.gameModeTabView()}
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
                                <div className="record_rank_filter3">KA/M</div>
                            </div>
                            {this.rankTableView()}
                        </div>
                <button className="rank_left_button" onClick={(e) => this.indexHandler(e, -100)}><div className="rank_left_button_tri"></div></button>
                <button className="rank_right_button" onClick={(e) => this.indexHandler(e, 100)}><div className="rank_right_button_tri"></div></button>
                </div>
                <Footer />
                <ScriptTag src="//t1.daumcdn.net/kas/static/ba.min.js" async />
            </div>
        );
    };
}

export default injectIntl(Rank);