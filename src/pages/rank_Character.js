import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import queryString from 'query-string';
import { Header, SubBanner, Footer } from 'components/banner'
import { getCharacter, getCharacterKeys } from 'lib/data'

class Rank_Character extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: -1,
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

        const character = query.character || 1;
              
        this.setState({ haracter:character });
    }

    componentDidUpdate(prevProps, prevState){
        const { location } = this.props;
        const query = queryString.parse(location.search);

        this.fetchHandler(query, prevState)
    }

    fetchHandler = async (query, prevState) => {
        const character = parseInt(query.character) || 1;
        console.log('character', character, prevState.character);

        if (character !== prevState.character) {
            console.log('character', character, prevState.character);
            let rank;
            
            await fetch('/api/Rank/character?characterCode='+character)
                .then(res => res.json())
                .then(_rank => rank = _rank);
            
            this.setState({ character:character, rank:rank });
        }
    }

    rankData = (rank, width) => {
        const { character } = this.state;
        const stat = rank['characterStats'][character];

        if (!stat) return null;

        const total = stat['totalGames'];
        const top1  = stat['top1'];
        const top3  = stat['top3'] - stat['top1'];
        const loss  = total - stat['top3'];
        const rate  =  Math.round(stat['top1']/total*100);

        const kam   = (stat['totalKills'] + stat['totalAssistants']) / total;
        const tier  = Math.floor(rank['mmr']/100) || 1;
        const lp    = rank['mmr']-tier*100 || 0;

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
        const { rank, tierList, character } = this.state;
        if (rank.length === 0) return;

        return [1, 0, 2].map((number, idx) => {
            const stat = this.rankData(rank[number], 130);

            if (!stat) return;

            return (
                <div className={"rank_top_"+number} key={"rank_top_"+idx}>
                    <img className="rank_top_iconimg" src={"img/Characters/"+getCharacter(character)['name']+".jpg"} />
                    <img className="rank_top_iconborder" src={'img/border/'+tierList[stat['tier']].slice(0, -2)+'.png'} />
                    <span className="rank_top_lv">{stat['tier']%4+1}</span>
                    <div className="rank_top_span_box">
                        <div className="rank_top2_span1">{number+1}</div>
                        <div className="rank_top_span2">{rank[number]['nickname']}</div>
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
        const { rank, tierList, character } = this.state;
        if (rank.length === 0) return;
        
        return rank.slice(3, 50).map((user, idx) => {
            const stat = this.rankData(user, 200);

            if (!stat) return;
            
            return (
                <div className="record_cha_box" key={'record_cha_'+idx}>
                    <div className="record_cha_span1">{idx+4}</div>
                    <img className="record_cha_img" src={"img/Rank/"+getCharacter(character)['name']+".jpg"} />
                    <div className="record_cha_span2">{user['nickname']}</div>
                    <img className="record_cha_rankimg" src={'img/Rankicon/'+tierList[stat['tier']].slice(0, -2)+'.png'} />
                    <div className="record_rank_span11">{tierList[stat['tier']]}</div>
                    <div className="record_rank_span22">{stat['lp']} LP</div>
                    <div className="record_cha_span3">{stat['total']}</div>
                    <div className="record_cha_graph">
                        <div className="record_cha_graphW" style={{width: stat['top1Width']}}></div>
                        <div className="record_cha_graphL" style={{width: stat['lossWidth']}}></div>
                        <div className="record_cha_span4">{stat['top1']}</div>
                        <div className="record_cha_span5">{stat['top3']}</div>
                        <div className="record_cha_span6">{stat['loss']}</div>
                    </div>
                    <div className="record_cha_span7">{stat['rate']}%</div>
                    <div className="record_rank_span33">{stat['kam'].toFixed(2)}</div>
                </div>
            );
        });
    }

    characterTabView = () => {
        return getCharacterKeys().map((code, idx) => 
            <Link to={'/RankCharacter?character='+code} key={'select_box_'+idx}>
                <div className="rank_cha_select_box">
                    <img className="record_select_img actived" src={"img/Rank/"+getCharacter(code)['name']+".jpg"} />
                    <span className="record_select_span">{getCharacter(code)['name']}</span>
                </div>
            </Link>
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
                                <Link to={'/Rank'}>
                                    <div className="record_cha0_tab">ALL</div>
                                </Link>
                                <div className="record_cha0_tab actived">Character</div>
                            </div>
                        </div>
                        <div className="rank_cha_select">
                            {this.characterTabView()}
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
                </div>
                <Footer />
            </div>
        );
    };
}

export default injectIntl(Rank_Character);