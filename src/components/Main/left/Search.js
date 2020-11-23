import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';

class Search extends Component {
    render() {
        const { intl } = this.props;

        return (            
            <div class="search">
                <input class="search1" placeholder={intl.formatMessage({id:'main.left.search.placeholder'})} />
                <button class="search2">{intl.formatMessage({id:'search'})}</button>
            </div>
        );
    };
}

export default injectIntl(Search);