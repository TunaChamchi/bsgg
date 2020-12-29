import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import queryString from 'query-string';
import { Header, SubBanner, Footer } from 'components/banner'
import { getCharacter, getItem, getWeaponType, addJson } from 'lib/data'

class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            skip:0,
            matchList: [],
            matchCond: { matchMode: 0, teamMode: 0, },
            mostCond: { matchMode: 0, teamMode: 0, },
            matchingMode: ['전체', '랭크'],
            matchingTeamMode: ['전체', 'solo', 'duo', 'squad'],
            tierList: ['Iron 4', 'Iron 3', 'Iron 2', 'Iron 1', 'Bronze 4', 'Bronze 3','Bronze 2', 'Bronze 1',
                    'Silver 4', 'Silver 3', 'Silver 2', 'Silver 1', 'Gold 4', 'Gold 3','Gold 2', 'Gold 1',
                    'Platinum 4', 'Platinum 3', 'Platinum 2', 'Platinum 1', 'Diamond 4', 'Diamond 3','Diamond 2', 'Diamond 1',
                    'Demigod 4', 'Demigod 3', 'Demigod 2', 'Demigod 1', 'Eternity 4', 'Eternity 3','Eternity 2', 'Eternity 1']
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.setState({ isLoad: true })
    }

    componentDidUpdate(prevProps, prevState) {
        const { location } = this.props;
        const query = queryString.parse(location.search);

        this.fetchHandler(query, prevState)
    }

    fetchHandler = async (query, prevState) => {
        const { skip, user, matchStat, matchList, matchCond } = this.state;
        const userName  = query.userName || 'イドヒョン';
        const matchMode = parseInt(query.matchMode) || 0;
        const teamMode  = parseInt(query.teamMode) || 0;
        //console.log('fetchHandler', query, prevState.userName, prevState.matchCond);

        if (userName !== this.state.userName
            || matchMode !== matchCond.matchMode 
            || teamMode !== matchCond.teamMode) { // 유저 검색, 첫 로딩
            console.log(query, prevState.matchCond, this.state.matchCond);
            let _user;
            let _userStat;
            let _matchList;
            
            await fetch('/api/User/'+userName)
                .then(res => res.json())
                .then(res => { _user = res['user']; _userStat = res['userStat']; });
            
            await fetch('/api/User/'+_user['userNum']+'/match?limit=20&'+
                    'matchMode='+matchMode+'&teamMode='+teamMode)
                .then(res => res.json())
                .then(res => _matchList = res);

            // 최근 20전
            const _matchStat = {
                total:0,
                playerKill:0,
                playerAssistant:0,
                gameRank:0,
                top1:0,
                top3:0,
                charStat:{},
            }
            _matchList.forEach(m => {
                _matchStat['playerKill'] += m['playerKill'];
                _matchStat['playerAssistant'] += m['playerAssistant'];
                _matchStat['gameRank'] += m['gameRank'];
                _matchStat['top1'] += m['gameRank'] === 1 ? 1 : 0;
                _matchStat['top3'] += m['gameRank'] < 4 ? 1 : 0;
                _matchStat['total']++;

                if (_matchStat['charStat'][m['characterNum']] === undefined) {
                    _matchStat['charStat'][m['characterNum']] = {
                        total:0,
                        ka:0,
                        top1:0,
                    }
                }
                _matchStat['charStat'][m['characterNum']]['ka'] += m['playerKill']+m['playerAssistant'];
                _matchStat['charStat'][m['characterNum']]['top1'] += m['gameRank'] === 1 ? 1 : 0;
                _matchStat['charStat'][m['characterNum']]['total']++;
            })
            _matchStat['playerKill'] /= _matchStat['total'];
            _matchStat['playerAssistant'] /= _matchStat['total'];
            _matchStat['gameRank'] /= _matchStat['total'];

            const mmrCurrent = {
                0: { 1: 0, 2: 0, 3: 0, },
                1: { 1: 0, 2: 0, 3: 0, },
            }
            let maxMmr = 0;
            Object.keys(_userStat['seasonStats']).forEach(s => 
                Object.keys(_userStat['seasonStats'][s]).forEach(t => {
                    if (s !== 0) {
                        maxMmr = Math.max(maxMmr, _userStat['seasonStats'][s][t]['mmr']);
                    }
                    mmrCurrent[s][t] = _userStat['seasonStats'][s][t]['mmr'];
                })
            );
            _userStat['maxMmr'] = maxMmr;
            this.setState({ 
                user:_user, userName:userName,
                matchCond: { matchMode:matchMode, teamMode: teamMode },
                userStat:_userStat, matchList:_matchList, 
                matchStat:_matchStat, mmrCurrent:mmrCurrent 
            });
        } else if (skip !== prevState.skip) { // 더보기 클릭시
            let _matchList;

            await fetch('/api/User/'+user['userNum']+'/match?limit=20&skip='+skip)
                .then(res => res.json())
                .then(res => _matchList = res);

            matchList.push(..._matchList);
            // 최근 전적
            _matchList.forEach(m => {
                matchStat['playerKill'] += m['playerKill'];
                matchStat['playerAssistant'] += m['playerAssistant'];
                matchStat['gameRank'] += m['gameRank'];
                matchStat['top1'] += m['gameRank'] === 1 ? 1 : 0;
                matchStat['top3'] += m['gameRank'] < 4 ? 1 : 0;
                matchStat['total']++;

                if (matchStat['charStat'][m['characterNum']] === undefined) {
                    matchStat['charStat'][m['characterNum']] = {
                        total:0,
                        ka:0,
                        top1:0,
                    }
                }
                matchStat['charStat'][m['characterNum']]['ka'] += m['playerKill']+m['playerAssistant'];
                matchStat['charStat'][m['characterNum']]['top1'] += m['gameRank'] === 1 ? 1 : 0;
                matchStat['charStat'][m['characterNum']]['total']++;
            })
            matchStat['playerKill'] /= matchStat['total'];
            matchStat['playerAssistant'] /= matchStat['total'];
            matchStat['gameRank'] /= matchStat['total'];

            this.setState({ 
                matchList:matchList, matchStat:matchStat
            });
        }
    }

    setStateHandle (key, value) {
        console.log(key, value);
        this.setState({ [key]: value });
    }

    topView() {
        const { intl } = this.props;
        const { user, userStat, tierList } = this.state;

        const tier = Math.floor(userStat['maxMmr']/100);
        const win =   userStat['top1']       < 25 ?   ''    : userStat['top1'] < 50 ? '승1' : 
                      userStat['top1']       < 100 ?  '승2' : userStat['top1'] < 250 ? '승3' : 
                      userStat['top1']       < 500 ?  '승4' : userStat['top1'] < 1000 ? '승5' : 
                      userStat['top1']       < 3000 ? '승6' : '승7';
        const total = userStat['totalGames'] < 200 ?   ''    : userStat['totalGames'] < 400 ? '판1' : 
                      userStat['totalGames'] < 800 ?  ' 판2' : userStat['totalGames'] < 2000 ? '판3' : 
                      userStat['totalGames'] < 4000 ?  '판4' : userStat['totalGames'] < 8000 ? '판5' : 
                      userStat['totalGames'] < 25000 ? '판6' : '판7';
        const kill =  userStat['totalKills'] < 500 ?   ''    : userStat['totalKills'] < 1000 ? '킬1' : 
                      userStat['totalKills'] < 2000 ?  '킬2' : userStat['totalKills'] < 5000 ? '킬3' : 
                      userStat['totalKills'] < 10000 ?  '킬4' : userStat['totalKills'] < 20000 ? '킬5' : 
                      userStat['totalKills'] < 50000 ? '킬6' : '킬7';
        const top3 =  userStat['top3']       < 75 ?    ''    : userStat['top3'] < 150 ? '탑1' : 
                      userStat['top3']       < 300 ?   '탑2' : userStat['top3'] < 750 ? '탑3' : 
                      userStat['top3']       < 1500 ?  '탑4' : userStat['top3'] < 3000 ? '탑5' : 
                      userStat['top3']       < 10000 ? '탑6' : '탑7';
        
        return (
            <div className="record_top">
                <div className="record_top_icon">
                    <img className="record_top_iconimg" src={"img/Characters/" + getCharacter(userStat['mostCharacter'])['name'] + ".jpg"} />
                    <img className="record_top_iconborder" src={"img/border/" + tierList[tier].slice(0, -2) + ".png"} />
                    <span className="record_top_lv">{4-tier%4}</span>
                </div>
                <div className="record_top_right">
                    <div className="record_top_name">{user['nickname']}</div>
                    <button className="record_top_renew">전적갱신</button>
                    <span className="record_top_updated">최근 업데이트 {user['updateDate']}</span>
                </div>
                {top3&&
                    <div className="record_top_medal_box">
                        <img className="record_top_medal" src={"img/medal/"+top3+".png"} />
                        <div className="medal_span_tooltip"><span>{intl.formatMessage({id: 'badge.'+top3 })}</span></div>
                    </div>}
                {kill&&
                    <div className="record_top_medal_box">
                        <img className="record_top_medal" src={"img/medal/"+kill+".png"} />
                        <div className="medal_span_tooltip"><span>{intl.formatMessage({id: 'badge.'+kill })}</span></div>
                    </div>}
                {total&& 
                    <div className="record_top_medal_box">
                        <img className="record_top_medal" src={"img/medal/"+total+".png"} />
                        <div className="medal_span_tooltip"><span>{intl.formatMessage({id: 'badge.'+total })}</span></div>
                    </div>}
                {win&&
                    <div className="record_top_medal_box">
                        <img className="record_top_medal" src={"img/medal/"+win+".png"} />
                        <div className="medal_span_tooltip"><span>{intl.formatMessage({id: 'badge.'+win })}</span></div>
                    </div>}
            </div>
        )
    }

    rankView() {
        const { intl } = this.props;
        const { user, userStat, tierList, matchingTeamMode } = this.state;

        return Object.keys(userStat['seasonStats']["1"]).map((keys, idx) => {
            const rank = userStat['seasonStats']["1"][keys];

            const total = rank['totalGames'];
            const top1 = rank['top1'];
            const kdm = (rank['totalKills'] + rank['totalAssistants']) / total
            const tier = Math.floor(rank['mmr']/100);
            const lp   = rank['mmr']-tier*100;

            const teamMode = intl.formatMessage({id: matchingTeamMode[keys] });

            return (
                <div className="record_rank_box" key={"rank_box_"+idx}>
                    <img className="record_rank_icon" src={"img/rankicon/"+tierList[tier].slice(0, -2)+".png"} />
                    <div className="record_rank_span1">{teamMode}</div>
                    <div className="record_rank_span2">{tierList[tier]} / {lp} LP</div>
                    <div className="record_rank_span3">{total}전 {top1}승 {(top1/total*100).toFixed(1)}% / {kdm.toFixed(1)} K/M</div>
                    <div className="record_rank_span4">3112위 / 상위 6.8%</div>
                    <div className="record_rank_graph" style={{width: lp*3.5}}></div>
                </div>
            )
        })
    }

    mostSeasonTab () {
        const { intl } = this.props;
        const { mostCond, matchingMode } = this.state;
        return matchingMode.map((key, idx) => 
            <div className={"record_most_tab1"+(mostCond.matchMode===idx?' actived':'')} key={'most_tab1_'+idx}
                onClick={(e) => this.setState({mostCond: {...mostCond, matchMode: idx}}) }>
                {intl.formatMessage({id: key})}
            </div>
        )
    }
    mostTeamModeTab () {
        const { intl } = this.props;
        const { mostCond, matchingTeamMode } = this.state;
        return matchingTeamMode.map((key, idx) => 
            <div className={"record_most_tab2"+(mostCond.teamMode===idx?' actived':'')} key={'most_tab2_'+idx}
                onClick={(e) => this.setState({mostCond: {...mostCond, teamMode: idx}}) }>
                {intl.formatMessage({id: key})}
            </div>
        )
    }
    mostCharacterView() {
        const { intl } = this.props;
        const { userStat, mostCond } = this.state;
        const matchMode = mostCond.matchMode;
        const teamMode = mostCond.teamMode;

        const list = [];
        const characterStat = {};
        if (matchMode === 0 && teamMode === 0) { // 전체의 전체
            [0, 1].forEach(i => {
                if (userStat['seasonStats'][i]) {
                    [1, 2, 3].forEach(j => {
                        if (userStat['seasonStats'][i][j]) {
                            for (const key in userStat['seasonStats'][i][j]['characterStats']) {
                                if (characterStat[key]) {
                                    addJson(characterStat[key], userStat['seasonStats'][i][j]['characterStats'][key]);
                                } else {
                                    characterStat[key] = {...userStat['seasonStats'][i][j]['characterStats'][key]};
                                }
                            }
                        }
                    })
                }
            })
            for (const key in characterStat) {
                list.push({ code: key, ...characterStat[key] });
            }
        } else if (matchMode === 0) { // 전체의 솔로, 듀오, 스쿼드
            [0, 1].forEach(i => {
                if (userStat['seasonStats'][i] && userStat['seasonStats'][i][teamMode]) {
                    for (const key in userStat['seasonStats'][i][teamMode]['characterStats']) {
                        if (characterStat[key]) {
                            addJson(characterStat[key], userStat['seasonStats'][i][teamMode]['characterStats'][key]);
                        } else {
                            characterStat[key] = {...userStat['seasonStats'][i][teamMode]['characterStats'][key]};;
                        }
                    }
                }
            })
            for (const key in characterStat) {
                list.push({ code: key, ...characterStat[key] });
            }
        } else if (teamMode === 0) { // 랭크의 전체
            for (const key in userStat['characterStats']) {
                list.push({ code: key, ...userStat['characterStats'][key] });
            }
        } else { // 랭크의 솔로, 듀오, 스쿼드
            if (userStat['seasonStats'][1] && userStat['seasonStats'][1][teamMode]) {
                for (const key in userStat['seasonStats'][1][teamMode]['characterStats']) {
                    list.push({ code: key, ...userStat['seasonStats'][1][teamMode]['characterStats'][key] });
                }
            }
        }

        return list.sort((l1, l2) => l2['totalGames']-l1['totalGames']).slice(0,5).map((char, idx) => {
            const kam = (char['totalKills']+char['totalAssistants'])/char['totalGames'];
            const kamSytle = kam >= 4 ? '3' : kam >= 3 ? '2' : '1';
            return (
                <div className="record_most_box" key={"most_box_"+idx}>
                    <img className="record_most_img" src={"img/Rank/"+getCharacter(char['code'])['name']+".jpg"} />
                    <div className="record_most_span">
                        <div className="record_most_span1">{getCharacter(char['code'])['name']}</div>
                        <div className="record_most_span2">승률 {(char['top1']/char['totalGames']*100).toFixed(1)}%</div>
                        <div className="record_most_span3"> 
                            <span className={"record_history_kda"+kamSytle}>{kam.toFixed(1)} KA/M</span>
                        </div>
                        <div className="record_most_span4">{char['totalGames']}게임</div>
                    </div>
                </div>
            )
        })
    }

    matchModeSeasonTab () {
        const { intl } = this.props;
        const { userName, matchCond, matchingMode } = this.state;
        return matchingMode.map((key, idx) => 
            <Link to={'/Match?userName='+userName+'&matchMode='+idx+'&teamMode='+matchCond.teamMode} key={'match0_tab_'+idx}>
                <div className={"record_match0_tab"+(matchCond.matchMode===idx?' actived':'')} >{intl.formatMessage({id: key})}</div>
            </Link>
        )
    }
    matchModeTeamModeTab () {
        const { intl } = this.props;
        const { userName, matchCond, matchingTeamMode } = this.state;
        return matchingTeamMode.map((key, idx) => 
            <Link to={'/Match?userName='+userName+'&matchMode='+matchCond.matchMode+'&teamMode='+idx} key={'match_tab2_'+idx}>
                <div className={"record_match_tab2"+(matchCond.teamMode===idx?' actived':'')} >{intl.formatMessage({id: key})}</div>
            </Link>
        )        
    }
    recentHistory() {
        const { intl } = this.props;
        const { matchStat } = this.state;

        const top1Rate = matchStat['top1']/matchStat['total']*100;
        const top3Rate = matchStat['top3']/matchStat['total']*100;

        const kam = matchStat['playerKill']+matchStat['playerAssistant'];
        const kamSytle = kam >= 4 ? '3' : kam >= 3 ? '2' : '1';

        return (
            <div className="record_trend">
                <div className="record_trend_winrate"></div>
                    <div className="record_trend_winrate_graph"
                            style={{ background: 'conic-gradient(rgb(244,216,35) 0% '+top1Rate+'%, rgb(49, 106, 190) 0% '+top3Rate+'%, gray 0% 100%)' }}>
                        <div className="record_trend_winrate_graph2"></div>
                        <div className="record_trend_avg">{top1Rate.toFixed(1)}%</div>
                    </div>
                    <div className="record_trend_winrate_span">
                        <div className="record_trend_winrate_span1">승 {matchStat['top1']}</div>
                        <div className="record_trend_winrate_span2">탑3 {matchStat['top3']-matchStat['top1']}</div>
                        <div className="record_trend_winrate_span3">게임 {matchStat['total']}</div>
                    </div>
                <div className="record_trend_kda">
                    <div className="record_trend_kda1">
                        <span className={"record_history_kda"+kamSytle}>{kam.toFixed(1)} KA/M</span>
                    </div>
                    <div className="record_trend_kda2">{matchStat['playerKill'].toFixed(1)} / {matchStat['playerAssistant'].toFixed(1)} / {matchStat['total']}</div>
                </div>
                <div className="record_trend_win">
                    <div className="record_trend_winspan">{matchStat['top1']} win</div>
                    <div className="record_trend_winspan">#{matchStat['gameRank'].toFixed(1)}</div>
                </div>
            </div>
        );
    }
    recentHistoryCharacter() {
        const { intl } = this.props;
        const { matchStat } = this.state;

        const list = [];
        for (const key in matchStat['charStat']) {
            list.push({ code: key, ...matchStat['charStat'][key]});
        }
        return list.map((char, idx) => {
            return (
                <div className="record_trend_most" key={"trend_box_"+idx}>
                    <img className="record_trend_most_img" src={"img/rank/"+getCharacter(char['code'])['name']+".jpg"} />
                    <div className="record_trend_most_span">
                        <div className="record_trend_most_span1">{char['top1']}승 / {char['total']}게임 / {(char['top1']/char['total']*100).toFixed(1)}%</div>
                        <div className="record_trend_most_span2">{(char['ka']/char['total']).toFixed(1)} KA/M</div>
                    </div>
                </div>
            );
        });
    }

    matchHistoryView() {
        const { intl } = this.props;
        const { userStat, matchList, mmrCurrent, matchingTeamMode } = this.state;

        const mmrAfter = JSON.parse(JSON.stringify(mmrCurrent));
        return matchList.map((match, idx) => {
            const character = getCharacter(match['characterNum'])['name'];
            const weapon = match['bestWeapon'];

            const mmr = mmrAfter[match['seasonId']][match['matchingTeamMode']];
            const _mmr = mmrAfter[match['seasonId']][match['matchingTeamMode']] = match['mmrBefore'];

            const imgUpDown = mmr-_mmr > 0 ? 'img/UpDown/상승.png' : 'img/UpDown/하락.png';
            const seasonId = intl.formatMessage({id: match['seasonId'] ? '랭크' : '일반' });
            const teamMode = intl.formatMessage({id: matchingTeamMode[match['matchingTeamMode']] });

            const win = match['gameRank'] === 1 ? 'win' : match['gameRank'] < 4 ? 'top' : 'loss';
            const k = match['playerKill'] > 4 ? '3' : match['playerKill'] > 2 ? '2' : '1';
            const a = match['playerAssistant'] > 4 ? '3' : match['playerAssistant'] > 2 ? '2' : '1';
            const c = match['monsterKill'] > 50 ? '3' : match['monsterKill'] > 35 ? '2' : '1';

            return (
                <div className="record_history_box" key={'history_box'+idx}>
                    <div className={"record_history_"+win}></div>
                    <div className="record_history1">
                        <div className={"record_history_rank_"+win}>{match['gameRank']}</div>
                        <div className="record_history_filter">{seasonId}/{teamMode}</div>
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
                            <div className={"record_history_"+(mmr-_mmr>0?'up':'down')}>{Math.abs(mmr-_mmr)}</div>
                        </div>
                        <div className="record_history_kda">
                            <span className={"record_history_kda"+k}>{match['playerKill']} K</span> <span> / </span>
                            <span className={"record_history_kda"+a}>{match['playerAssistant']} A</span> <span> / </span>
                            <span className={"record_history_kda"+c}>{match['monsterKill']} CS</span>
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
    matchDetail() {

    }



    render() {
        const { intl } = this.props;
        const { user, userStat, tierList, matchCond, mostCond } = this.state;

        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.Map'}),
            description: '영원회귀 : 블랙 서바이벌 통계, 캐릭터 티어, 아이템 트렌드, BS:ER Stats, Character Tier, Item Trend'
        }

        if (!userStat) return '';

        return (
            <div>
                <Header data={metaData}/>
                <SubBanner />
                {this.topView()}
                <div className="record_main">
                    <div className="record_left">
                        <div className="record_rank">
                            <span className="record_rank0">RANK</span>
                            {this.rankView()}
                        </div>
                        <div className="record_most">
                            <span className="record_most0">MOST 5</span>
                            <div className="record_most_tabs">
                                {this.mostSeasonTab()}
                            </div>
                            <div className="record_most_tabs">
                                {this.mostTeamModeTab()}
                            </div>
                            {this.mostCharacterView()}
                            <button className="record_most_button">더 보기</button>
                        </div>
                    </div>
                    <div className="record_rigth">
                        <div className="record_match">
                            <div className="record_match0">
                                <span className="record_match0_span">Match History</span>
                                <div className="record_match0_tabs">
                                    {this.matchModeSeasonTab()}
                                </div>
                            </div>
                            <div className="record_most_tabs">
                                {this.matchModeTeamModeTab()}
                            </div>
                            {this.recentHistory()}
                            <div className="record_trend_most_box">
                                {this.recentHistoryCharacter()}
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