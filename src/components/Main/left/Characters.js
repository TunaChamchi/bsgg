import React, { Component, Suspense } from 'react';
import { injectIntl  } from 'react-intl';
import CharList from 'data/character.json';
import adriana_cha from 'img/cha logo/adriana cha.png';
import aya_cha from 'img/cha logo/aya cha.png';
import chiara_cha from 'img/cha logo/chiara cha.png';
import fiora_cha from 'img/cha logo/fiora cha.png';
import hart_cha from 'img/cha logo/hart cha.png';
import hyejin_cha from 'img/cha logo/hyejin cha.png';
import hyunwoo_cha from 'img/cha logo/hyunwoo cha.png';
import isol_cha from 'img/cha logo/isol cha.png';
import jackie_cha from 'img/cha logo/jackie cha.png';
import lidailin_cha from 'img/cha logo/lidailin cha.png';
import magnus_cha from 'img/cha logo/magnus cha.png';
import nadine_cha from 'img/cha logo/nadine cha.png';
import shoichi_cha from 'img/cha logo/shoichi cha.png';
import sissela_cha from 'img/cha logo/sissela cha.png';
import xiukai_cha from 'img/cha logo/xiukai cha.png';
import yuki_cha from 'img/cha logo/yuki cha.png';
import zahir_cha from 'img/cha logo/zahir cha.png';

class Characters extends Component {
	constructor(props) {
        super(props);
        this.state = {
            searchList: [],
            image: {
                '아드리아나': adriana_cha,
                '아야': aya_cha,
                '키아라': chiara_cha,
                '피오라': fiora_cha,
                '하트': hart_cha,
                '혜진': hyejin_cha,
                '현우': hyunwoo_cha,
                '아이솔': isol_cha,
                '재키': jackie_cha,
                '리 다이린': lidailin_cha,
                '매그너스': magnus_cha,
                '나딘': nadine_cha,
                '쇼이치': shoichi_cha,
                '시셀라': sissela_cha,
                '쇼우': xiukai_cha,
                '유키': yuki_cha,
                '자히르': zahir_cha,
            }
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
            <div className="cha3" key={'cha3'+idx}>
                <img className="chaimg" key={sub[0]} src={image[sub[0]]} />&nbsp;
                <img className="chaimg" key={sub[1]} src={image[sub[1]]} />&nbsp;
                <img className="chaimg" key={sub[2]} src={image[sub[2]]} />&nbsp;
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
                    <input className="chasearch" onChange={this.searchHandler} placeholder={intl.formatMessage({id:'main.left.characters.placeholder'})} /> 
                </div>
                <div className="cha2">
                    {this.characterList()}
                </div>
            </div>
        );
    };
}

export default injectIntl(Characters);