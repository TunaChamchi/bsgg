import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import { Langauge  } from 'components/banner';
import logo from 'img/sub_logo.svg';
import { charList } from 'lib/utility'

class SubBanner extends Component {
	constructor(props) {
        super(props);
        this.state = {
            search: '',
            searchList: [],
        };
    }

    selectHandler = (event) => {
        this.setState({search:'', searchList: []});
    }
    searchHandler = (event) => {
        const value = event.target.value.toLowerCase();

        if (!value) {
            this.setState({search:'', searchList: []});
            return;
        }

        const list = charList().filter(data => data['name'].replace(' ', '').toLowerCase().indexOf(value) !== -1);

        this.setState({search:value, searchList: list});
    }
    searchView = () => {
        const { searchList } = this.state;

        return searchList.map((data, idx) => 
            <Link to={'Detail?character='+data['key']} key={idx} onClick={(e)=> this.selectHandler(e)}>
                <div className="S_search4" >
                    <img className="searchimg" src={'img/Rank/'+data['key']+'.png'} />
                    <div className="searchfont"> {data['name']} </div>
                </div>
            </Link>
        );
    }

    render() {
        const { intl } = this.props
        const { search, searchList } = this.state;

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
                        <input className="S_search1" value={search} onChange={this.searchHandler} placeholder={intl.formatMessage({id:'main.banner.placeholder'})} /> 
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