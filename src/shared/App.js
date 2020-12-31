import React, { Component } from 'react';
import { Route, Switch, Link  } from 'react-router-dom';
import { Main, Detail, Detail2, Map, RouteM, NewMain ,Match, Character, Rank, Rank_Character, Loading } from 'pages';

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Main}/>
                <Switch>
                    <Route path="/Detail" component={Detail}/>
                    <Route path="/Map" component={Map}/>
                    <Route path="/Route" component={RouteM}/>
                    <Route path="/NewMain" component={NewMain}/>
                    <Route path="/Match" component={Match}/>
                    <Route path="/Character" component={Character}/>
                    <Route path="/Rank" component={Rank}/>
                    <Route path="/RankCharacter" component={Rank_Character}/>
                    <Route path="/Loading" component={Loading}/>
                </Switch>
            </div>
        );
    }
}

export default App;