import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import { Langauge  } from 'components/banner';
import { Version } from 'lib/data'
import { defaultLang } from 'lib/utility'
import logo from 'img/main_logo.svg';

class MainBanner extends Component {
    render() {
        const { intl } = this.props;

        return (
            <div className="banner"> 
                <div className="banner-top">
                    <Langauge />
                    
                    <div className="mainlogo">
                        <img className="logo" src={logo}/>
                    </div>
                </div>

                <div className="banner-menu">
                    <div className="banner-botton">
                        <div className="trirank"></div>
                        <a href={'https://playeternalreturn.com/'+defaultLang()+'/ranking/'} target="_blank">
                            <button className="menubutton">{intl.formatMessage({id:'main.banner.menu.rank'})}</button>
                        </a>
                    </div>

                    <div className="Data-period">
                        <span>{Version}</span>
                    </div>
                </div>
            </div>
        );
    };
}

export default injectIntl(MainBanner);