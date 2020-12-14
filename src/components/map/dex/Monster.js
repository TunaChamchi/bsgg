import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
//import AdSense from 'react-adsense';
import mapData from 'data/inGame/map.json'
import mosterData from 'data/inGame/moster.json'

class Monster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectMoster: ''
        };
    };

    componentDidUpdate(prevProps, prevState){
        const { map } = this.props;
        if (map !== prevProps.map) {
            this.setState({selectMoster: ''});
        }
    };

    onClick = (e, selectMoster) => {
        this.setState({selectMoster: selectMoster});
    }

    MosterView = () => {
        const { map } = this.props;
        const { selectMoster } = this.state;

        const mosterList = mapData[map]['hunt'];

        return mosterList.map((moster, idx) => {
            return (
                <img className={"map_img_animal" + (selectMoster === moster ? ' actived' : '')}
                    onClick={(e) => this.onClick(e, moster)}
                    key={'moster'+idx} src={'img/Animal/'+moster+'.png'} />
            )
        });
    }
    itemView = () => {
        const { selectMoster } = this.state;

        const itemList = mosterData[selectMoster];

        return itemList.map((item, idx) => {
            return (
                <img className="map_img_item" key={'item'+idx} src={'img/Item/'+ item +'.png'} />
            )
        });
    }

    render() {
        const { intl } = this.props;
        const { selectMoster } = this.state;

        return (
            <div className="map_square">
                <div className="map_tab">출연 동물</div>
                {this.MosterView()}
                {
                    selectMoster && 
                        <div>
                            <div className="map_tab2">아이템</div>
                            {this.itemView()}
                        </div>
                }
                
            </div>
        );
    };
}

export default injectIntl(Monster);