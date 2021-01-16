import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

class Header extends Component {
    render() {
        const { data } = this.props;

        const title = data.title;
        const description = data.description;
        const keywords = data.keywords;

        return (
            <Helmet>
                <title>{title}</title>
            </Helmet>
        );
    };
}

export default injectIntl(Header);