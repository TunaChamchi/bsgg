import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';

class Detail extends Component {
    render() {
        const { intl } = this.props;

        return (
            <div>
            </div>
        );
    };
}

export default injectIntl(Detail);