import React, { Component, Suspense } from 'react';
import { injectIntl  } from 'react-intl';
import CharList from 'data/character.json';

class Characters extends Component {
	constructor(props) {
        super(props);
        this.state = {
            searchList: [],
        };
    }
    
    componentDidMount() {
        this.setState({searchList: Object.keys(CharList)});
    };

    searchHandler = (event) => {
        const value = event.target.value;

        const list = Object.keys(CharList).filter(key => key.indexOf(value) !== -1);
        
        this.setState({searchList: list});
    }

    characterList = () => {
        const { searchList, image } = this.state;

        const list = []

        for (var i = 0 ; i < searchList.length ; i+=3) {
            const sub = [searchList[i], searchList[i+1], searchList[i+2]];
            list.push(sub);
        }

        return list.map((sub, idx) =>
            <div className="cha4" key={'cha4'+idx}>
                <img className="chaimg" key={'chaimg'+sub[0]} src={'img/Characters/'+sub[0]+'.png'} />&nbsp;
                <img className="chaimg" key={'chaimg'+sub[1]} src={sub[1] ? 'img/Characters/'+sub[1]+'.png' : ''} />&nbsp;
                <img className="chaimg" key={'chaimg'+sub[2]} src={sub[2] ? 'img/Characters/'+sub[2]+'.png' : ''} />
            </div>
        );
    }


    render() {
        const { intl } = this.props;

        return (
            <div className="cha">
                <div className="cha0">
                    <span>{intl.formatMessage({id:'character'})}</span>
                </div>
                <div className="cha1">
                    <div className="tabHeaders">
                        <img className="tabHeader3 actived" src="https://i.ibb.co/BchSVM0/Warrior.png"/>
                        <img className="tabHeader3" src="https://i.ibb.co/KrRJTMb/Tanker.png"/>
                        <img className="tabHeader3" src="https://i.ibb.co/j6rvtLs/Dealer.png"/>
                        <img className="tabHeader3" src="https://i.ibb.co/LSGxBQq/Assassin.png"/>
                        <img className="tabHeader3" src="https://i.ibb.co/LNHPGTj/Nuker.png"/>
                    </div>
                    <input className="chasearch" onChange={this.searchHandler} placeholder={intl.formatMessage({id:'main.left.characters.placeholder'})} /> 
                </div>
                <div className="cha2">
                    <div className="cha3">
                        {this.characterList()}
                    </div>
                </div>
            </div>
        );
    };
}

export default injectIntl(Characters);