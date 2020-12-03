import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Tier } from 'components/Main/right'
import { Weapon } from 'lib/data'

class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weaponList: [],
        }
    }

    componentWillMount() {
        this.init();
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.props.character !== prevProps.character || this.props.weapon !== prevProps.weapon
            || this.props.range !== prevProps.range || this.props.type !== prevProps.type) {
            this.init();
        }
    };

    init() {
        const { character, weapon, type } = this.props;        

        this.setState({ weaponList: Weapon(character, weapon, type) });
    };

    weaponView = () => {
        const { weapon } = this.props;  
        const { weaponList } = this.state;

        weaponList.sort((a, b) => b['win-rate'] - a['win-rate']);

        return weaponList.map((_weapon, idx) =>
            <div className={'S_item_rank'}
                key={'weapon' + idx}>
                <span className="S_item_rank1">{idx+1}</span>&nbsp;
                <img className="S_item_rank2" src={'img/Item/Weapons/'+weapon+'/'+_weapon['weapon']+'.jpg'} />&nbsp;
                <span className="S_item_rank3">{_weapon['weapon']}</span>&nbsp;
                <span className="S_item_rank4">{_weapon['win-rate'].toFixed(1)}%</span>&nbsp;
                <span className="S_item_rank5">{_weapon['pick-rate'].toFixed(1)}%</span>
            </div>
        );
    }

    render() {
        const { range, rangeFocus, type, typeFocus } = this.state;

        return (
            <div className="S_right">
                <div className="S_item">
                    <span className="S_item1">ITEM</span>
                    <div className="S_item_tab_banner">
                        <div className="S_item_tab1"><span className="S_item_tab1">무기</span></div>
                        <div className="S_item_sort">
                            <span className="S_item_sort1">순위</span>
                            <span className="S_item_sort2">이름</span>
                            <span className="S_item_sort3">승률</span>
                            <span className="S_item_sort4">픽률</span>
                        </div>
                    </div>
                    {this.weaponView()}
                </div>
            </div>
        );
    };
}

export default injectIntl(Items);