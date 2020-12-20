import React, { Component } from 'react';
import { Route, Switch, Link  } from 'react-router-dom';
import { Main, Detail, Map, RouteM, NewMain } from 'pages';

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Main}/>
                <Switch>
                    <Route path="/Detail" component={Detail}/>
                    <Route path="/Map" component={Map}/>
                    <Route path="/route" component={RouteM}/>
                    <Route path="/NewMain" component={NewMain}/>
                </Switch>
            </div>
        );
    }
}

export default App;