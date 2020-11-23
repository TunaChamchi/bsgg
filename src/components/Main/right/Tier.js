import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import CharList from 'data/character.json';
import tier1 from 'img/tier logo/TIER1.png';
import tier2 from 'img/tier logo/TIER2.png';
import tier3 from 'img/tier logo/TIER3.png';
import tier4 from 'img/tier logo/TIER4.png';
import tier5 from 'img/tier logo/TIER5.png';

import adriana_rank from 'img/rank logo/adriana rank.png';
import aya_rank from 'img/rank logo/aya rank.png';
import chiara_rank from 'img/rank logo/chiara rank.png';
import fiora_rank from 'img/rank logo/fiora rank.png';
import hart_rank from 'img/rank logo/hart rank.png';
import hyejin_rank from 'img/rank logo/hyejin rank.png';
import hyunwoo_rank from 'img/rank logo/hyunwoo rank.png';
import isol_rank from 'img/rank logo/isol rank.png';
import jackie_rank from 'img/rank logo/jackie rank.png';
import lidailin_rank from 'img/rank logo/lidailin rank.png';
import magnus_rank from 'img/rank logo/magnus rank.png';
import nadine_rank from 'img/rank logo/nadine rank.png';
import shoichi_rank from 'img/rank logo/shoichi rank.png';
import sissela_rank from 'img/rank logo/sissela rank.png';
import xiukai_rank from 'img/rank logo/xiukai rank.png';
import yuki_rank from 'img/rank logo/yuki rank.png';
import zahir_rank from 'img/rank logo/zahir rank.png';

import Smoke from 'img/weapone logo/Smoke.png';
import Pistol from 'img/weapone logo/Pistol.png';
import Rifle from 'img/weapone logo/Rifle.png';
import Sniper from 'img/weapone logo/Sniper.png';
import Rapier from 'img/weapone logo/Rapier.png';
import Spear from 'img/weapone logo/Spear.png';
import Sword from 'img/weapone logo/Sword.png';
import Guitar from 'img/weapone logo/Guitar.png';
import Arrow from 'img/weapone logo/Arrow.png';
import Tonfa from 'img/weapone logo/Tonfa.png';
import DualSword from 'img/weapone logo/DualSword.png';
import Knife from 'img/weapone logo/Knife.png';
import Nunchaku from 'img/weapone logo/Nunchaku.png';
import Bat from 'img/weapone logo/Bat.png';
import Crossbow from 'img/weapone logo/Crossbow.png';

class Tier extends Component {
	constructor(props) {
        super(props);
        this.state = {
            tierList: [],
            type: ['score-rank', 'win-rate', 'pick-rate', 'avg-kill', 'avg-rank'],
            typeFocus: 0,
            image_tier: {
                1: tier1,
                2: tier2,
                3: tier3,
                4: tier4,
                5: tier5,
            },
            image_character: {
                '아드리아나': adriana_rank,
                '아야': aya_rank,
                '키아라': chiara_rank,
                '피오라': fiora_rank,
                '하트': hart_rank,
                '혜진': hyejin_rank,
                '현우': hyunwoo_rank,
                '아이솔': isol_rank,
                '재키': jackie_rank,
                '리 다이린': lidailin_rank,
                '매그너스': magnus_rank,
                '나딘': nadine_rank,
                '쇼이치': shoichi_rank,
                '시셀라': sissela_rank,
                '쇼우': xiukai_rank,
                '유키': yuki_rank,
                '자히르': zahir_rank,
            },
            image_weapon: {
                '투척': Smoke,
                '권총': Pistol,
                '돌격소총': Rifle,
                '저격총': Sniper,
                '레이피어': Rapier,
                '창': Spear,
                '양손검': Sword,
                '기타': Guitar,
                '활': Arrow,
                '톤파': Tonfa,
                '쌍검': DualSword,
                '단검': Knife,
                '쌍절곤': Nunchaku,
                '배트': Bat,
                '석궁': Crossbow,            
            }
        };
    }
    
    componentDidMount() {
        this.init();
    };

    shouldComponentUpdate(nextProps, nextState) {
        const { range, type } = this.props;

        return this.state !== nextState || range !== nextProps.range || type !== nextProps.type;
    }

    componentDidUpdate(prevProps, prevState){
        const { range, type } = this.props;
        if (range !== prevProps.range || type !== prevProps.type) {
            this.init();
        }
    }

