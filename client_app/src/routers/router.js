import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../components/auth/login'
import Register from '../components/auth/register';
import Recovery from '../components/auth/recovery_pass';
import indexHome from '../components/home/IndexHome';

export default function router({ store, history }) {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/recovery" component={Recovery} />
            <Route exact path="/" component={indexHome} />
        </Switch>
    );
}
