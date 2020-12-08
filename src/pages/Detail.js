import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import queryString from 'query-string';
import { SubBanner, AdS, Footer } from 'components/banner';
import { Weapons, Armors } from 'components/item';
import { Version, CharacterScore, Max, Min, Avg, dmgPlus } from 'lib/data';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            character: '',
            weapon: '',
            weaponList: [],
            range: ['RANKER', 'ALL'],
            rangeFocus: '',
            type: ['solo', 'duo', 'squad'],
            typeFocus: '',
            skill: ['T', 'Q', 'W', 'E', 'R', 'D'],
            skillFocus: 0,
            ad_style: {},
        };
    }
    componentWillMount() {
        window.scrollTo(0, 0);

        this.init();
    };
    componentDidUpdate(prevProps, prevState){
        const { location } = this.props;
        const prevquery = queryString.parse(prevProps.location.search);
        const query = queryString.parse(location.search);

        if (query.character !== prevquery.character || query.weapon !== prevquery.weapon
            || query.range !== prevquery.range || query.type !== prevquery.type) {
            if (query.character !== prevquery.character) {
                window.scrollTo(0, 0);
            }
            this.init();
        }
    };

    init() {
        const { location } = this.props;
        const query = queryString.parse(location.search);

        this.state.weaponList = [];

        const rangeFocus = query.range || 'RANKER';
        const typeFocus = query.type || 'solo';

        const list = CharacterScore(rangeFocus, typeFocus);

        const character = query.character;

        let weaponTotal = 0;
        list.forEach(data => {
            if (data['character'] === character) {
                weaponTotal += data['data']['pick-rate'];
                this.state.weaponList.push({
                    name: data['weapon'],
                    pick: data['data']['pick-rate']
                });
            }
        });

        this.state.weaponList.sort((a, b) => b['pick'] - a['pick']);
        let weapon = query.weapon || this.state.weaponList[0]['name'];

        list.forEach(data => {
            if (data['character'] === character) {
                if (data['weapon'] === weapon) {
                    this.setState({ data: data });
                }
            }
        });

        this.setState({ 
            weaponTotal: weaponTotal,
            rangeFocus: rangeFocus,
            typeFocus: typeFocus,
            character: character,
            weapon: weapon,
        });
    };

    weaponListView = () => {
        const { data, weaponList, weaponTotal, character, typeFocus, rangeFocus } = this.state;

        weaponList.sort((a, b) => b['pick'] - a['pick']);

        return weaponList.map((weapon, idx) => {
            const pick = (weapon['pick'] / weaponTotal * 100).toFixed(0);

            return (
                <Link to={'Detail?range='+rangeFocus+'&type='+typeFocus+'&character='+character+'&weapon='+weapon['name']} key={'weaponList' + idx}>
                    <div className={'tabHeader4 ' + (weapon['name'] === data['weapon'] ? 'actived' : '')}>
                        <img className="S_top-weapon1" src={'img/Weapons/' + weapon['name'] + '.jpg'} />
                        <span className="S_top-weapon2">{pick}%</span>
                    </div>
                </Link>
            )
        });
    }
    rangeView = () => {
        const { character, weapon, typeFocus, range, rangeFocus } = this.state;

        return range.map((name, idx) =>
            <Link to={'Detail?range='+name+'&type='+typeFocus+'&character='+character+'&weapon='+weapon} key={'range' + idx}>
                <div className={'tabHeader5 ' + (name === rangeFocus ? 'actived' : '')}>
                    {name}
                </div>
            </Link>
        );
    };
    typeView = () => {
        const { intl } = this.props;
        const { character, weapon, rangeFocus, type, typeFocus } = this.state;
        return type.map((name, idx) =>
            <Link to={'Detail?range='+rangeFocus+'&type='+name+'&character='+character+'&weapon='+weapon} key={'type' + idx}>
                <div className={'tabHeader6 ' + (name === typeFocus ? 'actived' : '')}>
                    {intl.formatMessage({ id: name })}
                </div>
            </Link>
        );
    };
    skillHandler = (idx) => {
        this.setState({skillFocus: idx});
    };
    skillView = () => {
        const { character, weapon, skill, skillFocus } = this.state;

        return skill.map((name, idx) => {
            const img = name === 'D' ? 
                'img/Weapons/'+weapon+'.jpg' : 
                'img/Skill/'+character+'/'+character+'_'+name+'.png';

            return (
                <div className='S_Skill_tab'
                    key={'type' + idx}>
                    <img className={'S_Skill_img ' + (idx === skillFocus ? 'actived' : '')} 
                        src={img}
                        onClick={(e) => this.skillHandler(idx)} />
                    <div className="S_SKill_key"><span>{name}</span></div>          
                </div>
            )
        });
    };

    render() {
        const { intl } = this.props;
        const { data, character, weapon, rangeFocus, typeFocus,skill, skillFocus, ad_style } = this.state;

        const img_char = 'img/Characters/' + data['character'] + (data['tier'] > 0 ? '' : '_오피') + '.png';
        const img_tier = data['tier'] > 0 ? 'img/Tier/' + data['tier'] + '티어.png' : 'img/Tier/1티어.png';
        const avg = Avg(rangeFocus, typeFocus);
        const max = Max(rangeFocus, typeFocus);
        const min = Min(rangeFocus, typeFocus);

        const win_rate_width  = ((data['data']['win-rate']  - min['win-rate'])  / (max['win-rate']  - min['win-rate']) ) * 320;
        const pick_rate_width = ((data['data']['pick-rate'] - min['pick-rate']) / (max['pick-rate'] - min['pick-rate'])) * 320;
        const avg_kill_width  = ((data['data']['avg-kill']  - min['avg-kill'])  / (max['avg-kill']  - min['avg-kill']) ) * 320;
        const avg_rank_width  = ((data['data']['avg-rank']  - min['avg-rank'])  / (max['avg-rank']  - min['avg-rank']) ) * 320;

        const win_rate_avg  = ((avg['win-rate']  - min['win-rate'])  / (max['win-rate']  - min['win-rate']) ) * 320 - 22;
        const pick_rate_avg = ((avg['pick-rate'] - min['pick-rate']) / (max['pick-rate'] - min['pick-rate'])) * 320 - 22;
        const avg_kill_avg  = ((avg['avg-kill']  - min['avg-kill'])  / (max['avg-kill']  - min['avg-kill']) ) * 320 - 22;
        const avg_rank_avg  = ((avg['avg-rank']  - min['avg-rank'])  / (max['avg-rank']  - min['avg-rank']) ) * 320 - 22;

        const skillType  = skill[skillFocus] === 'T' ? intl.formatMessage({ id: 'detail.passive' }) : skill[skillFocus] === 'D' ? intl.formatMessage({ id: 'detail.weaponSkill' }) : skill[skillFocus];
        const skilName   = skill[skillFocus] === 'D' ? intl.formatMessage({ id: 'skill.'+weapon+'.name' })   : intl.formatMessage({ id: 'skill.'+character+'.'+skill[skillFocus]+'.name' });
        const skilDetail = skill[skillFocus] === 'D' ? intl.formatMessage({ id: 'skill.'+weapon+'.Detail' }) : intl.formatMessage({ id: 'skill.'+character+'.'+skill[skillFocus]+'.Detail' });

        return (
            <div>
                <SubBanner />
                <div className="S_main">
                    <div className="S_top">
                        <div className="S_top-cha">
                            <img className="S_top-cha1" src={img_char} />
                            <img className="S_top-cha2" src={img_tier} />
                            <span className="S_top-cha3">{intl.formatMessage({id: 'characters.'+data['character']})}</span>
                        </div>
                        <div className="tabHeaders">
                            {this.weaponListView()}
                        </div>
                        <div className="S_top-stat">
                            <span className="S_top-stat1">{intl.formatMessage({ id: 'detail.squadStat' })}</span>
                            <span className="S_top-stat2">{intl.formatMessage({ id: 'detail.giveDmg' })}</span>
                            <span className="S_top-stat3">{dmgPlus(character, 'squad', 'inflict')}%</span>
                            <span className="S_top-stat2">{intl.formatMessage({ id: 'detail.takeDmg' })}</span>
                            <span className="S_top-stat3">{dmgPlus(character, 'squad', 'receive')}%</span>
                        </div>
                        <div className="S_top-stat">
                            <span className="S_top-stat1">{intl.formatMessage({ id: 'detail.duoStat' })}</span>
                            <span className="S_top-stat2">{intl.formatMessage({ id: 'detail.giveDmg' })}</span>
                            <span className="S_top-stat3">{dmgPlus(character, 'duo', 'inflict')}%</span>
                            <span className="S_top-stat2">{intl.formatMessage({ id: 'detail.takeDmg' })}</span>
                            <span className="S_top-stat3">{dmgPlus(character, 'duo', 'receive')}%</span>
                        </div>
                        <div className="S_Data-period">
                            <span>{Version}</span>
                        </div>
                    </div>
                    <div className="S_left">
                        <div className="S_Trend">
                            <div className="S_Trend0">
                                <span className="S_Trend_T">Trend</span>
                                <div className="S_Trend_tab">
                                    <div className="tabHeaders">
                                        {this.rangeView()}
                                    </div>
                                </div>
                            </div>
                            <div className="S_Trend1">
                                <div className="tabHeaders">
                                    {this.typeView()}
                                </div>
                            </div>
                            <div className="S_Trend2">
                                <div className="S_Trend_square">
                                    <div className="S_Trend_square1"><span>{intl.formatMessage({id: 'win-rate'})}</span></div>
                                    <div className="S_Trend_square2"><span>{data['data']['win-rate'].toFixed(1)}%</span></div>
                                    <div className="S_Trend_square3"><span>#{data['rank']['win-rate']}</span></div>
                                    <div className="S_Trend_Graph"></div>
                                    <div className="S_Trend_Graph2" style={{width: win_rate_width}}></div>
                                    <div className="S_Trend_avg" style={{marginLeft: win_rate_avg}}>
                                        <div className="S_Trend_Tri"></div>
                                        <div className="S_Trend_avg1"><span>{intl.formatMessage({id: 'detail.avg'})} {avg['win-rate']}%</span></div>
                                    </div>
                                </div>
                                <div className="S_Trend_square">
                                    <div className="S_Trend_square1"><span>{intl.formatMessage({id: 'pick-rate'})}</span></div>
                                    <div className="S_Trend_square2"><span>{data['data']['pick-rate'].toFixed(1)}%</span></div>
                                    <div className="S_Trend_square3"><span>#{data['rank']['pick-rate']}</span></div>
                                    <div className="S_Trend_Graph"></div>
                                    <div className="S_Trend_Graph2" style={{width: pick_rate_width}}></div>
                                    <div className="S_Trend_avg" style={{marginLeft: pick_rate_avg}}>
                                        <div className="S_Trend_Tri"></div>
                                        <div className="S_Trend_avg1"><span>{intl.formatMessage({id: 'detail.avg'})} {avg['pick-rate']}%</span></div>
                                    </div>
                                </div>
                                <div className="S_Trend_square">
                                    <div className="S_Trend_square1"><span>{intl.formatMessage({id: 'avg-kill'})}</span></div>
                                    <div className="S_Trend_square2"><span>{data['data']['avg-kill'].toFixed(1)}</span></div>
                                    <div className="S_Trend_square3"><span>#{data['rank']['avg-kill']}</span></div>
                                    <div className="S_Trend_Graph"></div>
                                    <div className="S_Trend_Graph2" style={{width: avg_kill_width}}></div>
                                    <div className="S_Trend_avg" style={{marginLeft: avg_kill_avg}}>
                                        <div className="S_Trend_Tri"></div>
                                        <div className="S_Trend_avg1"><span>{intl.formatMessage({id: 'detail.avg'})} {avg['avg-kill']}</span></div>
                                    </div>
                                </div>
                                <div className="S_Trend_square">
                                    <div className="S_Trend_square1"><span>{intl.formatMessage({id: 'avg-rank'})}</span></div>
                                    <div className="S_Trend_square2"><span>{data['data']['avg-rank'].toFixed(1)}</span></div>
                                    <div className="S_Trend_square3"><span>#{data['rank']['avg-rank']}</span></div>
                                    <div className="S_Trend_Graph"></div>
                                    <div className="S_Trend_Graph2" style={{width: avg_rank_width}}></div>
                                    <div className="S_Trend_avg" style={{marginLeft: avg_rank_avg}}>
                                        <div className="S_Trend_Tri"></div>
                                        <div className="S_Trend_avg1"><span>{intl.formatMessage({id: 'detail.avg'})} {avg['avg-rank']}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="S_Skill">
                            <span className="S_Skill0">{intl.formatMessage({ id: 'detail.skill_info' })}</span>
                            <div className="tabHeaders">
                                <div className="S_Skill1">
                                    {this.skillView()}
                                </div>
                            </div>
                            <div className="S_Skill2">
                                <div className="S_Skill2_keyname">
                                    <span>{skillType}</span>
                                </div>
                                <div className="S_Skill2_name">
                                    <span>{skilName}</span>
                                </div>
                                <div className="S_Skill2_info">
                                    <span>{skilDetail}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Weapons 
                        character={character}
                        weapon={weapon}
                        range={rangeFocus}
                        type={typeFocus}
                    />
                    <Armors 
                        range={typeFocus}
                    />
                </div>
                <AdS />
                <Footer />
            </div>
            
        );
    };
}

export default injectIntl(Detail);