    init = () => {
        const { range, type } = this.props;

        const list = {};
        for (const key in CharList) {
            try {
            const data = CharList[key][range][type];

            list[key] = data;
            } catch {
                break;
            }
        }

        const tier = [];
        let max_score = 0;
        let max_win_rate = 0;
        let max_pick_rate = 0;
        let max_avg_kill = 0;
        let max_avg_rank = 0;

        // 값 가져오기
        for (const key1 in list) {
            for (const key2 in list[key1]) {
                const data = list[key1][key2];
                const value = {character:key1, weapon:key2, data:data};

                tier.push(value);
                if (data['win-rate'] > max_win_rate) max_win_rate = data['win-rate'];
                if (data['pick-rate'] > max_pick_rate) max_pick_rate = data['pick-rate'];
                if (data['avg-kill'] > max_avg_kill) max_avg_kill = data['avg-kill'];
            }
        }
        
        // 데이터 수정
        tier.forEach(data1 => {
            data1['win-rate']  = data1['data']['win-rate']/max_win_rate*100;
            data1['pick-rate'] = data1['data']['pick-rate']/max_pick_rate*100;
            data1['avg-kill']  = data1['data']['avg-kill']/max_avg_kill*100;
            data1['avg-rank']  = 1;
            tier.forEach(data2 => {
                if (data1['data']['avg-rank'] > data2['data']['avg-rank']) {
                    data1['avg-rank']++;

                    if (data1['avg-rank'] > max_avg_rank) max_avg_rank = data1['avg-rank'];
                }
            });
        });

        // 점수 계산
        tier.forEach(data => {
            data['avg-rank-score'] = (1-data['avg-rank']/max_avg_rank)*100;
            if (type === "solo")
                data['score'] = (data['win-rate'] + data['pick-rate'] + data['avg-kill'] + data['avg-rank-score']/2)/3.5;
            else if (type === "duo")
                data['score'] = (data['win-rate']*1.5 + data['pick-rate'] + data['avg-kill']/2 + data['avg-rank-score']/3)/4;
            else if (type === "squad")
                data['score'] = (data['win-rate']*2 + data['pick-rate'] + data['avg-kill']/3 + data['avg-rank-score']/4)/4.5;
            
            if (data['score'] > max_score) max_score = data['score'];
        });

        // 티어, 순위 계산
        tier.forEach(data1 => {
            const tier_score = data1['score']/max_score;
            if (tier_score > 0.9) {
                data1['tier'] = 1;
            } else if (tier_score > 0.7) {
                data1['tier'] = 2;
            } else if (tier_score > 0.4) {
                data1['tier'] = 3;
            } else if (tier_score > 0.2) {
                data1['tier'] = 4;
            } else {
                data1['tier'] = 5;
            }

            data1['score-rank'] = 1;
            tier.forEach(data2 => {
                if (data1['score'] < data2['score']) {
                    data1['score-rank']++;
                }
            });
        });
        
        this.setState({tierList: tier});
    }

    listSort = () => {
        const { tierList, type, typeFocus } = this.state;

        if (type[typeFocus] === 'score-rank') {
            tierList.sort((a, b) => {
                const _a = a[type[typeFocus]];
                const _b = b[type[typeFocus]];
                return _a - _b;
            });
        } else {
            tierList.sort((a, b) => {
                const _a = a[type[typeFocus]];
                const _b = b[type[typeFocus]];
                return _b - _a;
            });
        }
    }

    listView = () => {
        const { intl } = this.props;
        const { tierList, image_tier, image_character, image_weapon } = this.state;

        this.listSort();

        return tierList.map((data, idx) => 
            <div className="rank-1" key={'tier' + idx}>                
                <span className="rank3rank1">{data['score-rank']}</span>
                <img className="rank3cha1" src={image_character[data['character']]} />
                <img className="rank3weapone1" src={image_weapon[data['weapon']]} />
                <img className="rank3tier1" src={image_tier[data['tier']]} />
                <span className="rank3win1">{data['data']['win-rate'].toFixed(1)}%</span>
                <span className="rank3pick1">{data['data']['pick-rate'].toFixed(1)}%</span>
                <span className="rank3kill1">{data['data']['avg-kill'].toFixed(1)}</span>
                <span className="rank3avg1">{data['data']['avg-rank'].toFixed(1)}</span>
                <span className="rank3recentNurf">NURF</span>
            </div>
        );
    }
    
    typeHandler = (idx) => {
        this.setState({typeFocus: idx});
    }
    typeView = () => {
        const { intl } = this.props;
        const { type, typeFocus } = this.state;

        return type.map((name, idx) => 
            <div className={'tabHeader2 ' + (idx === typeFocus ? 'actived' : '')}
                key={'type'+idx}
                onClick={(e) => this.typeHandler(idx)}>
                {intl.formatMessage({id: name})}
            </div>
        );
    }

    render() {
        const { intl } = this.props;

        return (
            <div>
                <div className="rank2">
                    <div className="tabHeaders">
                        {this.typeView()}
                    </div>
                </div>
                <div className="rank3">
                    <span className="rank3rank">{intl.formatMessage({id: 'rank'})}</span>
                    <span className="rank3cha">{intl.formatMessage({id: 'character'})}</span>
                    <span className="rank3weapone">{intl.formatMessage({id: 'weapon'})}</span>
                    <span className="rank3tier">{intl.formatMessage({id: 'tier'})}</span>
                    <span className="rank3win">{intl.formatMessage({id: 'win-rate'})}</span>
                    <span className="rank3pick">{intl.formatMessage({id: 'pick-rate'})}</span>
                    <span className="rank3kill">{intl.formatMessage({id: 'avg-kill'})}</span>
                    <span className="rank3avg">{intl.formatMessage({id: 'avg-rank'})}</span>
                    <span className="rank3recent">{intl.formatMessage({id: 'lately-patch'})}</span>
                </div>
                {this.listView()}
            </div>
        );
    };
}

export default injectIntl(Tier);