import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Version, getCharacter, getStat } from 'lib/data';

class Top extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tierColor: ['#007fd3', '#00d3b7', '#d38900', '#8b8b8b', '#583900']
        };
    }

    weaponListView = () => {
        const { stat, weaponData, parameter } = this.props;

        weaponData['weaponList'].sort((a, b) => b['total'] - a['total']);
        
        return weaponData['weaponList'].map((weapon, idx) => {
            const pick = (weapon['total'] / weaponData['weaponTotal'] * 100).toFixed(0);
            const name = weapon['code'];

            return (
                <Link to={'Detail?range='+parameter['rangeFocus']+'&type='+parameter['typeFocus']+'&character='+parameter['character']+'&weapon='+name} key={'weaponList' + idx}>
                    <div className={'tabHeader4 ' + (name === stat['weapon'] ? 'actived' : '')}>
                        <img className="S_top-weapon1" src={'img/Weapons/' + name + '.jpg'} />
                        <span className="S_top-weapon2">{pick}%</span>
                    </div>
                </Link>
            )
        });
    }

    render() {
        const { intl, stat, parameter } = this.props;
        const { tierColor } = this.state;

        const character = getCharacter(stat['characterNum']);
        const name = character['name'];
        const statlv = character['levelUp'];

        const img_char = 'img/Characters/' + name + '.jpg';
        const img_tier = 'img/Tier/' + 'tire' + '티어2.png';

        return (
            <div className="S_top">
                <div className="S_top-cha">
                    <img className="S_top-cha1" style={{border:"3px solid "+ tierColor[stat-1]}} src={img_char} />
                    <img className="S_top-cha2" src={img_tier} />
                </div>
                <div className="S_top-box">  
                    <span className="S_top-cha3">{intl.formatMessage({id: 'characters.'+name})}</span>
                    <div className="tabHeaders2">
                    {this.weaponListView()}
                    </div>
                </div>
                    <div className="S_top-stat">
                        <span className="S_top-stat1">{intl.formatMessage({ id: 'detail.lv20stat' })}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.공격력' })}</span>
                        <span className="S_top-stat3">{(character['stat']['attackPower']+statlv['attackPower']*19).toFixed(1)}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.방어력' })}</span>
                        <span className="S_top-stat3">{(character['stat']['defense']+statlv['defense']*19).toFixed(1)}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.최대체력' })}</span>
                        <span className="S_top-stat3">{(character['stat']['maxHp']+statlv['maxHp']*19).toFixed(0)}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.체력재생' })}</span>
                        <span className="S_top-stat3">{(character['stat']['hpRegen']+statlv['hpRegen']*19).toFixed(2)}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.최대스태미너' })}</span>
                        <span className="S_top-stat3">{(character['stat']['maxSp']+statlv['maxSp']*19).toFixed(0)}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.스태미너재생' })}</span>
                        <span className="S_top-stat3">{(character['stat']['spRegen']+statlv['spRegen']*19).toFixed(2)}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.공격속도' })}</span>
                        <span className="S_top-stat3">{(character['stat']['attackSpeed']+statlv['attackSpeed']*19).toFixed(2)}</span>
                    </div>
                    <div className="S_top-stat">
                        <span className="S_top-stat1">{intl.formatMessage({ id: 'detail.lv1stat' })}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.공격력' })}</span>
                        <span className="S_top-stat3">{character['stat']['attackPower']}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.방어력' })}</span>
                        <span className="S_top-stat3">{character['stat']['defense']}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.최대체력' })}</span>
                        <span className="S_top-stat3">{character['stat']['maxHp']}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.체력재생' })}</span>
                        <span className="S_top-stat3">{character['stat']['hpRegen']}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.최대스태미너' })}</span>
                        <span className="S_top-stat3">{character['stat']['maxSp']}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.스태미너재생' })}</span>
                        <span className="S_top-stat3">{character['stat']['spRegen']}</span>
                        <span className="S_top-stat2">{intl.formatMessage({ id: 'stat.공격속도' })}</span>
                        <span className="S_top-stat3">{character['stat']['attackSpeed']}</span>
                    </div>
                <div className="S_Data-period">
                    <span>{Version}</span>
                </div>
            </div>
        );
    };
}

export default injectIntl(Top);