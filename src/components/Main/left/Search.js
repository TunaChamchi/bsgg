import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';

class Search extends Component {
    render() {
        const { intl } = this.props;

        return (            
            <div className="search">
                <div className="trisearch"></div>
                <input className="search1" placeholder={intl.formatMessage({id:'main.left.search.placeholder'})} />
            </div>
        );
    };
}

export default injectIntl(Search);