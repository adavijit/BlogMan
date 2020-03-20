import React from 'react'
import { BrowserRouter, withRouter, Switch, Route } from 'react-router-dom'

import { Home, Register, Login, PrivateRoute, ChatRoom , Contributors } from '..'

import '../../styles/index.css'
import TeamPage from '../TeamName'

const App = () => (
    <BrowserRouter>
        <Switch>
            <PrivateRoute exact path="/" component={Home} />
			<Route exact path ="/contributors" component ={Contributors} />
            <Route exact path="/sign-in" component={Login} />
            <Route exact path="/sign-up" component={Register} />
            <Route exact path="/team-page" component={TeamPage} />
            <PrivateRoute exact path="/chat-room" component={ChatRoom} />
        </Switch>
    </BrowserRouter>
)

export default withRouter(App)