import React, { Component } from 'react';
import { TextField, Button, Divider } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { GoogleLogin } from 'react-google-login';
import constants from '../../utils/constants';
import { setAuthToken } from '..';
import { userLogin, userGoogleLogin } from '../../services/user';
import { loginValidator } from '../../validators/auth';
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isAuthenticated: false,
      exists: false,
      errors: {},
      commonError: null,
    };
    this.googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkForm = this.checkForm.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      this.props.history.push('/');
    }
  }

  checkForm() {
    const { username, password } = this.state;
    const body = {
      username,
      password,
    };
    const { errors } = loginValidator.validate(body);
    if (errors && Object.keys(errors).length > 0) {
      this.setState({
        errors: errors,
      });
      return false;
    }
    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { loginUser } = this.props;
    const { username, password } = this.state;
    const user = {
      username,
      password,
    };
    this.setState({
      errors: {},
      commonError: null,
    });

    if (!this.checkForm()) return;

    userLogin(user)
      .then((res) => {
        if (res.data.error) return console.warn(res);
        const { token } = res.data;
        setAuthToken(token);
        const decoded = jwt_decode(token);
        loginUser(decoded);
        if (this.props.auth) {
          localStorage.setItem('token_id', token);
          localStorage.setItem('user', JSON.stringify(decoded));
          this.setState({
            exists: true,
          });
          this.props.history.push('/', this.state);
        }
      })
      .catch((error) => {
        const len = Object.keys(error.data).length;
        this.setState({
          errors: len > 0 ? error.data : {},
          commonError: len <= 0 ? error.message : null,
        });
      });
  }

  handleChange(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  handleGoogleRes = (response) => {
    if (response && response.accessToken) {
      const { loginUser } = this.props;

      userGoogleLogin({
        token: response.accessToken
      })
        .then((res) => {
          if (res.data.error) return console.warn(res);
          const { token } = res.data;
          setAuthToken(token);
          const decoded = jwt_decode(token);
          loginUser(decoded);
          if (this.props.auth) {
            localStorage.setItem('token_id', token);
            localStorage.setItem('user', JSON.stringify(decoded));
            this.setState({
              exists: true,
            });
            this.props.history.push('/', this.state);
          }
        })
        .catch((error) => {
          const len = Object.keys(error.data).length;
          this.setState({
            errors: len > 0 ? error.data : {},
            commonError: error.data.default,
          });
        });
    }
  };

  handleGoogleError = (error) => {
    console.log(error);
  };

  render() {
    const { username, password, exists, commonError, errors } = this.state;
    const isEnabled = username && password;
    return (
      <div className="wrap-registerForm">
        <div className="registerForm">
          <h2 className="signInHeading">Sign In</h2>
          <Divider style={{ marginBottom: '20px' }} />

          {!exists && commonError ? (
            <Alert severity="error">{commonError}</Alert>
          ) : null}
          <form onSubmit={this.handleSubmit} autoComplete="off">
            <TextField
              value={username}
              label="Username*"
              onChange={(ev) => this.handleChange('username', ev)}
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
              onChange={(ev) => this.handleChange('password', ev)}
              name="password"
              fullWidth
              margin="normal"
              type="password"
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password}
            />
            <div style={{ textAlign: 'left', marginTop: '30px' }}>
              <Button
                style={{ marginBottom: '20px' }}
                type="submit"
                disabled={!isEnabled}
                variant="contained"
                color="primary"
                size="large"
              >
                Log In
              </Button>
            </div>
            <div>
              Don't have an account? <Link to="/sign-up"> Sign Up </Link>
            </div>
            <GoogleLogin
              clientId={this.googleClientId}
              buttonText="Login with Google"
              onSuccess={this.handleGoogleRes}
              onFailure={this.handleGoogleError}
              cookiePolicy={'single_host_origin'}
              fetchBasicProfile={false}
            ></GoogleLogin>
            <div>
              Login with Github <Link to="/auth/github"> SignIn</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.username,
  auth: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch({ type: constants.SET_CURRENT_USER, user }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
