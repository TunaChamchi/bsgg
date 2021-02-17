import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Main, Detail, Detail2, Detail2skin, DetailRanker, Map, RouteM, NewMain ,Match, Character, Rank, Rank_Character, Error404, Stat, } from 'pages';

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={NewMain}/>
                <Switch>
                    <Route path="/Tier" component={Main}/>
                    <Route path="/Detail" component={Detail}/>
                    <Route path="/DetailRanker" component={DetailRanker}/>
                    <Route path="/Detail2" component={Detail2}/>
                    <Route path="/Detail2skin" component={Detail2skin}/>

                    <Route path="/Map" component={Map}/>
                    <Route path="/Route" component={RouteM}/>

                    <Route path="/Match" component={Match}/>
                    <Route path="/Character" component={Character}/>
                    
                    <Route path="/Rank" component={Rank}/>
                    <Route path="/RankCharacter" component={Rank_Character}/>
                    <Route path="/Stat" component={Stat}/>

                    <Route path="/404" component={Error404}/>
                </Switch>
            </div>
        );
    }
}

export default App;