import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import AdSense from 'react-adsense';

class AdS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ad_style: {
                position: 'absolute',
                visibility: 'visible'
            }
        };
    }

    componentWillMount() {
        if (window.innerWidth < 1850) {
            const _ad_style = {...this.state.ad_style, visibility: 'hidden'};
            this.setState({ad_style: _ad_style});
        }
        window.addEventListener('scroll', this.scrollHandle);
        window.addEventListener('resize', this.resizeHandle);
    };

    scrollHandle = () => {
        const { ad_style } = this.state;

        if (window.scrollY > 465) {
            const _ad_style = {...ad_style, position: 'fixed', top: 15};
            this.setState({ad_style: _ad_style});
        } else {
            const _ad_style = {...ad_style, position: 'absolute', top: 480};
            this.setState({ad_style: _ad_style});
        }
    }
    resizeHandle = () => {
        const { ad_style } = this.state;

        if (window.innerWidth > 1850) {
            const _ad_style = {...ad_style, visibility: 'visible'};
            this.setState({ad_style: _ad_style});
        } else {
            const _ad_style = {...ad_style, visibility: 'hidden'};
            this.setState({ad_style: _ad_style});
        }        
    }

    render() {
        const { ad_style } = this.state;

        return (
            <div className="Ad">
                <div className="Ad_box_L" style={ad_style} >
                    <AdSense.Google
                        client='ca-pub-2624497775833940'
                        slot='7806394673'
                    />
                </div>
                <div className="Ad_box_R" style={ad_style}>
                    <AdSense.Google
                        client='ca-pub-2624497775833940'
                        slot='7806394673'
                    />
                </div>
            </div>
        );
    };
}

export default injectIntl(AdS);