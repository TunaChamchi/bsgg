import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import queryString from 'query-string';
import { Header, SubBanner, AdS, Footer } from 'components/banner';
import { Top, Trend, Skill } from 'components/detail';
import { Weapons, Armors } from 'components/item';
import { CharacterScore, skillTreeList } from 'lib/data';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            character: '',
            weapon: '',
            weaponList: [],
            rangeFocus: '',
            typeFocus: '',
            ad_style: {},
            skillTree: [],
            skillTree2: [],
        };
    }
    componentWillMount() {
        window.scrollTo(0, 0);

        this.init();
    };
    componentDidUpdate(prevProps, prevState){
        const { location } = this.props;
        const prevquery = queryString.parse(prevProps.location.search);
        const query = queryString.parse(location.search);

        if (query.character !== prevquery.character || query.weapon !== prevquery.weapon
            || query.range !== prevquery.range || query.type !== prevquery.type) {
            if (query.character !== prevquery.character) {
                window.scrollTo(0, 0);
            }
            this.init();
        }
    };

    init() {
        const { location } = this.props;
        const query = queryString.parse(location.search);

        this.state.weaponList = [];

        const rangeFocus = query.range || 'RANKER';
        const typeFocus = query.type || 'solo';

        const list = CharacterScore(rangeFocus, typeFocus);

        const character = query.character;

        let weaponTotal = 0;
        list.forEach(data => {
            if (data['character'] === character) {
                weaponTotal += data['data']['pick-rate'];
                this.state.weaponList.push({
                    name: data['weapon'],
                    pick: data['data']['pick-rate']
                });
            }
        });

        this.state.weaponList.sort((a, b) => b['pick'] - a['pick']);
        let weapon = query.weapon || this.state.weaponList[0]['name'];

        list.forEach(data => {
            if (data['character'] === character) {
                if (data['weapon'] === weapon) {
                    this.setState({ data: data });
                }
            }
        });

        const skillTree = [];
        const skillTree2 = skillTreeList(character, weapon);

        for (const key in skillTree2) {
            const tree = [];
            const count = { Q: 0, W: 0, E: 0, T: 0 };

            skillTree2[key].forEach(skill => {
                count[skill]++
                if ((skill === 'T' && count[skill] === 2) || count[skill] === 5) {
                    tree.push(skill);
                }
            })

            skillTree.push({
                name: key,
                tree: tree
            });
        }
        
        this.setState({ 
            weaponTotal: weaponTotal,
            rangeFocus: rangeFocus,
            typeFocus: typeFocus,
            character: character,
            weapon: weapon,
            skillTree: skillTree,
            skillTree2: skillTree2,
        });
    };

    render() {
        const { intl } = this.props;
        const { data, character, weapon, rangeFocus, typeFocus, weaponList, weaponTotal, skillTree, skillTree2 } = this.state;
        
        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'characters.'+data['character']}) + ' ' + intl.formatMessage({id: 'weapons.'+data['weapon']}),
            description: '영원회귀 : 블랙 서바이벌 통계, 캐릭터 티어, 아이템 트렌드, BS:ER Stats, Character Tier, Item Trend'
        }

        return (
            <div>
                <Header data={metaData}/>
                <SubBanner />
                <div className="S_main">
                    <Top 
                        data={data}
                        weaponData={{weaponList, weaponTotal}}
                        parameter={{character, weapon, rangeFocus, typeFocus}}
                        />
                    <div className="S_left">
                        <Trend 
                            data={data}
                            parameter={{character, weapon, rangeFocus, typeFocus}}
                            />
                        <Skill
                            data={data}
                            skillTree={skillTree}
                            skillTree2={skillTree2}
                            parameter={{character, weapon, rangeFocus, typeFocus}}
                            />
                    </div>
                    <Weapons 
                        character={character}
                        weapon={weapon}
                        range={rangeFocus}
                        type={typeFocus}
                    />
                    <Armors 
                        range={typeFocus}
                    />
                </div>
                <AdS type={'Detail'}/>
                <Footer />
            </div>
            
        );
    };
}

export default injectIntl(Detail);