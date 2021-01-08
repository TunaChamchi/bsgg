import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
//import AdSense from 'react-adsense';
import logo from 'img/sub_logo.svg';

class Footer extends Component {
    render() {
        const { intl } = this.props;

        return (
            <div className="footer">
                <img className="footer_logo" src={logo}/>
                <div  className="footer_span">
                    <span>{intl.formatMessage({id:'footer'})}</span>
                </div>
                    <div className="footer_button" href="mailto:service@bsgg.kr">
                        <a href="mailto:service@bsgg.kr"><img className="footer_img" src="img/contact.png" /></a>
                        <div className="footer_tooltip">
                            <span>service@bsgg.kr</span>
                        </div>
                    </div>
                    
                    <a className="footer_button" href="https://twitter.com/BsggKr"><img className="footer_img" src="img/twitter.png" /></a>
            </div>
        );
    };
}

export default injectIntl(Footer);