import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import { Langauge  } from 'components/banner';
import logo from 'img/sub_logo.svg';
import CharList from 'data/character.json';

class SubBanner extends Component {
	constructor(props) {
        super(props);
        this.state = {
            searchList: [],
        };
    }

    searchHandler = (event) => {
        const value = event.target.value;

        if (!value) {
            this.setState({searchList: []});
            return;
        }

        const list = Object.keys(CharList).filter(key => key.indexOf(value) !== -1);
        
        this.setState({searchList: list});
    }
    searchView = () => {
        const { searchList } = this.state;

        return searchList.map((name, idx) => 
            <div className="S_search4" key={idx} onClick={(e) => this.link(name)}>
                <img className="searchimg" key={'searchimg'+name} src={'img/Rank/'+name+'.png'} />
                <div className="searchfont"> {name} </div>
            </div>
        );
    }
    link = (name) => {
        window.location.href = 'Detail?character='+name;
    }

    render() {
        const { intl } = this.props
        const { searchList } = this.state;

        return (
            <div className="S_banner">
                <div className="S_banner-top">
                    <Langauge />
            
                    <div className="S_mainlogo">
                        <Link to="/" >
                            <img className="S_logo" src={logo} />
                        </Link>
                    </div>
                    <div className="S_search">
                        <input className="S_search1" onChange={this.searchHandler} placeholder={intl.formatMessage({id:'main.banner.placeholder'})} /> 
                    </div>
                    {
                        searchList.length !== 0 &&
                            <div multiple className="S_search3">
                                {this.searchView()}
                            </div>
                    }
                    
                </div>
            </div>
        );
    };
}

export default injectIntl(SubBanner);