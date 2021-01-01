import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Armor, itemBgI, statList } from 'lib/data';
import armorData from 'data/inGame/armor.json';
import mapImg from 'img/map2.png';

class ItemOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemOrderFocus:0,
            routeFocus:0,
        }
    }

    
    itemOrderTabHandler = (idx) => {
        this.setState({itemOrderFocus: idx});
    };
    itemOrderTabView = () => {
        const { intl, stat, itemOrder } = this.props;
        const { itemOrderFocus } = this.state;

        console.log('itemOrder', itemOrder);
        return itemOrder.slice(0, 10).map((order, idx) => 
            <div className={'item_tab'+(idx===itemOrderFocus ? ' actived' : '')} key={"item_tab_"+idx}
                onClick={(e) => this.itemOrderTabHandler(idx)}>
                <div className="item_tab_imgbox_all">
                    {
                        order['itemList'].map((item, idx) =>
                            <div className="item_tab_imgbox" key={"tab_imgbox_"+idx}>
                                <img className="item_tab_bg" src={"img/item/BackGround/"+item['itemGrade']+".jpg"} />
                                <img className="item_tab_img" src={"img/item/"+item['name']+".png"} />
                                <div className="S_item_tooltip4">
                                    <span>ㅇㅇ</span>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className='item_tab_span'>
                    <span className='item_tab_span1'>픽률 {(order['pick']*100).toFixed(1)}%</span>
                    <span className='item_tab_span2'>승률 {(order['win']/order['total']*100).toFixed(1)}%</span>
                    <span className='item_tab_span3'>{order['total']}</span>
                </div>
            </div>
        )
    }

    itemRouteTabHandler = (idx) => {
        this.setState({routeFocus: idx});
    };
    itemRouteTabView = () => {
        const { intl, stat, skillTree } = this.props;
        const { skillTreeFocus } = this.state;

        const list = [...skillTree];
        
        return list.slice(0, 4).map((tree, idx) => 
            <div className='skill_tabs' key={'treeTab'+idx} 
                onClick={(e) => this.skillTreeTabHandler(idx)}>
                <div className={"skill_tab" + (idx===skillTreeFocus ? ' actived' : '')}  >
                    <div className="skill_tab_imgbox">
                        {
                            tree['tree'].map((skill, idx) => 
                                <div className={"skill_tab_"+skill} key={"skill_tab_"+idx}>{skill}</div>
                            )
                        }
                        <span className="skill_tab_mark1">&gt;</span>
                        <span className="skill_tab_mark2">&gt;</span>
                        <span className="skill_tab_mark3">&gt;</span>
                    </div>
                    <div className='skill_tab_span'>
                        <span className='skill_tab_span1'>픽률 {(tree['pick']*100).toFixed(1)}%</span>
                        <span className='skill_tab_span2'>승률 {(tree['win']/tree['total']*100).toFixed(1)}%</span>
                        <span className='skill_tab_span3'>{tree['total']}</span>
                    </div>
                </div>
            </div>
        )
    }
    itemRouteMapView = () => {

    }
    itemRouteDropView = () => {

    }

    render() {
        const { intl } = this.props;

        return (
            <div className="item_order">
                <div className='item_tabs'>
                    {this.itemOrderTabView()}
                </div>
                <div className="item_route">
                    <div className="tabHeaders">
                        <div className="item_route_tab actived">루트1</div>
                        <div className="item_route_tab">루트2</div>
                        <div className="item_route_tab">루트3</div>
                        <div className="item_route_tab">루트4</div>
                        <div className="item_route_tab">루트5</div>
                    </div>
                    <div className="item_route_map">
                        <img className="item_route_map2" src={mapImg} /> 
                        {
                            // Object.keys(mapList).map((key, idx) => {
                            //     const en = mapList[key].toLowerCase();
                            //     return <img className={"Route_R_Mapimg_"+en} src={'img/map/'+key+'.png'} key={'Mapimg_'+idx} /> 
                                
                            // })
                        }
                        <div className="Route_R_Mapspan_box">
                            {
                                // Object.keys(mapList).map((key, idx) => {
                                //     const en = mapList[key].toLowerCase();
                                //     //const index = selectRoute['route'].indexOf(key);
                                //     //const isSelect = selectMap === key ? ' actived' : '';
                                //     //if (index >= 0) {
                                //         return (
                                //             <div key={'Mapspan_'+idx}>
                                //                 <span className={"Route_R_Mapspan_"+en+"1"} key={'Mapspan_'+idx} > {idx+1} </span>
                                //                 <span className={"Route_R_Mapspan_"+en}> {intl.formatMessage({id: mapList[key]})} </span>
                                //             </div>
                                //         )
                                //     //}
                                // })
                            }
                        </div>
                    </div>
                </div>
                <div className="item_route_spawn">
                <div className="item_route_spawnY">
                    <div className="item_route_spawn_title">1 골목길</div>
                        <div className="item_route_spawn_Make">
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                        </div>
                        <div className="item_route_spawn_Need">
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                        </div>
                    </div>
                    <div className="item_route_spawnY">
                        <div className="item_route_spawn_title">2 골목길</div>
                        <div className="item_route_spawn_Make">
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                        </div>
                        <div className="item_route_spawn_Need">
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                        </div>
                    </div>
                    <div className="item_route_spawnY-R">
                        <div className="item_route_spawn_title">3 골목길</div>
                        <div className="item_route_spawn_Make">
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                        </div>
                        <div className="item_route_spawn_Need">
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                        </div>
                    </div>
                    <div className="item_route_spawnY">
                        <div className="item_route_spawn_title">4 골목길</div>
                        <div className="item_route_spawn_Make">
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                        </div>
                        <div className="item_route_spawn_Need">
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                        </div>
                    </div>
                    <div className="item_route_spawnY">
                        <div className="item_route_spawn_title">5 골목길</div>
                        <div className="item_route_spawn_Make">
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                        </div>
                        <div className="item_route_spawn_Need">
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                        </div>
                    </div>
                    <div className="item_route_spawnY-R">
                        <div className="item_route_spawn_title">6 골목길</div>
                        <div className="item_route_spawn_Make">
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                        </div>
                        <div className="item_route_spawn_Need">
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                            <div className="item_route_spawn_Make_img">
                                <img className="item_route_spawn_Make_img1" src="img/item/BackGround/영웅.jpg" />
                                <img className="item_route_spawn_Make_img2" src="img/item/AK-12.png" />
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        );
    };
}

export default injectIntl(ItemOrder);