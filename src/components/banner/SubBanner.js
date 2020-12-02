import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
//import langaugeLogo from 'img/langauge_logo.png';
import logo from 'img/sub_logo.svg';

class SubBanner extends Component {
    render() {
        const { intl } = this.props

        return (
            <div className="S_banner">
                <div className="S_banner-top">
                    <div className="language">
                        <img className="langaugelogo" src={'https://i.ibb.co/MRF3VmN/image.png'} />
                        <button className="langaugebutton">{intl.formatMessage({id:'main.banner.language'})}</button>
                    </div>
            
                    <div className="S_mainlogo">
                        <Link to="/" >
                            <img className="S_logo" src={logo} />
                        </Link>
                    </div>
                    <div className="S_search">
                        <input className="S_search1" placeholder="  챔피언을 검색하세요." /> 
                        <button className="S_search2">검색</button>
                    </div>
                </div>
            </div>
        );
    };
}

export default injectIntl(SubBanner);