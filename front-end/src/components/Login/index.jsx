import React, { Component } from "react";
import constants from "../../utils/constants";
import { TextField, Button, Divider } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "..";
import { userLogin } from "../../services/user"

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isAuthenticated: false,
      exists: false,
      errors: {},
      commonError: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("user")) {
      this.props.history.push("/");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { loginUser } = this.props;
    const { username, password } = this.state;
    const user = {
      username,
      password
    };
    this.setState({
      errors: {},
      commonError: null
    })

    userLogin(user)
      .then(res => {
        if (res.data.error) return console.warn(res);
        const { token } = res.data;
        setAuthToken(token);
        const decoded = jwt_decode(token);
        loginUser(decoded);
        if (this.props.auth) {
          localStorage.setItem("token_id", token);
          localStorage.setItem("user", JSON.stringify(decoded));
          this.setState({
            exists: true
          });
          this.props.history.push("/", this.state);
        }
    }).catch(error => {
        const len = Object.keys(error.data).length;
        this.setState({
          errors: len > 0 ? error.data : {},
          commonError: len <= 0 ? error.message : null
        });
    })
  }

  handleChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  render() {
    const { username, password, exists, commonError, errors } = this.state;
    const isEnabled = username && password;
    
    return (
      <div className="wrap-registerForm">
      <div className="registerForm">
       
        <h2 className="signInHeading">Sign In</h2>
        <Divider style={{ marginBottom: '20px'}}/>

        {!exists && commonError ? (
          
          <Alert severity="error">{ commonError }</Alert>
        ) : null}
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <TextField
            value={username}
            label="Username*"
            onChange={ev => this.handleChange("username", ev)}
            name="username"
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.username}
            helperText={errors.username}
          />
          <br />
          <TextField
            value={password}
            label="Password*"
            onChange={ev => this.handleChange("password", ev)}
            name="password"
            fullWidth
            margin="normal"
            type="password"
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password}
          />
          <div style={{ textAlign: 'left', marginTop: '30px'}}>
            <Button
              style={{ marginBottom: '20px' }}
              type="submit"
              disabled={!isEnabled}
              variant="contained" color="primary"
              size="large"
            >
              Log In
            </Button>
          </div>
          <div>
            Don't have an account? <Link to="/sign-up"> Sign Up </Link>
          </div>
        </form>
      </div>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.username,
  auth: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch({ type: constants.SET_CURRENT_USER, user })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
