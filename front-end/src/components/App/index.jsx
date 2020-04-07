import React from 'react'
import { BrowserRouter, withRouter, Switch, Route } from 'react-router-dom'

import { Home, Register, Login, PrivateRoute, ChatRoom , Contributors } from '..'
import QuizMcq  from '../Quiz/mcq/quizMcq';
import UserProfile from '../UserProfile/User3/UserProfile';

import '../../styles/index.css'

const App = () => (
    <BrowserRouter>
        <Switch>
            <PrivateRoute exact path="/" component={Home} />
			<Route exact path ="/contributors" component ={Contributors} />
            <Route exact path="/sign-in" component={Login} />
            <Route exact path="/sign-up" component={Register} />
            <Route exact path="/quizmcq" component={QuizMcq} />
            <Route exact path="/userprofile3" component={UserProfile} />
            <PrivateRoute exact path="/chat-room" component={ChatRoom} />
        </Switch>
    </BrowserRouter>
)

export default withRouter(App)