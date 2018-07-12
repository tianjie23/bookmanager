import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Main from '../components/layout/index';

import Index from './index/index';
import BookIndex from './book/index/index';
import UserIndex from './user/index/index';
import BorrowIndex from './person/borrow';
import ReturnIndex from './person/return';
import NoteIndex from './person/note';

class RouterPage extends React.Component{
    render(){
        return (
            <Main>
                <Switch>
                    <Route path="/index/index" component={Index} />
                    <Route path="/index/book/index" component={BookIndex} />
                    <Route path="/index/user/index" component={UserIndex} />
                    <Route path="/index/person/borrow" component={BorrowIndex} />
                    <Route path="/index/person/return" component={ReturnIndex} />
                    <Route path="/index/person/note" component={NoteIndex} />
                    <Redirect to="/index/index" />
                </Switch>
            </Main>
        )
    }
}

export default RouterPage;