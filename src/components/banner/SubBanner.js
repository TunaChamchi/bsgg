import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import logo from 'img/bsgglogo.png';

class SubBanner extends Component {
    render() {
        const { intl } = this.props

        return (
            <div className="banner"> 
                <div className="banner-top">
                    <div className="language">
                        <span>지구본</span>
                        <button>{intl.formatMessage({id:'main.banner.language'})}</button>
                    </div>
                    
                    <div className="mainlogo">
                        <img className="logo" src={logo}/>
                    </div>
                </div>

                <div className="banner-menu">
                    <div className="banner-botton">
                        <button>{intl.formatMessage({id:'main.banner.menu.rank'})}</button>
                        <button>{intl.formatMessage({id:'main.banner.menu.item'})}</button>
                    </div>

                    <div className="Data-period">
                        <span>{intl.formatMessage({id:'Data-period'})}</span>
                    </div>
                </div>
            </div>
        );
    };
}

export default injectIntl(SubBanner);