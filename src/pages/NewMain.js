import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import { Footer, Langauge, Header  } from 'components/banner';
import { getCharacterKeys, getCharacter } from 'lib/data'
import logo from 'img/main_logo.svg';

class Main extends Component {
	constructor(props) {
        super(props);
        this.state = {
            searchType: 0,
            search: '',
            searchList: [],
        };
    }
    
    selectHandler = (event) => {
        this.setState({search:'', searchList: []});
    }
    searchHandler = (event) => {
        const { intl } = this.props;
        const value = event.target.value.toLowerCase();

        if (!value) {
            this.setState({search:'', searchList: []});
            return;
        }

        const list = getCharacterKeys().filter(code => (intl.formatMessage({id: 'characters.'+getCharacter(code)['name'] })).replace(' ', '').toLowerCase().indexOf(value) !== -1);

        this.setState({search:value, searchList: list});
    }
    searchView = () => {
        const { intl } = this.props;
        const { searchList } = this.state;

        return searchList.map((data, idx) => 
            <Link to={'Detail?character='+data} key={idx} onClick={(e)=> this.selectHandler(e)}>
                <div className="Main_search_box1" >
                    <img className="Main_search_img" src={'img/Rank/'+getCharacter(data)['name']+'.jpg'} />
                    <div className="Main_search_font"> {intl.formatMessage({id: 'characters.'+getCharacter(data)['name']})} </div>
                </div>
            </Link>
        );
    }

    render() {
        const { intl } = this.props;
        const { search, searchList } = this.state;
        
        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.newMain'}),
        }

        return (
            <div>
            <Header data={metaData}/>
                <div className="mainpage_banner">
                    <img className="mainpage_logo" src={logo} />
                    <div className="mainpage_banner_option">
                        <div className="mainpage_langauge">
                            <Langauge />
                        </div>
                        <div className="mainpage_buttons">
                            <Link to={'/Rank'}>
                                <button className="mainpage_button">
                                    {intl.formatMessage({id: '랭크'})}
                                </button>
                            </Link>
                            <Link to={'/Route'}>
                                <button className="mainpage_button">
                                 {intl.formatMessage({id: 'main.banner.menu.route'})}
                                </button>
                            </Link>
                            <Link to={'/Tier'}>
                                <button className="mainpage_button">
                                    {intl.formatMessage({id: '캐릭터/티어'})}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mainpage_search">
                    <input type="checkbox" id="switch" /><label className="mainpage_switch1" for="switch">Toggle</label>
                    <input className="mainpage_search_box" value={search} onChange={this.searchHandler} placeholder={intl.formatMessage({id:'main.left.characters.placeholder'})} /> 
                    {
                    searchList.length !== 0 &&
                        <div multiple className="Main_search_box">
                            {this.searchView()}
                        </div>
                }
                </div>
                
                {/*<div className="mainpage_ad">
                    d
                </div>*/}
                <Footer />
            </div>
        );
    };
}

export default injectIntl(Main);