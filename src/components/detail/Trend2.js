import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Max, Min, Avg } from 'lib/data';

class Thend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            range: ['RANKER', 'ALL'],
            type: ['solo', 'duo', 'squad'],
            trend: ['win-rate', 'pick-rate', 'avg-kill', 'avg-rank'],
        };
    }
    
    rangeView = () => {
        const { parameter } = this.props;
        const { range } = this.state;

        return range.map((name, idx) =>
            <Link to={'Detail?range='+name+'&type='+parameter['typeFocus']+'&character='+parameter['character']+'&weapon='+parameter['weapon']} key={'range' + idx}>
                <div className={'tabHeader5 ' + (name === parameter['rangeFocus'] ? 'actived' : '')}>
                    {name}
                </div>
            </Link>
        );
    };
    typeView = () => {
        const { intl, parameter } = this.props;
        const { type } = this.state;
        
        return type.map((name, idx) =>
            <Link to={'Detail?range='+parameter['rangeFocus']+'&type='+name+'&character='+parameter['character']+'&weapon='+parameter['weapon']} key={'type' + idx}>
                <div className={'tabHeader6 ' + (name === parameter['typeFocus'] ? 'actived' : '')}>
                    {intl.formatMessage({ id: name })}
                </div>
            </Link>
        );
    };

    trendView = (name, idx) => {
        const { intl, data, parameter } = this.props

        const avg = Avg(parameter['rangeFocus'], parameter['typeFocus']);
        const max = Max(parameter['rangeFocus'], parameter['typeFocus']);
        const min = Min(parameter['rangeFocus'], parameter['typeFocus']);

        const width = ((data['data'][name]  - min[name])  / (max[name]  - min[name]) ) * 320;
        const _avg  = ((avg[name]           - min[name])  / (max[name]  - min[name]) ) * 320 - 22;

        return (
            <div className="S_Trend_square" key={'square_'+idx}>
                <div className="S_Trend_square1"><span>{intl.formatMessage({id: name})}</span></div>
                <div className="S_Trend_square2"><span>{data['data'][name].toFixed(1)}{name.indexOf('rate')>0?"%":""}</span></div>
                <div className="S_Trend_square3"><span>#{data['rank'][name]}</span></div>
                <div className="S_Trend_Graph"></div>
                <div className="S_Trend_Graph2" style={{width: width}}></div>
                <div className="S_Trend_avg" style={{marginLeft: _avg}}>
                    <div className="S_Trend_Tri"></div>
                    <div className="S_Trend_avg1">
                        <span>{intl.formatMessage({id: 'detail.avg'})} {avg[name]}{name.indexOf('rate')>0?"%":""}</span>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { intl } = this.props;
        const { trend } = this.state;


        return (
            <div>
                <div className="S_Trend">
                    <div className="S_Trend0">
                        <span className="S_Trend_T">Trend</span>
                        {/*{<div className="S_Trend_tab">
                            <div className="tabHeaders">
                                {this.rangeView()}
                            </div>
                        </div>
                    </div>
                    <div className="S_Trend1">
                        <div className="tabHeaders">
                            {this.typeView()}
                        </div>}*/}
                    </div>
                    <div className="S_Trend2">
                        {
                            trend.map((name, idx) =>
                                this.trendView(name, idx)
                            )
                        }
                    </div>
                </div>
                <div className="master">
                    <div className="master0">Master</div>
                    <div className="master_rank">
                        <span className="master_rank1">1</span>
                        <span className="master_rank2">에미디</span>
                        <span className="master_rank3">150게임</span>
                    </div>
                    <div className="master_rank">
                        <span className="master_rank1">2</span>
                        <span className="master_rank2">에미디</span>
                        <span className="master_rank3">150게임</span>
                    </div>
                    <div className="master_rank">
                        <span className="master_rank1">3</span>
                        <span className="master_rank2">에미디</span>
                        <span className="master_rank3">150게임</span>
                    </div>
                    <div className="master_rank">
                        <span className="master_rank1">4</span>
                        <span className="master_rank2">에미디</span>
                        <span className="master_rank3">150게임</span>
                    </div>
                    <div className="master_rank">
                        <span className="master_rank1">5</span>
                        <span className="master_rank2">에미디</span>
                        <span className="master_rank3">150게임</span>
                    </div>
                    <button className="master_button">더 보기</button>
                </div>
        </div>
        );
    };
}

export default injectIntl(Thend);