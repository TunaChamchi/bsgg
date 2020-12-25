import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import queryString from 'query-string';
import { Header, SubBanner, Footer } from 'components/banner'

class Rank_Charater extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: -1,
            gameMode: -1,
            search: '',
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

        const { location } = this.props;
        
        const query = queryString.parse(location.search);

        const page = parseInt(query.page) || 1;
        const mode = parseInt(query.mode) || 0;
        const search = query.search || '';

        if (search) {                
            this.setState({gameMode:mode, search:search });
        } else {
            this.setState({gameMode:mode, page:page});
        }
    }

    componentDidUpdate(prevProps, prevState){
        const { location } = this.props;
        const query = queryString.parse(location.search);

        this.fetchHandler(query, prevState)
    }

    fetchHandler = async (query, prevState) => {
        const page = parseInt(query.page) || 1;
        const mode = parseInt(query.mode) || 0;
        const search = query.search || '';

        if (page < 0 || page > 10) {
            page = 1;
        }
        if (mode < 0 || mode > 2) {
            mode = 0;
        }

        const index = ((page-1)*100) + 3;
        if (mode !== prevState.gameMode) {
            console.log('gameMode', mode, prevState.gameMode);
            let rank;
            
            await fetch('/api/Rank?mode='+(mode+1)+'&skip=0&limit=103')
                .then(res => res.json())
                .then(_rank => rank = _rank);
                
            this.setState({ gameMode:mode, page:page, rankTop:rank.slice(0, 3), rank:rank.slice(3, 103) });
        } else if (page !== prevState.page) {
            window.scrollTo(0, 0);
            console.log('page', page, prevState.page);
            let rank;

            await fetch('/api/Rank?mode='+(mode+1)+'&skip='+index+'&limit=100')
                .then(res => res.json())
                .then(_rank => rank = _rank);

            this.setState({ page:page, rank:rank });
        } else if (search !== prevState.search) {
            console.log('search');

            fetch('/api/Rank?mode='+(mode+1)+'&search='+search)
                .then(res => res.json())
                .then(rank => this.setState({ rank }));

            this.setState({ search:search });
        }
    }

    rankData = (rank, width) => {
        const { gameMode } = this.state;
        const stat = rank['stat'].filter(s => s['index'].includes('1_3_'+(gameMode+1)))[0];

        if (!stat) return null;

        const total = stat['totalGames'];
        const top1 = Math.round(stat['top1']*total);
        const top3 = Math.round(stat['top3']*total) - top1;
        const loss = total - top1 - top3;
        const rate = Math.round(stat['top1']*100);

        const kam  = stat['averageKills']+stat['averageAssistants'];
        const tier = Math.floor(rank['mmr']/100);
        const lp   = rank['mmr']-tier*100;

        const top1Width = top1/total * width;
        const lossWidth = loss/total * width;

        const _stat = {
            top1: top1,
            top3: top3,
            loss: loss,
            rate: rate,
            total: total,
            kam: kam,
            tier: tier,
            lp: lp,
            top1Width: top1Width,
            lossWidth: lossWidth,
        }

        return _stat;
    }

    rankTopView = () => {
        const { rankTop, tierList, gameMode } = this.state;
        if (rankTop.length === 0) return;

        return [1, 0, 2].map((number, idx) => {
            const stat = this.rankData(rankTop[number], 130);

            if (!stat) return;

            return (
                <div className={"rank_top_"+number} key={"rank_top_"+idx}>
                    <img className="rank_top_iconimg" src="img/Characters/재키.jpg" />
                    <img className="rank_top_iconborder" src={'img/border/'+tierList[stat['tier']].slice(0, -2)+'.png'} />
                    <span className="rank_top_lv">{stat['tier']%4+1}</span>
                    <div className="rank_top_span_box">
                        <div className="rank_top2_span1">{rankTop[number]['rank']}</div>
                        <div className="rank_top_span2">{rankTop[number]['nickname']}</div>
                        <div className="rank_top_span3">{tierList[stat['tier']]} {stat['lp']} LP</div>
                            <div className="rank_top_graph">
                                <div className="rank_top_graphW" style={{width: stat['top1Width']}}></div>
                                <div className="rank_top_graphL" style={{width: stat['lossWidth']}}></div>
                                <div className="rank_top_span4" >{stat['top1']}</div>
                                <div className="rank_top_span5" >{stat['top3']}</div>
                                <div className="rank_top_span6" >{stat['loss']}</div>
                                <div className="rank_top_span7" >{stat['rate']}%</div>
                            </div>
                            <div className="rank_top_span8">KA/M {stat['kam'].toFixed(2)}</div>
                    </div>
                </div>
            );
        });
    }
    rankTableView = () => {
        const { rank, tierList, gameMode } = this.state;
        if (rank.length === 0) return;
        
        return rank.map((user, idx) => {
            const stat = this.rankData(user, 200);

            if (!stat) return;
            
            return (
                <div className="record_cha_box" key={'record_cha_'+idx}>
                    <div className="record_cha_span1">{user['rank']}</div>
                    <img className="record_cha_img" src="img/Rank/재키.jpg" />
                    <div className="record_cha_span2">{user['nickname']}</div>
                    <img className="record_cha_rankimg" src={'img/rankicon/'+tierList[stat['tier']].slice(0, -2)+'.png'} />
                    <div className="record_rank_span1">{tierList[stat['tier']]}</div>
                    <div className="record_rank_span2">{stat['lp']} LP</div>
                    <div className="record_cha_span3">{stat['total']}</div>
                    <div className="record_cha_graph">
                        <div className="record_cha_graphW" style={{width: stat['top1Width']}}></div>
                        <div className="record_cha_graphL" style={{width: stat['lossWidth']}}></div>
                        <div className="record_cha_span4">{stat['top1']}</div>
                        <div className="record_cha_span5">{stat['top3']}</div>
                        <div className="record_cha_span6">{stat['loss']}</div>
                    </div>
                    <div className="record_cha_span7">{stat['rate']}%</div>
                    <div className="record_rank_span3">{stat['kam'].toFixed(2)}</div>
                </div>
            );
        });
    }

    gameModeTabView = () => {
        const { page, gameMode, gameModeList } = this.state;
        return gameModeList.map((mode, idx) => 
            <Link to={'/Rank?mode='+idx+'&page='+page} key={'cha_tab_'+idx}>
                <div className={'rank_cha_tab1'+(idx===gameMode?' actived':'')}>
                    {mode}
                </div>
            </Link>
        )
    }

    render() {
        const { intl } = this.props;
        const { gameMode, page } = this.state;

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
                                    <Link to={'/Rank?mode='+gameMode}>
                                        <div className="record_cha0_tab actived">ALL</div>
                                    </Link>
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
                        {
                            page > 1 &&
                                <Link to={'/Rank?mode='+gameMode+'&page='+(page-1)} key={'page_left'}>
                                    <button className="rank_left_button" ><div className="rank_left_button_tri"></div></button>
                                </Link>
                        }
                        <div>
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(idx => 
                                    <Link to={'/Rank?mode='+gameMode+'&page='+idx} key={'page_'+idx}>
                                        <button className="rank_button" ><div className="rank_button_tri">{idx}</div></button>
                                    </Link>
                                )
                            }
                        </div>
                        {
                            page < 10 &&
                                <Link to={'/Rank?mode='+gameMode+'&page='+(page+1)} key={'page_right'}>
                                    <button className="rank_right_button" ><div className="rank_right_button_tri"></div></button>
                                </Link>
                        }
                </div>
                <Footer />
            </div>
        );
    };
}

export default injectIntl(Rank_Charater);