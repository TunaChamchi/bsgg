import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
//import AdSense from 'react-adsense';
import mapData from 'data/inGame/map.json'

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    };
    
    itemView = () => {
        const { map } = this.props;

        const itemList = mapData[map]['quest'];

        return itemList.map((item, idx) => {
            return (
                <img className="map_img_item" key={'item'+idx} src={'img/Item/' + item + '.png'} />
            )
        });
    }

    render() {
        const { intl } = this.props;

        return (
            <div className="map_square">
                <div className="map_tab">드랍 아이템</div>
                {this.itemView()}
            </div>
        );
    };
}

export default injectIntl(Item);