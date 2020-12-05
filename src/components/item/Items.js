import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Tier } from 'components/Main/right'
import { Item } from 'lib/data'

class Items extends Component {
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

        this.setState({ itemList: Item(range, type[typeFocus]) });
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
                {intl.formatMessage({id: name})}
            </div>
        );        
    }

    itemsView = () => { 
        const { itemList, type, typeFocus } = this.state;

        itemList.sort((a, b) => b['win-rate'] - a['win-rate']);

        return itemList.map((item, idx) =>
            <div class="S_item_rank"
                key={'item' + idx}>
                <span class="S_item_rank1">{idx+1}</span>
                <img class="S_item_rank2" src={'img/Item/Item/'+type[typeFocus]+'/'+item['name']+'.jpg'} />
                <span class="S_item_rank3">{item['name']}</span>
                <span class="S_item_rank6">{item['win-rate']}%</span>
            </div>
        );
    }

    render() {
        return (
            <div class="S_right2">
                <div class="S_item_tab_banner2">
                    <div class="tabHeaders">
                        {this.typeView()}
                    </div>
                    <div class="S_item_sort_b">
                        <span class="S_item_sort_b1">순위</span>
                        <span class="S_item_sort_b2">이름</span>
                        <span class="S_item_sort_b3">승률</span>
                    </div>
                </div>
                {this.itemsView()}
            </div>
        );
    };
}

export default injectIntl(Items);