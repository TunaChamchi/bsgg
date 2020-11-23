import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import logo from 'img/bsgglogo.png';

class SubBanner extends Component {
    render() {
        const { intl } = this.props

        return (
            <div class="banner"> 
                <div class="banner-top">
                    <div class="language">
                        <span>지구본</span>
                        <button>{intl.formatMessage({id:'main.banner.language'})}</button>
                    </div>
                    
                    <div class="mainlogo">
                        <img class="logo" src={logo}/>
                    </div>
                </div>

                <div class="banner-menu">
                    <div class="banner-botton">
                        <button>{intl.formatMessage({id:'main.banner.menu.rank'})}</button>
                        <button>{intl.formatMessage({id:'main.banner.menu.item'})}</button>
                    </div>

                    <div class="Data-period">
                        <span>{intl.formatMessage({id:'Data-period'})}</span>
                    </div>
                </div>
            </div>
        );
    };
}

export default injectIntl(SubBanner);