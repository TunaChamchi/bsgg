import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import queryString from 'query-string';
import { Header, SubBanner, Footer } from 'components/banner'
import { getCharacter, getItem, getWeaponType } from 'lib/data'

class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matchList: [],
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

        const userName = query.userName || 'hyuni';
              
        this.setState({ userName:userName });
    }

    componentDidUpdate(prevProps, prevState){
        const { location } = this.props;
        const query = queryString.parse(location.search);

        this.fetchHandler(query, prevState)
    }

    fetchHandler = async (query, prevState) => {
        const userName = query.userName || 'hyuni';
        console.log('userName', userName, prevState.userName);

        if (userName !== prevState.userName) {
            console.log('userName', userName, prevState.userName);
            let user;
            let userStat;
            let matchList;
            
            await fetch('/api/User/'+userName)
                .then(res => res.json())
                .then(res => {user = res['user']; userStat = res['userStat'];});
            
            await fetch('/api/User/'+user['userNum']+'/match?limit=20')
                .then(res => res.json())
                .then(_matchList => matchList = _matchList);

            const matchStat = {
                total:0,
                playerKill:0,
                playerAssistant:0,
                gameRank:0,
                top1:0,
                top3:0,
            }

            matchList.foreach(m => {
                matchStat['playerKill'] += m['playerKill'];
                matchStat['playerAssistant'] += m['playerKill'];
                matchStat['gameRank'] += m['gameRank'];
                matchStat['top1'] += m['gameRank'] === 1 ? 1 : 0;
                matchStat['top3'] += m['gameRank'] < 4 ? 1 : 0;
                matchStat['total']++;
            })

            matchStat['gameRank'] /= matchStat['total'];

            this.setState({ userName:userName, user:user, userStat:userStat, matchList:matchList, matchStat:matchStat });
        }
    }

    rankView() {
        const { user, userStat, tierList } = this.state;

        return Object.keys(userStat['seasonStats']["1"]).map((keys, id) => {
            const rank = userStat['seasonStats']["1"][keys];

            const total = rank['totalGames'];
            const top1 = rank['top1'];
            const kdm = (rank['totalKills'] + rank['totalAssistants']) / total
            const tier = Math.floor(rank['mmr']/100);
            const lp   = rank['mmr']-tier*100;

            return (
                <div className="record_rank_box">
                    <img className="record_rank_icon" src={"img/rankicon/"+tierList[tier].slice(0, -2)+".png"} />
                    <div className="record_rank_span1">솔로</div>
                    <div className="record_rank_span2">{tierList[tier]} / {lp} LP</div>
                    <div className="record_rank_span3">{total}전 {top1}승 {(top1/total*100).toFixed(1)}% / {kdm.toFixed(1)} K/M</div>
                    <div className="record_rank_span4">3112위 / 상위 6.8%</div>
                    <div className="record_rank_graph"></div>
                </div>
            )
        })
    }
    
    matchHistoryView() {
        const { matchList } = this.state;

        let mmrAfter = 0;
        return matchList.map((match, id) => {
            console.log('match', match);

            const character = getCharacter(match['characterNum'])['name'];
            const weapon = match['bestWeapon'];
            const mmr = mmrAfter;
            mmrAfter = match['mmrBefore'];

            const imgUpDown = mmrAfter-mmr > 0 ? 'img/UpDown/하락.png' : 'img/UpDown/유지.png';

            const seasonId = match['seasonId'] ? '랭크' : '일반';
            const matchingTeamMode = match['matchingTeamMode'] === 1 ? '솔로' : match['matchingTeamMode'] === 2 ? '듀오' : '스쿼드';

            return (
                <div className="record_history_box">
                    <div className="record_history_top"></div>
                    <div className="record_history1">
                        <div className="record_history_rank_top">{match['gameRank']}</div>
                        <div className="record_history_filter">{seasonId}/{matchingTeamMode}</div>
                        <div className="record_history_date">2일 전</div>
                    </div>
                    <div className="record_history2">
                        <img className="record_history_img" src={"img/rank/"+character+".jpg"} />
                        <img className="record_history_weapon" src={"img/weapons/"+getWeaponType(weapon)+".jpg"} />
                        <div className="record_history_name">{character}</div>
                    </div>
                    <div className="record_history3-4">
                        <div className="record_history3">
                            <div className="record_history_lv">레벨 {match['gameRank']}</div>
                            <div className="record_history_mmr">{mmr}</div>
                            <img className="record_history_upmark" src={imgUpDown}/>
                            <div className="record_history_up">{mmrAfter-mmr}</div>
                        </div>
                        <div className="record_history_kda">
                            <span className="record_history_kda2">{match['playerKill']} K</span> <span> / </span>
                            <span className="record_history_kda2">{match['playerAssistant']} A</span> <span> / </span>
                            <span className="record_history_kda2">{match['gameRank']} CS</span>
                        </div>
                    </div>
                    <div className="record_history_item_box">
                        {
                            [0, 1, 2, 3, 4, 5].map(index => 
                                match['equipment'][index] && 
                                    <div className="record_history_item">
                                        <img className="record_history_item1" src={"img/item/BackGround/"+getItem(match['equipment'][index])['itemGrade']+".jpg"} />
                                        <img className="record_history_item2" src={"img/item/"+getItem(match['equipment'][index])['name']+".png"} />
                                    </div>
                            )
                        }
                    </div>
                    <img className="record_history_detailbutton" src="img/downlogo.png" />
                </div>
            )
        })
    }

    render() {
        const { intl } = this.props;
        const { user, userStat, tierList } = this.state;

        console.log('user', user);
        console.log('userStat', userStat);

        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.Map'}),
            description: '영원회귀 : 블랙 서바이벌 통계, 캐릭터 티어, 아이템 트렌드, BS:ER Stats, Character Tier, Item Trend'
        }

        if (!userStat) return '';

        const total = userStat['totalGames'];
        const top1 = userStat['top1'];
        const top3 = userStat['top3'] - userStat['top1'];
        const totalKills  = userStat['totalKills'];

        return (
            <div>
                <Header data={metaData}/>
                <SubBanner />
                <div className="record_top">
                    <div className="record_top_icon">
                        <img className="record_top_iconimg" src={"img/Characters/" + getCharacter(userStat['mostCharacter'])['name'] + ".jpg"} />
                        <img className="record_top_iconborder" src={"img/border/" + tierList[0].slice(0, -2) + ".png"} />
                        <span className="record_top_lv">50</span>
                    </div>
                    <div className="record_top_right">
                        <div className="record_top_name">
                            {user['nickname']}
                        </div>
                        <button className="record_top_renew">
                            전적갱신
                        </button>
                        <span className="record_top_updated">최근 업데이트 {user['updateDate']}</span>
                    </div>
                    <div className="record_top_medal_box">
                        <img className="record_top_medal" src="img/medal/승7.png" />
                        <div className="medal_span_tooltip">
                            <span>ㅇㅇ</span>
                        </div>
                    </div>
                    <div className="record_top_medal_box">
                        <img className="record_top_medal" src="img/medal/승7.png" />
                        <div className="medal_span_tooltip">
                            <span>ㅇㅇ</span>
                        </div>
                    </div>
                    <div className="record_top_medal_box">
                        <img className="record_top_medal" src="img/medal/승7.png" />
                        <div className="medal_span_tooltip">
                            <span>ㅇㅇ</span>
                        </div>
                    </div>
                    <div className="record_top_medal_box">
                        <img className="record_top_medal" src="img/medal/승7.png" />
                        <div className="medal_span_tooltip">
                            <span>ㅇㅇ</span>
                        </div>
                    </div>
                </div>
                <div className="record_main">
                    <div className="record_left">
                        <div className="record_rank">
                            <span className="record_rank0">RANK</span>
                            {this.rankView()}
                        </div>
                        <div className="record_most">
                            <span className="record_most0">MOST 5</span>
                            <div className="record_most_tabs">
                                <div className="record_most_tab1 actived">전체</div>
                                <div className="record_most_tab1">랭크</div>
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
                                    <div className="record_most_span3"> 
                                        <span className="record_history_kda2">4.1 KA/M</span>
                                    </div>
                                    <div className="record_most_span4">34게임</div>
                                </div>
                            </div>
                            <div className="record_most_box">
                                <img className="record_most_img" src="img/rank/재키.jpg" />
                                <div className="record_most_span">
                                    <div className="record_most_span1">재키</div>
                                    <div className="record_most_span2">승률 24.4%</div>
                                    <div className="record_most_span3"> 
                                        <span className="record_history_kda2">4.1 KA/M</span>
                                    </div>
                                    <div className="record_most_span4">34게임</div>
                                </div>
                            </div>
                            <div className="record_most_box">
                                <img className="record_most_img" src="img/rank/재키.jpg" />
                                <div className="record_most_span">
                                    <div className="record_most_span1">재키</div>
                                    <div className="record_most_span2">승률 24.4%</div>
                                    <div className="record_most_span3"> 
                                        <span className="record_history_kda2">4.1 KA/M</span>
                                    </div>
                                    <div className="record_most_span4">34게임</div>
                                </div>
                            </div>
                            <div className="record_most_box">
                                <img className="record_most_img" src="img/rank/재키.jpg" />
                                <div className="record_most_span">
                                    <div className="record_most_span1">재키</div>
                                    <div className="record_most_span2">승률 24.4%</div>
                                    <div className="record_most_span3"> 
                                        <span className="record_history_kda2">4.1 KA/M</span>
                                    </div>
                                    <div className="record_most_span4">34게임</div>
                                </div>
                            </div>
                            <div className="record_most_box">
                                <img className="record_most_img" src="img/rank/재키.jpg" />
                                <div className="record_most_span">
                                    <div className="record_most_span1">아드리아나</div>
                                    <div className="record_most_span2">승률 24.4%</div>
                                    <div className="record_most_span3"> 
                                        <span className="record_history_kda2">4.1 KA/M</span>
                                    </div>
                                    <div className="record_most_span4">34게임</div>
                                </div>
                            </div>
                            <button className="record_most_button">더 보기</button>
                        </div>
                        <div className="record_with">
                            <div className="record_with0">TOGETHER</div>
                            <div className="record_with_box">
                                <div className="record_with_span1">팀원</div>
                                <div className="record_with_span2">게임</div>
                                <div className="record_with_span2">승</div>
                                <div className="record_with_span2">탑3</div>
                                <div className="record_with_span2">승률</div>
                            </div>
                            <div className="record_with_box">
                                <div className="record_with_span1">준돌리스</div>
                                <div className="record_with_span2">13</div>
                                <div className="record_with_span2">3</div>
                                <div className="record_with_span2">5</div>
                                <div className="record_with_span2">22.5%</div>
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
                                    <div className="record_trend_kda1">
                                        <span className="record_history_kda2">2.4 KA/M</span>
                                    </div>
                                    <div className="record_trend_kda2">1.2 / 1.7 / 33</div>
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
                                        <div className="record_trend_most_span2">4.1 KA/M</div>
                                    </div>
                                </div>
                                <div className="record_trend_most">
                                    <img className="record_trend_most_img" src="img/rank/재키.jpg" />
                                    <div className="record_trend_most_span">
                                        <div className="record_trend_most_span1">1승 / 34게임 / 24.4%</div>
                                        <div className="record_trend_most_span2">4.1 KA/M</div>
                                    </div>
                                </div>
                                <div className="record_trend_most">
                                    <img className="record_trend_most_img" src="img/rank/재키.jpg" />
                                    <div className="record_trend_most_span">
                                        <div className="record_trend_most_span1">1승 / 34게임 / 24.4%</div>
                                        <div className="record_trend_most_span2">4.1 KA/M</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="record_history">
                            {this.matchHistoryView()}
                            <div className="record_history_detail" >
                                    <div className="record_history_detail0" >매치 정보</div>
                                    <div className="record_history_detail_skill">
                                        <span className="record_history_detail_skill_span">스킬 빌드</span>
                                        <div className="record_history_detail_skill0">
                                            <div className="record_history_detail_skill1">
                                                <div className="record_history_detail_skill1-1">1</div>
                                                <div className="record_history_detail_skill1-1">2</div>
                                                <div className="record_history_detail_skill1-1">3</div>
                                                <div className="record_history_detail_skill1-1">4</div>
                                                <div className="record_history_detail_skill1-1">5</div>
                                                <div className="record_history_detail_skill1-1">6</div>
                                                <div className="record_history_detail_skill1-1">7</div>
                                                <div className="record_history_detail_skill1-1">8</div>
                                                <div className="record_history_detail_skill1-1">9</div>
                                                <div className="record_history_detail_skill1-1">10</div>
                                                <div className="record_history_detail_skill1-1">11</div>
                                                <div className="record_history_detail_skill1-1">12</div>
                                                <div className="record_history_detail_skill1-1">13</div>
                                                <div className="record_history_detail_skill1-1">14</div>
                                                <div className="record_history_detail_skill1-1">15</div>
                                                <div className="record_history_detail_skill1-1">16</div>
                                                <div className="record_history_detail_skill1-1">17</div>
                                                <div className="record_history_detail_skill1-1">18</div>
                                                <div className="record_history_detail_skill1-1">19</div>
                                                <div className="record_history_detail_skill1-1">10</div>
                                            </div>
                                            <div className="record_history_detail_skill2">
                                                <div className="record_history_detail_skill2-1">Q</div>
                                                <div className="record_history_detail_skill2-1">Q</div>
                                                <div className="record_history_detail_skill2-1">Q</div>
                                                <div className="record_history_detail_skill2-1">Q</div>
                                                <div className="record_history_detail_skill2-1">Q</div>
                                                <div className="record_history_detail_skill2-1">Q</div>
                                                <div className="record_history_detail_skill2-1">Q</div>
                                                <div className="record_history_detail_skill2-1">Q</div>
                                                <div className="record_history_detail_skill2-1">Q</div>
                                                <div className="record_history_detail_skill2-1">Q</div>
                                                <div className="record_history_detail_skill2-1">Q</div>
                                                <div className="record_history_detail_skill2-1">Q</div>
                                                <div className="record_history_detail_skill2-1">Q</div>
                                                <div className="record_history_detail_skill2-1">Q</div>
                                                <div className="record_history_detail_skill2-1">Q</div>
                                                <div className="record_history_detail_skill2-1">Q</div>
                                                <div className="record_history_detail_skill2-1">Q</div>
                                                <div className="record_history_detail_skill2-1">Q</div>
                                                <div className="record_history_detail_skill2-1">Q</div>
                                                <div className="record_history_detail_skill2-1">Q</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="record_history_detail_filter">
                                        <div className="record_history_detail_filter1">순위</div>
                                        <div className="record_history_detail_filter2">플레이어</div>
                                        <div className="record_history_detail_filter3">킬어시 / 딜량</div>
                                        <div className="record_history_detail_filter4">죽인 플레이어</div>
                                        <div className="record_history_detail_filter5">아이템 빌드</div>
                                    </div>
                                    <div className="record_history_detail_box actived" >
                                        <div className="record_history_detail_rank" >1</div>
                                        <img className="record_history_detail_cha" src="img/rank/재키.jpg" />
                                        <div className="record_history_detail_box1">
                                            <div className="record_history_detail_name" >에미디</div>
                                            <div className="record_history_detail_tier" >Gold 4 27LP</div>
                                        </div>
                                        <div className="record_history_detail_box2">
                                            <div className="record_history_detail_kill" >1 K / 1 A</div>
                                            <div className="record_history_detail_dmg_graph1" >
                                                <div className="record_history_detail_dmg_graph2"></div>
                                                <div className="record_history_detail_dmg" >35074</div>
                                            </div>
                                        </div>
                                         <div className="record_history_detail_death" >준돌리스</div>
                                        <div className="record_history_detail_itembox">
                                            <div className="record_history_detail_item">
                                                <img className="record_history_detail_item1" src="img/item/BackGround/영웅.jpg" />
                                                <img className="record_history_detail_item2" src="img/item/AK-12.png" />
                                            </div>
                                            <div className="record_history_detail_item">
                                                <img className="record_history_detail_item1" src="img/item/BackGround/영웅.jpg" />
                                                <img className="record_history_detail_item2" src="img/item/AK-12.png" />
                                            </div>
                                            <div className="record_history_detail_item">
                                                <img className="record_history_detail_item1" src="img/item/BackGround/영웅.jpg" />
                                                <img className="record_history_detail_item2" src="img/item/AK-12.png" />
                                            </div>
                                            <div className="record_history_detail_item">
                                                <img className="record_history_detail_item1" src="img/item/BackGround/영웅.jpg" />
                                                <img className="record_history_detail_item2" src="img/item/AK-12.png" />
                                            </div>
                                            <div className="record_history_detail_item">
                                                <img className="record_history_detail_item1" src="img/item/BackGround/영웅.jpg" />
                                                <img className="record_history_detail_item2" src="img/item/AK-12.png" />
                                            </div>
                                            <div className="record_history_detail_item">
                                                <img className="record_history_detail_item1" src="img/item/BackGround/영웅.jpg" />
                                                <img className="record_history_detail_item2" src="img/item/AK-12.png" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="record_history_detail_box" >
                                        <div className="record_history_detail_rank" >1</div>
                                        <img className="record_history_detail_cha" src="img/rank/재키.jpg" />
                                        <div className="record_history_detail_box1">
                                            <div className="record_history_detail_name" >에미디</div>
                                            <div className="record_history_detail_tier" >Gold 4 27LP</div>
                                        </div>
                                        <div className="record_history_detail_box2">
                                            <div className="record_history_detail_kill" >1 K / 1 A</div>
                                            <div className="record_history_detail_dmg_graph1" >
                                                <div className="record_history_detail_dmg_graph2"></div>
                                                <div className="record_history_detail_dmg" >35074</div>
                                            </div>
                                        </div>
                                         <div className="record_history_detail_death" >준돌리스</div>
                                        <div className="record_history_detail_itembox">
                                            <div className="record_history_detail_item">
                                                <img className="record_history_detail_item1" src="img/item/BackGround/영웅.jpg" />
                                                <img className="record_history_detail_item2" src="img/item/AK-12.png" />
                                            </div>
                                            <div className="record_history_detail_item">
                                                <img className="record_history_detail_item1" src="img/item/BackGround/영웅.jpg" />
                                                <img className="record_history_detail_item2" src="img/item/AK-12.png" />
                                            </div>
                                            <div className="record_history_detail_item">
                                                <img className="record_history_detail_item1" src="img/item/BackGround/영웅.jpg" />
                                                <img className="record_history_detail_item2" src="img/item/AK-12.png" />
                                            </div>
                                            <div className="record_history_detail_item">
                                                <img className="record_history_detail_item1" src="img/item/BackGround/영웅.jpg" />
                                                <img className="record_history_detail_item2" src="img/item/AK-12.png" />
                                            </div>
                                            <div className="record_history_detail_item">
                                                <img className="record_history_detail_item1" src="img/item/BackGround/영웅.jpg" />
                                                <img className="record_history_detail_item2" src="img/item/AK-12.png" />
                                            </div>
                                            <div className="record_history_detail_item">
                                                <img className="record_history_detail_item1" src="img/item/BackGround/영웅.jpg" />
                                                <img className="record_history_detail_item2" src="img/item/AK-12.png" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <button className="record_history_button">더 보기</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    };
}

export default injectIntl(Match);