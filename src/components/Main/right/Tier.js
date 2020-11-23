import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import CharList from 'data/character.json';

class Tier extends Component {
	constructor(props) {
        super(props);
        this.state = {
            tierList: [],
            type: ['score-rank', 'win-rate', 'pick-rate', 'avg-kill', 'avg-rank'],
            typeFocus: 0,
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
        const { tierList } = this.state;

        this.listSort();

        return tierList.map((data, idx) => 
            <div class="rank-1" key={'tier' + idx}>
                <span>{data['score-rank']}</span>
                <span>{intl.formatMessage({id: 'characters.'+data['character']})}</span>
                <span>{intl.formatMessage({id: 'weapons.'+data['weapon']})}</span>
                <span>{data['tier']}티어</span>
                <span>{data['data']['win-rate'].toFixed(1)}%</span>
                <span>{data['data']['pick-rate'].toFixed(1)}%</span>
                <span>{data['data']['avg-kill'].toFixed(1)}</span>
                <span>{data['data']['avg-rank'].toFixed(1)}</span>
                <span></span>
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
            <div class={'tabHeader2 ' + (idx === typeFocus ? 'actived' : '')}
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
                <div class="rank2">
                    <div class="tabHeaders">
                        {this.typeView()}
                    </div>
                </div>
                <div class="rank3">
                    <span>{intl.formatMessage({id: 'rank'})}</span>
                    <span>{intl.formatMessage({id: 'character'})}</span>
                    <span>{intl.formatMessage({id: 'weapon'})}</span>
                    <span>{intl.formatMessage({id: 'tier'})}</span>
                    <span>{intl.formatMessage({id: 'win-rate'})}</span>
                    <span>{intl.formatMessage({id: 'pick-rate'})}</span>
                    <span>{intl.formatMessage({id: 'avg-kill'})}</span>
                    <span>{intl.formatMessage({id: 'avg-rank'})}</span>
                    <span>{intl.formatMessage({id: 'lately-patch'})}</span>
                </div>
                {this.listView()}
            </div>
        );
    };
}

export default injectIntl(Tier);