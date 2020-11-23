import React, { Component } from 'react';
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
        const { searchList } = this.state;

        //<img class="chaimg" src={CharList[name].img} key={'chaimg'+idx} />
        return searchList.map((name, idx) => 
            <div>{name}</div>
        );
    }

    render() {
        const { intl } = this.props;

        return (
            <div class="cha">
                <div class="cha0">
                    <span>{intl.formatMessage({id:'character'})}</span>
                    </div>
                    <div class="cha1">
                        <input class="chasearch" onChange={this.searchHandler} placeholder={intl.formatMessage({id:'main.left.characters.placeholder'})} /> 
                    </div>
                    <div class="cha2">
                    <div class="cha3">
                        {this.characterList()}
                    </div>
                </div>
            </div>
        );
    };
}

export default injectIntl(Characters);