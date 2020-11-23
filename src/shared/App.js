import React, { Component } from 'react';
import { Route, Switch, Link  } from 'react-router-dom';
import { Main, Detail, Item } from 'pages';

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Main}/>
                <Switch>
                    <Route path="/Detail" component={Detail}/>
                    <Route path="/Item" component={Item}/>
                </Switch>
            </div>
        );
    }
}

export default App;