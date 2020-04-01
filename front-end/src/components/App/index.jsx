import React from 'react'
import { BrowserRouter, withRouter, Switch, Route } from 'react-router-dom'

import { Home, Register, Login, PrivateRoute, ChatRoom , Contributors , UserProfile } from '..'
import QuizMcq  from '../Quiz/mcq/quizMcq';

import '../../styles/index.css'

const App = () => (
    <BrowserRouter>
        <Switch>
            <PrivateRoute exact path="/" component={Home} />
			<Route exact path ="/contributors" component ={Contributors} />
            <Route exact path="/sign-in" component={Login} />
            <Route exact path="/sign-up" component={Register} />
			<Route exact path="/userProfile" component={UserProfile} />
            <Route exact path="/quizmcq" component={QuizMcq} />
            <PrivateRoute exact path="/chat-room" component={ChatRoom} />
        </Switch>
    </BrowserRouter>
)

export default withRouter(App)