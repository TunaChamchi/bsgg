import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import AdSense from 'react-adsense';

class Footer extends Component {
    render() {
        const { intl } = this.props;

        return (
            <div className="footer">
                <div className="Ad_box_B">                    
                    <AdSense.Google
                        client='ca-pub-2624497775833940'
                        slot='7806394673'
                    />
                </div>
            </div>
        );
    };
}

export default injectIntl(Footer);