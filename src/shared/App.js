import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Main, Detail, Map, RouteM, NewMain ,Match, Character, Rank, Rank_Character, Error404, Talk, Talk2, Talk3  } from 'pages';

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={NewMain}/>
                <Switch>
                    <Route path="/Tier" component={Main}/>
                    <Route path="/Detail" component={Detail}/>

                    <Route path="/Map" component={Map}/>
                    <Route path="/Route" component={RouteM}/>

                    <Route path="/Match" component={Match}/>
                    <Route path="/Character" component={Character}/>
                    
                    <Route path="/Rank" component={Rank}/>
                    <Route path="/RankCharacter" component={Rank_Character}/>
                    <Route path="/Talk" component={Talk}/>
                    <Route path="/Talk2" component={Talk2}/>
                    <Route path="/Talk3" component={Talk3}/>

                    <Route path="/404" component={Error404}/>
                </Switch>
            </div>
        );
    }
}

export default App;