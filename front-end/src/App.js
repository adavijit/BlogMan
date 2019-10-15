import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      const Welcome = ({user, onSignOut})=> {
  return (
    <div>
      Welcome <strong>{user.username}</strong>!
      <a href="javascript:;" onClick={onSignOut}>Sign out</a>
    </div>
  )
}

class LoginForm extends React.Component {
 
  handleSignIn(e) {
    e.preventDefault()
    let username = this.refs.username.value
    let password = this.refs.password.value
    this.props.onSignIn(username, password)
  }
  
  render() {
    return (
      <form onSubmit={this.handleSignIn.bind(this)}>
        <h3>Sign in</h3>
        <input type="text" ref="username" placeholder="enter you username" />
        <input type="password" ref="password" placeholder="enter password" />
        <input type="submit" value="Login" />
      </form>
    )
  }

}


class App extends React.Component {
  
  constructor(props) {
    super(props)
    // the initial application state
    this.state = {
      user: null
    }
  }
  
 
  signIn(username, password) {
   
    this.setState({
      user: {
        username,
        password,
      }
    })
  }
  
  signOut() {
    
    this.setState({user: null})
  }
  
  render() {
    
    return (
      <div>
        <h1>Hello Blogger ! Please Sign IN</h1>
        { 
          (this.state.user) ? 
            <Welcome 
             user={this.state.user} 
             onSignOut={this.signOut.bind(this)} 
            />
          :
            <LoginForm 
             onSignIn={this.signIn.bind(this)} 
            />
        }
      </div>
    )
    
  }
  
}

ReactDOM.render(<App/>, document.getElementById("app"))

    </div>
  );
}

export default App;
