import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';

import Login from './page/login/index';
import RouterPage from './page/router';
import store from './reduxs/store';
import './assets/css/style.less';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Redirect exact from="/" to="/login"/>
                        <Route path="/login" component={Login}/>
                        <Route page="/index" component={RouterPage} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
