import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import ScriptTag from 'react-script-tag';
import { Header, SubBanner, Footer } from 'components/banner'

class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectMap: '',
        };
    }

    componentDidMount() {
        console.log('componentDidMount');  
        fetch('/users')
            .then(res => res.json())
            .then(users => this.setState({ users }));
    }

    onClick = (e, selectMap) => {
        this.setState({selectMap: selectMap});
    }

    render() {
        const { intl } = this.props;
        const { users } = this.state;

        console.log('users', users);

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
                        <img className="record_top_iconborder" src="img/border/Eternity.png" />
                        <span className="record_top_lv">50</span>
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
                    <img className="record_top_medal" src="img/medal/승7.png" />
                    <img className="record_top_medal" src="img/medal/킬5.png" />
                    <img className="record_top_medal" src="img/medal/탑4.png" />
                    <img className="record_top_medal" src="img/medal/판6.png" />
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
                            <div className="record_history_box">
                                <div className="record_history_win"></div>
                                <div className="record_history1">
                                    <div className="record_history_rank_win">1</div>
                                    <div className="record_history_filter">랭크/솔로</div>
                                    <div className="record_history_date">2일 전</div>
                                </div>
                                <div className="record_history2">
                                    <img className="record_history_img" src="img/rank/재키.jpg" />
                                    <img className="record_history_weapon" src="img/weapons/단검.jpg" />
                                    <div className="record_history_name">아드리아나</div>
                                </div>
                                <div className="record_history3-4">
                                    <div className="record_history3">
                                        <div className="record_history_lv">레벨 17</div>
                                        <div className="record_history_mmr">1147</div>
                                        <img className="record_history_upmark" src="img/UpDown/상승.png"/>
                                        <div className="record_history_up">47</div>
                                    </div>
                                    <div className="record_history4">
                                    <div className="record_history_kda">
                                        <span className="record_history_kda1">2 K</span> <span> / </span>
                                        <span className="record_history_kda1">2 A</span> <span> / </span>
                                        <span className="record_history_kda1">33 CS</span>
                                    </div>
                                        <div>
                                            <img className="record_history_badge" src="img/Badge/더헌터.png"/>
                                            <img className="record_history_badge" src="img/Badge/부쉬그라운드.png"/>
                                            <img className="record_history_badge" src="img/Badge/루미아트럭.png"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="record_history_item_box">
                                    <div className="record_history_item">
                                        <img className="record_history_item1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="record_history_item2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="record_history_item">
                                        <img className="record_history_item1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="record_history_item2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="record_history_item">
                                        <img className="record_history_item1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="record_history_item2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="record_history_item">
                                        <img className="record_history_item1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="record_history_item2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="record_history_item">
                                        <img className="record_history_item1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="record_history_item2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="record_history_item">
                                        <img className="record_history_item1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="record_history_item2" src="img/item/AK-12.png" />
                                    </div>
                                </div>
                                <img className="record_history_detailbutton" src="img/downlogo.png" />
                            </div>
                            <div className="record_history_box">
                                <div className="record_history_top"></div>
                                <div className="record_history1">
                                    <div className="record_history_rank_top">3</div>
                                    <div className="record_history_filter">랭크/듀오</div>
                                    <div className="record_history_date">2일 전</div>
                                </div>
                                <div className="record_history2">
                                    <img className="record_history_img" src="img/rank/재키.jpg" />
                                    <img className="record_history_weapon" src="img/weapons/단검.jpg" />
                                    <div className="record_history_name">아드리아나</div>
                                </div>
                                <div className="record_history3-4">
                                    <div className="record_history3">
                                        <div className="record_history_lv">레벨 17</div>
                                        <div className="record_history_mmr">1147</div>
                                        <img className="record_history_upmark" src="img/UpDown/상승.png"/>
                                        <div className="record_history_up">47</div>
                                    </div>
                                    <div className="record_history_kda">
                                        <span className="record_history_kda2">2 K</span> <span> / </span>
                                        <span className="record_history_kda2">2 A</span> <span> / </span>
                                        <span className="record_history_kda2">33 CS</span>
                                    </div>
                                </div>
                                <div className="record_history_item_box">
                                    <div className="record_history_item">
                                        <img className="record_history_item1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="record_history_item2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="record_history_item">
                                        <img className="record_history_item1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="record_history_item2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="record_history_item">
                                        <img className="record_history_item1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="record_history_item2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="record_history_item">
                                        <img className="record_history_item1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="record_history_item2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="record_history_item">
                                        <img className="record_history_item1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="record_history_item2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="record_history_item">
                                        <img className="record_history_item1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="record_history_item2" src="img/item/AK-12.png" />
                                    </div>
                                </div>
                                <img className="record_history_detailbutton" src="img/downlogo.png" />
                            </div>
                            <div className="record_history_box">
                                <div className="record_history_loss"></div>
                                <div className="record_history1">
                                    <div className="record_history_rank_loss">11</div>
                                    <div className="record_history_filter">일반/스쿼드</div>
                                    <div className="record_history_date">2일 전</div>
                                </div>
                                <div className="record_history2">
                                    <img className="record_history_img" src="img/rank/재키.jpg" />
                                    <img className="record_history_weapon" src="img/weapons/단검.jpg" />
                                    <div className="record_history_name">아드리아나</div>
                                </div>
                                <div className="record_history3-4">
                                    <div className="record_history3">
                                        <div className="record_history_lv">레벨 17</div>
                                        <div className="record_history_mmr">1147</div>
                                        <img className="record_history_upmark" src="img/UpDown/하락.png"/>
                                        <div className="record_history_down">47</div>
                                    </div>
                                    <div className="record_history4">
                                        <div className="record_history_kda">
                                            <span className="record_history_kda3">2 K</span> <span> / </span>
                                            <span className="record_history_kda3">2 A</span> <span> / </span>
                                            <span className="record_history_kda3">33 CS</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="record_history_item_box">
                                    <div className="record_history_item">
                                        <img className="record_history_item1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="record_history_item2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="record_history_item">
                                        <img className="record_history_item1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="record_history_item2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="record_history_item">
                                        <img className="record_history_item1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="record_history_item2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="record_history_item">
                                        <img className="record_history_item1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="record_history_item2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="record_history_item">
                                        <img className="record_history_item1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="record_history_item2" src="img/item/AK-12.png" />
                                    </div>
                                    <div className="record_history_item">
                                        <img className="record_history_item1" src="img/item/BackGround/영웅.jpg" />
                                        <img className="record_history_item2" src="img/item/AK-12.png" />
                                    </div>
                                </div>
                                <img className="record_history_detailbutton" src="img/uplogo.png" />
                            </div>
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
                <ScriptTag src="//t1.daumcdn.net/kas/static/ba.min.js" async />
            </div>
        );
    };
}

export default injectIntl(Match);