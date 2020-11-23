import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import { MainBanner } from 'components/banner'
import { Search, Characters } from 'components/Main/left'
import { Rank } from 'components/Main/right'

class Main extends Component {
    render() {
        const { intl } = this.props;

        return (
            <div>
                <MainBanner />
                <div className='main'>
                    <div className='main-left'>
                        <Search />
                        <Characters />
                    </div>
                    <div className='main-right'>
                        <Rank />
                    </div>
                </div>
            </div>
        );
    };
}

export default injectIntl(Main);