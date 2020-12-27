import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Armor, itemBgI, statList } from 'lib/data';
import armorData from 'data/inGame/armor.json';

class Armors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: [],
            type: ['옷', '머리', '팔', '다리', '장식'],
            typeFocus: 0,
        }
    }

    componentWillMount() {
        this.init();
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.props.range !== prevProps.range || this.state.typeFocus !== prevState.typeFocus) {
            this.init();
        }
    };

    init() {
        const { type, typeFocus } = this.state;
        const { range } = this.props;

        this.setState({ itemList: Armor(range, type[typeFocus]) });
    };

    typeHandler = (idx) => {
        this.setState({typeFocus: idx});
    }
    typeView = () => {
        const { intl } = this.props;
        const { type, typeFocus } = this.state;

        return type.map((name, idx) => 
            <div className={'S_item_tab ' + (idx === typeFocus ? 'actived' : '')}
                key={'type'+idx}
                onClick={(e) => this.typeHandler(idx)}>
                {intl.formatMessage({id:'armor.'+name})}
            </div>
        );        
    }

    armorsView = () => { 
        const { intl } = this.props;
        const { itemList, type, typeFocus } = this.state;

        itemList.sort((a, b) => b['win-rate'] - a['win-rate']);

        return itemList.map((armor, idx) =>
            <div className="S_item_rank"
                key={'item' + idx}>
                <span className="S_item_rank1">{idx+1}</span>
                <div className="S_item_toolbox1">
                    <img className="S_item_rank2" src={itemBgI(armor['name'])}/>
                    <img className="S_item_rank2" src={'img/Item/'+armor['name']+'.png'} />
                    <div className="S_item_tooltip3">
                        <span>{this.statView(armor['name'])}</span>
                    </div>
                </div>
                <span className="S_item_rank3">{intl.formatMessage({id: 'items.'+armor['name']})}</span>
                <span className="S_item_rank6">{armor['win-rate']}%</span>
            </div>
        );
    }
    statView = (name) => {
        const { intl } = this.props;

        const list = statList(name);

        let toolTip = "";
        for (const key in list) {
            toolTip += intl.formatMessage({id: 'stat.'+key}) + " " + list[key] + "\n";
        }

        return toolTip;
    }

    render() {
        const { intl } = this.props;

        return (
            <div className="S_right2">
                <div className="S_item_tab_banner2">
                    <div className="tabHeaders">
                        {this.typeView()}
                    </div>
                    <div className="S_item_sort">
                        <span className="S_item_sort1">{intl.formatMessage({id:'rank'})}</span>
                        <span className="S_item_sort2">{intl.formatMessage({id:'name'})}</span>
                        <span className="S_item_sort3">{intl.formatMessage({id:'win-rate'})}</span>
                        <span className="S_item_sort4">{intl.formatMessage({id:'pick-rate'})}</span>
                    </div>
                </div>
                <div className="item_scroll">
                {this.armorsView()}
                </div>
            </div>
        );
    };
}

export default injectIntl(Armors);