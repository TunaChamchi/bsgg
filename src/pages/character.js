import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import queryString from 'query-string';
import { Header, SubBanner, Footer } from 'components/banner'
import { getCharacter, getItem, getWeaponType, addJson, getSkill } from 'lib/data'

class Character extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStartLoad: false,
            isUserLoad: true,
            isReNew: false,
            matchMode: 1, 
            teamMode: 0,
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
        this.setState({ isStartLoad: true })
    }

    componentDidUpdate(prevProps, prevState) {
        const { location } = this.props;
        const query = queryString.parse(location.search);

        this.fetchHandler(query, prevState)
    }

    fetchHandler = async (query, prevState) => {
        const { isReNew, user } = this.state;
        const userName  = query.userName || '';
        //console.log('fetchHandler', query, prevState.userName, prevState.matchCond);

        if (userName !== this.state.userName
            || (isReNew !== prevState.isReNew && isReNew === false)) { // 유저 검색, 첫 로딩, 재 갱신
            //console.log(query, prevState.matchCond, this.state.matchCond);
            let _user;
            let _userStat;
            
            await fetch('/api/User/'+userName)
                .then(res => res.json())
                .then(res => { _user = res['user']; _userStat = res['userStat']; });

            if (!_user && !_userStat) {
                console.log('!_user && !_userStat');
                this.setState({ userName: userName, user: null, userStat: null, isUserLoad: false });
                return;
            } else if (!_userStat) {
                console.log('!_userStat');
                this.setState({ userName: userName, user: _user, userStat: null, isUserLoad: false });
                return;
            }

            let maxMmr = 0;
            Object.keys(_userStat['seasonStats'][1]).forEach(t => 
                maxMmr = Math.max(maxMmr, _userStat['seasonStats'][1][t]['mmr'])
            )
            _userStat['maxMmr'] = maxMmr;

            this.setState({ 
                user: _user, userName: userName,
                userStat: _userStat, isUserLoad: false
            });
        } else if (isReNew !== prevState.isReNew && isReNew === true) { // 전적 갱신
            await fetch('/api/User/'+user['nickname']+'/renew')
                .then(res => res.json())
                .then(res => this.setState({ isReNew: false }) );
        }
    }

    
    topView = () => {
        const { intl } = this.props;
        const { user, userStat, tierList, isReNew } = this.state;

        const tier = Math.floor(userStat['maxMmr']/100);
        const win =   userStat['top1']       < 25 ?   ''     : userStat['top1'] < 50   ? '승1' : 
                      userStat['top1']       < 100 ?  '승2'  : userStat['top1'] < 250  ? '승3' : 
                      userStat['top1']       < 500 ?  '승4'  : userStat['top1'] < 1000 ? '승5' : 
                      userStat['top1']       < 3000 ? '승6'  : '승7';
        const total = userStat['totalGames'] < 200 ?   ''    : userStat['totalGames'] < 400  ? '판1' : 
                      userStat['totalGames'] < 800 ?   '판2' : userStat['totalGames'] < 2000 ? '판3' : 
                      userStat['totalGames'] < 4000 ?  '판4' : userStat['totalGames'] < 8000 ? '판5' : 
                      userStat['totalGames'] < 25000 ? '판6' : '판7';
        const kill =  userStat['totalKills'] < 500 ?   ''    : userStat['totalKills'] < 1000  ? '킬1' : 
                      userStat['totalKills'] < 2000 ?  '킬2' : userStat['totalKills'] < 5000  ? '킬3' : 
                      userStat['totalKills'] < 10000 ? '킬4' : userStat['totalKills'] < 20000 ? '킬5' : 
                      userStat['totalKills'] < 50000 ? '킬6' : '킬7';
        const top3 =  userStat['top3']       < 75 ?    ''    : userStat['top3'] < 150  ? '탑1' : 
                      userStat['top3']       < 300 ?   '탑2' : userStat['top3'] < 750  ? '탑3' : 
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
                    {
                        isReNew ?
                            <button className="record_top_renew">
                                <div id="loading"></div>
                            </button>
                            :
                            <button className="record_top_renew"
                                onClick={(e) => this.setState({ isReNew: true })}>
                                {intl.formatMessage({id: "전적갱신" })}
                            </button> 
                    }
                    <span className="record_top_updated">{intl.formatMessage({id: "최근 업데이트" })} {user['updateDate']}</span>
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
    topView2 = () => {
        const { intl } = this.props;
        const { user, tierList, isReNew } = this.state;

        return (
            <div className="record_top">
                <div className="record_top_icon">
                    <img className="record_top_iconimg" src={''} />
                    <img className="record_top_iconborder" src={''} />
                    <span className="record_top_lv"></span>
                </div>
                <div className="record_top_right">
                    <div className="record_top_name">{user['nickname']}</div>
                    {
                        isReNew ?
                            <button className="record_top_renew">
                                <div id="loading"></div>
                            </button>
                            :
                            <button className="record_top_renew"
                                onClick={(e) => this.setState({ isReNew: true })}>
                                {intl.formatMessage({id: "전적갱신" })}
                            </button> 
                    }
                    <span className="record_top_updated">{intl.formatMessage({id: "최근 업데이트" })} {user['updateDate']}</span>
                </div>
            </div>
        )
    }
    
    characterSeasonTab = () => {
        const { intl } = this.props;
        const { matchMode, matchingMode } = this.state;
        return matchingMode.map((key, idx) => 
            <div className={"record_cha0_tab"+(matchMode===idx?' actived':'')}  key={'record_cha0_tab_'+idx}
                onClick={(e) => this.setState({ matchMode:idx })}>
                {intl.formatMessage({id: key})}
            </div>
        )
    }
    characterTeamModeTab = () => {
        const { intl } = this.props;
        const { teamMode, matchingTeamMode } = this.state;
        return matchingTeamMode.map((key, idx) => 
            <div className={"record_cha_tab1"+(teamMode===idx?' actived':'')}  key={'record_cha_tab1_'+idx}
                onClick={(e) => this.setState({ teamMode:idx })}>
                {intl.formatMessage({id: key})}
            </div>
        )
    }

    characterTableView = () => {
        const { userStat, matchMode, teamMode } = this.state;

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

        return list.sort((l1, l2) => l2['totalGames']-l1['totalGames']).map((char, idx) => {
            const top1  = char['top1'];
            const top3  = char['top3'] - char['top1'];
            
            const top1Width = top1/char['totalGames'] *100;
            const top3Width = top3/char['totalGames'] *100;

            const kam = (char['totalKills']+char['totalAssistants'])/char['totalGames'];
            const kamSytle = kam >= 4 ? '3' : kam >= 3 ? '2' : '1';
            return (
                <div className="record_cha_box" key={"record_cha_box_"+idx}>
                    <div className="record_cha_span1">{idx+1}</div>
                    <img className="record_cha_img" src={"img/Rank/"+getCharacter(char['code'])['name']+".jpg"} />
                    <div className="record_cha_span2">{getCharacter(char['code'])['name']}</div>
                    <div className="record_cha_span3">{char['totalGames']}</div>
                    <div className="record_cha_graph" 
                        style={{background: 'linear-gradient(to right, rgb(244,216,35) 0% '+top1Width+'%, rgb(49, 106, 190) '+top1Width+'% '+top3Width+'%, gray '+top3Width+'% 100%)'}}>
                        <div className="record_cha_span4">{top1}</div>
                        <div className="record_cha_span5">{top3}</div>
                        <div className="record_cha_span6">{char['totalGames'] - char['top3']}</div>
                    </div>
                    <div className="record_cha_span7">{Math.round(top1/char['totalGames']*100)}%</div>
                    <div className="record_cha_span8"><span className={"record_history_kda"+kamSytle}>{kam.toFixed(1)}</span></div>
                    <div className="record_cha_span9">{char['maxKill']}</div>
                    <div className="record_cha_span11">{(char['totalMonsterKills']/char['totalGames']).toFixed(1)}</div>
                </div>
            )
        })
    }

    render() {
        const { intl } = this.props;
        const { isUserLoad, user, userStat } = this.state;

        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.Map'}),
        }

        return (
            <div>
                <Header data={metaData}/>
                <SubBanner />
                {
                    isUserLoad ? 
                        <div className="Loading_main">
                            <div id="loading_animation"></div>
                            <div className="Loading_main_span">{intl.formatMessage({id: '로딩'})}</div>
                        </div>
                        :
                        !user ? 
                            <div className="Loading_main">
                                <div className="Loading_main_span">{intl.formatMessage({id: '없음'})}</div>
                            </div>
                            :
                            !userStat ?
                                <div>
                                    {this.topView2()}                                
                                    <div className="Loading_main">
                                        <div className="Loading_main_span">{intl.formatMessage({id: '전적없음'})}</div>
                                    </div>
                                </div>
                                :
                                <div>
                                    {this.topView()}
                                    <div className="record_main">
                                        <div className="record_cha">
                                            <div className="record_cha0">
                                                <span className="record_cha0_span">Character</span>
                                                <div className="record_cha0_tabs">
                                                    {this.characterSeasonTab()}
                                                </div>
                                            </div>
                                            <div className="record_cha_tabs">
                                                {this.characterTeamModeTab()}
                                            </div>
                                            <div className="record_cha_filter">
                                                <div className="record_cha_filter1">#</div>
                                                <div className="record_cha_filter2">캐릭터</div>
                                                <div className="record_cha_filter3">게임수</div>
                                                <div className="record_cha_filter4 actived">우승</div>
                                                <div className="record_cha_filter5">승률</div>
                                                <div className="record_cha_filter6">KDA</div>
                                                <div className="record_cha_filter7">최다킬</div>
                                                <div className="record_cha_filter9">CS</div>
                                            </div>
                                            {this.characterTableView()}
                                        </div>
                                    </div>
                                </div>
                }
                <Footer />
            </div>
        );
    };
}

export default injectIntl(Character);