import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

class Skill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skill: ['T', 'Q', 'W', 'E', 'R', 'D'],
            skillTree: [],
            skillTreeFocus: 0,
        };
    }
    
    skillView = () => {
        const { intl, parameter } = this.props;
        const { skill } = this.state;

        return skill.map((name, idx) => {
            const img = name === 'D' ? 
                'img/Weapons/'+parameter['weapon']+'.jpg' : 
                'img/Skill/'+parameter['character']+'/'+parameter['character']+'_'+name+'.jpg';
            const skilName = name === 'D' ? 
                intl.formatMessage({ id: 'skill.'+parameter['weapon']+'.name' }) : 
                intl.formatMessage({ id: 'skill.'+parameter['character']+'.'+name+'.name' });
            const detail = name === 'D' ? 
                intl.formatMessage({ id: 'skill.'+parameter['weapon']+'.Detail' }) : 
                intl.formatMessage({ id: 'skill.'+parameter['character']+'.'+name+'.Detail' });

            return (
                <div className='S_Skill_tab' key={'type' + idx}>
                   { /*<div className="S_skill_toolbox">
                        <img className='S_Skill_img' src={img} />
                         <div className="S_skill_tooltip">
                            <span><b>{skilName}</b></span><br />
                            <span>{detail}</span>
                        </div>
            
                    <div className="S_SKill_key"><span>{name}</span></div>          
                </div>*/}</div>
            )
        });
    };
    skillTreeTabHandler = (idx) => {
        this.setState({skillTreeFocus: idx});
    };
    skillTreeTabView = () => {
        const { intl, skillTree } = this.props;
        const { skillTreeFocus } = this.state;

        const list = [...skillTree];

        for (var i = 0 ; i < 3-skillTree.length ; i++) {
            console.log('i', i);
            list.push({name:''});
        }
        
        return list.map((tree, idx) => 
            <div className='skill_tabs' key={'treeTab'+idx} >
                <div className={"skill_tab" + (idx===skillTreeFocus ? ' actived' : '')} 
                    onClick={(e) => tree['name']?this.skillTreeTabHandler(idx):''}>
                    <div className="skill_tab_imgbox">
                        <div className="skill_tab_Q">Q</div>
                        <div className="skill_tab_W">W</div>
                        <div className="skill_tab_E">E</div>
                        <div className="skill_tab_T">T</div>
                        <span className="skill_tab_mark1">&gt;</span>
                        <span className="skill_tab_mark2">&gt;</span>
                        <span className="skill_tab_mark3">&gt;</span>
                    </div>
                    <div className='skill_tab_span'>
                        <span className='skill_tab_span1'>픽률 27.6%</span>
                        <span className='skill_tab_span2'>승률 34.6%</span>
                        <span className='skill_tab_span3'>340</span>
                    </div>
                </div>
            </div>
        )
    }
    skillTreePick = () => {
        const { skillTree } = this.props;
        const { skillTreeFocus } = this.state;

        const tree = skillTree[skillTreeFocus]['tree'];

        return tree.map((name, idx) => 
            <div className={"skill_span skill_" + name} key={'tr'+idx} >
                {name}
            </div>
        )
    }
    skillTreeTdView = () => {
        const { parameter } = this.props;
        const { skill } = this.state;

        return skill.slice(0, 5).map((name, idx) =>
            <div className='skill_td' key={'td'+idx}>
                <div className={'skill_tr skill_'+name} key={'tr'+idx} >
                    <img className="skill_img" key={'tree'+idx} src={'img/Skill/'+parameter['character']+'/'+parameter['character']+'_'+name+'.jpg'} />
                </div>
                {this.skillTreeTrView(name)}
            </div>
        )
    }
    skillTreeTrView = (name) => {
        const { skillTree, skillTree2 } = this.props;
        const { skillTreeFocus } = this.state;

        const treeName = skillTree[skillTreeFocus]['name'];
        const tree = skillTree2[treeName];

        return tree.map((_name, idx) =>
            <div className={"skill_tr" + (_name===name ? ' skill_'+name : '')} key={'tr'+idx} 
                dangerouslySetInnerHTML={ {__html: _name===name ? name : '&nbsp;'} }>
            </div>
        )
    }

    render() {
        const { intl } = this.props

        return (            
            <div className="S_Skill">
                <div className="S_Skill2">
                    <span>{intl.formatMessage({ id: 'detail.스킬트리' })}</span>
                </div>
                    <div className="S_Skill1">
                        {this.skillView()}
                    </div>
                    <div className="skill_tree_tab">
                    {this.skillTreeTabView()}
                    </div>
                    <div className="skill_centent">
                        <div className="skill_imgbox">
                            {this.skillTreePick()}
                            <span className="skill_mark1">&gt;</span>
                            <span className="skill_mark2">&gt;</span>
                            <span className="skill_mark3">&gt;</span>
                        </div>
                        <div className="skill_box0">
                            <div className='skill_td'>
                                <img className='skill_img2' src="img/weapons/쌍검.jpg" />
                                {
                                    [...Array.from({length: 20}, (v,i) => i+1)].map(i => 
                                        <div className="skill_level" key={'level'+i}>{i}</div>
                                    )
                                }
                            </div>
                            {this.skillTreeTdView()}
                        </div>
                    </div>
            </div>
        );
    };
}

export default injectIntl(Skill);