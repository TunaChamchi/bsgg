import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';

class Search extends Component {
    render() {
        const { intl } = this.props;

        return (            
            <div className="search">
                <input className="search1" placeholder={intl.formatMessage({id:'main.left.search.placeholder'})} />
                <button className="search2">{intl.formatMessage({id:'search'})}</button>
            </div>
        );
    };
}

export default injectIntl(Search);