import React from 'react'
import { BrowserRouter, withRouter, Switch, Route } from 'react-router-dom'

import { Home, Register, Login, PrivateRoute, ChatRoom , Contributors } from '..'
import QuizMcq  from '../Quiz/mcq/quizMcq';
import QuizSubjective from '../Quiz/subjective/quizSubjective';
import QuizNumerical from '../Quiz/numerical/quizNumerical';
import UserProfile from '../UserProfile/User3/UserProfile';

import '../../styles/index.css'
import TeamPage from '../TeamName'

const App = () => (
    <BrowserRouter>
        <Switch>
            <PrivateRoute exact path="/" component={Home} />
			<Route exact path ="/contributors" component ={Contributors} />
            <Route exact path="/sign-in" component={Login} />
            <Route exact path="/sign-up" component={Register} />
            <Route exact path="/quizsubjective" component={QuizSubjective} />
            <Route exact path="/team-page" component={TeamPage} />
            <Route exact path="/quizmcq" component={QuizMcq} />
            <Route exact path="/quiznumerical" component={QuizNumerical} />
            <Route exact path="/userprofile3" component={UserProfile} />
            <PrivateRoute exact path="/chat-room" component={ChatRoom} />
        </Switch>
    </BrowserRouter>
)

export default withRouter(App)