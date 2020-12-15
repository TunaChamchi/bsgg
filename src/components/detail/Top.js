import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Version, dmgPlus, getStat } from 'lib/data';

class Top extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tierColor: ['#007fd3', '#00d3b7', '#d38900', '#8b8b8b', '#583900']
        };
    }

    weaponListView = () => {
        const { data, weaponData, parameter } = this.props;

        weaponData['weaponList'].sort((a, b) => b['pick'] - a['pick']);

        return weaponData['weaponList'].map((weapon, idx) => {
            const pick = (weapon['pick'] / weaponData['weaponTotal'] * 100).toFixed(0);
            const name = weapon['name'];

            return (
                <Link to={'Detail?range='+parameter['rangeFocus']+'&type='+parameter['typeFocus']+'&character='+parameter['character']+'&weapon='+name} key={'weaponList' + idx}>
                    <div className={'tabHeader4 ' + (name === data['weapon'] ? 'actived' : '')}>
                        <img className="S_top-weapon1" src={'img/Weapons/' + name + '.png'} />
                        <span className="S_top-weapon2">{pick}%</span>
                    </div>
                </Link>
            )
        });
    }

    render() {
        const { intl, data, parameter } = this.props;
        const { tierColor } = this.state;

        const character = parameter['character'];

        const img_char = 'img/Characters/' + character + '.png';
        const img_tier = 'img/Tier/' + data['tier'] + '티어2.png';

        return (            
            <div className="S_top">
                <div className="S_top-cha">
                    <img className="S_top-cha1" style={{border:"3px solid "+ tierColor[data['tier']-1]}} src={img_char} />
                    <img className="S_top-cha2" src={img_tier} />
                </div>
                <div className="S_top-box">  
                    <span className="S_top-cha3">{intl.formatMessage({id: 'characters.'+character})}</span>
                    <div className="tabHeaders2">
                    {this.weaponListView()}
                    </div>
                </div>
                    <div className="S_top-stat">
                        <span className="S_top-stat1">{intl.formatMessage({ id: 'detail.lv20stat' })}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.공격력' })}</span>
                        <span className="S_top-stat3">{getStat(character, '공격력', 0)}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.방어력' })}</span>
                        <span className="S_top-stat3">{getStat(character, '방어력', 0)}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.최대체력' })}</span>
                        <span className="S_top-stat3">{getStat(character, '체력', 0)}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.체력재생' })}</span>
                        <span className="S_top-stat3">{getStat(character, '체력 재생', 0)}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.최대스태미너' })}</span>
                        <span className="S_top-stat3">{getStat(character, '스태미너', 0)}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.스태미너재생' })}</span>
                        <span className="S_top-stat3">{getStat(character, '스태미너 재생', 0)}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.공격속도' })}</span>
                        <span className="S_top-stat3">{getStat(character, '공격속도', 0)}</span>
                    </div>
                    <div className="S_top-stat">
                        <span className="S_top-stat1">{intl.formatMessage({ id: 'detail.lv1stat' })}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.공격력' })}</span>
                        <span className="S_top-stat3">{getStat(character, '공격력', 1)}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.방어력' })}</span>
                        <span className="S_top-stat3">{getStat(character, '방어력', 1)}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id:  'stat.최대체력' })}</span>
                        <span className="S_top-stat3">{getStat(character, '체력', 1)}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.체력재생' })}</span>
                        <span className="S_top-stat3">{getStat(character, '체력 재생', 1)}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.최대스태미너' })}</span>
                        <span className="S_top-stat3">{getStat(character, '스태미너', 1)}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.스태미너재생' })}</span>
                        <span className="S_top-stat3">{getStat(character, '스태미너 재생', 1)}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.공격속도' })}</span>
                        <span className="S_top-stat3">{getStat(character, '공격속도', 1)}</span>
                    </div>
                <div className="S_Data-period">
                    <span>{Version}</span>
                </div>
            </div>
        );
    };
}

export default injectIntl(Top);