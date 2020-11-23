import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import langaugeLogo from 'img/langauge logo.png';
import logo from 'img/bsgglogo.svg';

class MainBanner extends Component {
    render() {
        const { intl } = this.props;

        return (
            <div className="banner"> 
                <div className="banner-top">
                    <div className="language">
                        <img className="langaugelogo" src={langaugeLogo} />
                        <button className="langaugebutton">{intl.formatMessage({id:'main.banner.language'})}</button>
                    </div>
                    
                    <div className="mainlogo">
                        <img className="logo" src={logo}/>
                    </div>
                </div>

                <div className="banner-menu">
                    <div className="banner-botton">
                        <button className="menubutton">{intl.formatMessage({id:'ranking'})}</button>
                        <button className="menubutton">{intl.formatMessage({id:'item'})}</button>
                    </div>

                    <div className="Data-period">
                        <span>{intl.formatMessage({id:'Data-period'})}</span>
                    </div>
                </div>
            </div>
        );
    };
}

export default injectIntl(MainBanner);