import React, { Component, Fragment } from 'react';
import { TextField, Button, Divider } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { GoogleLogin } from 'react-google-login';
import constants from '../../utils/constants';
import { setAuthToken } from '..';
import { userRegister, userGoogleSignup } from '../../services/user';
import { registerValidator } from '../../validators/auth';

import Logo from '../../assets/logo.png';
import Grid from '@material-ui/core/Grid';
import './register.css';

import axios from 'axios';


class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      username: '',
      password: '',
      email: '',
      name: '',
      birth: '',
      isAuthenticated: false,
      error: '',
      errors: {},
      isGoogleSignup: false,
      googleToken: null,
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
    const { name, username, password, email, birth } = this.state;
    const body = {
      name,
      username,
      password,
      email,
      birth,
    };
    const { errors } = registerValidator.validate(body);
    if (errors && Object.keys(errors).length > 0) {
      this.setState({
        errors: errors,
        error: errors[Object.keys(errors)[0]],
      });
      return false;
    }
    return true;
  }

 

  handleSubmit(e) {
    e.preventDefault();
    const { createUser, loginUser } = this.props;
    const { username, password, name, email, birth } = this.state;
    const user = {
      username,
      password,
      name,
      birth,
      email,
    };
    this.setState({
      error: '',
      errors: {},
    });

    if (!this.checkForm()) return;


    axios.post(`http://apilayer.net/api/check?access_key=ee15a00aaef47d56b0ee4a52110b1c89&email=${email}&smtp=1&format=1`)
    .then(res => {
      // res.setHeader('Access-Control-Allow-Origin', '*');
      // res.setHeader('Access-Control-Allow-Headers', 'Access-Control-*', origin);
      // console.log(`${APILAYER_API_KEY}`);
      // console.log(res.data);

      if(res.data.smtp_check === true && res.data.format_valid === true){
          console.log(res.data.smtp_check, res.data.format_valid);
        this.setState({
          error: '',
          errors: {},
        })

        userRegister(user)
        .then((res) => {
          createUser(res.data.userSaved);
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
            error:
              len > 0 ? error.data[Object.keys(error.data)[0]] : error.message,
            errors: len > 0 ? error.data : {},
          });
        });
        
        
      }else{
        this.setState({
          error: 'Invalid email!',
          errors: {'message' : 'The email address provided doesn\'t exist!',
                   'data': 'Invalid email!'},
        })
      }
      
    });


    
  }

  handleChange(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  nextStep = () => {
    let step = this.state.step;
    step = step >= 2 ? 3 : step + 1;
    this.setState({
      step,
    });
  };

  prevStep = () => {
    let step = this.state.step;
    step = step <= 1 ? 1 : step - 1;
    this.setState({
      step,
    });
  };

  nextBtn() {
    let step = this.state.step;
    if (step < 2) {
      return (
        <Button
          style={{ marginTop: '10px' }}
          variant="contained"
          color="primary"
          size="large"
          onClick={this.nextStep}
        >
          Next
        </Button>
      );
    }

    return null;
  }

  prevBtn(isEnabled) {
    let step = this.state.step;
    if (step !== 1) {
      return (
        <Fragment>
          <Button
            style={{ marginTop: '10px' }}
            onClick={this.prevStep}
            variant="contained"
            color="primary"
            size="large"
          >
            Back
          </Button>
          <Button
            style={{ marginTop: '10px' }}
            type="submit"
            disabled={!isEnabled}
            variant="contained"
            color="primary"
            size="large"
          >
            Register
          </Button>
        </Fragment>
      );
    }

    return null;
  }

  handleGoogleRes = (response) => {
    if (response && response.accessToken) {
      this.setState({
        googleToken: response.accessToken,
        isGoogleSignup: true,
        errors: {}
      });
    }
  };

  handleGoogleError = (error) => {
    console.log(error);
  };

  doGoogleSignup = (e) => {
    e.preventDefault();
    const { createUser, loginUser } = this.props;

    userGoogleSignup({
      token: this.state.googleToken,
      username: this.state.username,
    })
      .then((res) => {
        createUser(res.data.userSaved);
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
          error:
            len > 0 ? error.data[Object.keys(error.data)[0]] : error.message,
          errors: len > 0 ? error.data : {},
        });
      });
  };

  render() {
    const {
      step,
      name,
      birth,
      username,
      password,
      exists,
      error,
      email,
      errors,
    } = this.state;
    const isEnabled = name && email && username && password;
    return (
      <div className="wrap-registerForm">
        {!this.state.isGoogleSignup && (
          <div className="registerForm">
            <div className="logo-wrapper">
              <img src={Logo} className="logo"/>
            </div>
            <h4 className="signInHeading">Sign up at Blogman</h4>
            <Divider style={{ marginBottom: '20px' }} />
            {!exists && error ? <Alert severity="error">{error}</Alert> : null}
            <form onSubmit={this.handleSubmit} autoComplete="off">
              <PersonalDetails
                step={step}
                handleChange={this.handleChange}
                name={name}
                email={email}
                birth={birth}
                errors={errors}
              />
              <UserDetails
                step={step}
                handleChange={this.handleChange}
                username={username}
                password={password}
                errors={errors}
              />
              <div className={step > 1 ? 'buttons' : ''}>
                {this.prevBtn(isEnabled)}
                {this.nextBtn()}
              </div>
              <div style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
                Have an account? <Link to="/sign-in"> Sign In </Link>
              </div>

              <Grid container spacing={2}>
                <Grid item xs={4} md={4}>
                  <hr/>
                </Grid>
                <Grid item xs={4} md={4}>
                  <p className="or-text">Or Signup with</p>
                </Grid>
                <Grid item xs={4} md={4}>
                  <hr/>
                </Grid>
              </Grid>

              {/* <GoogleLogin
                clientId={this.googleClientId}
                buttonText="Signup with Google"
                onSuccess={this.handleGoogleRes}
                onFailure={this.handleGoogleError}
                cookiePolicy={'single_host_origin'}
                fetchBasicProfile={false}
              ></GoogleLogin> */}

                <GoogleLogin
                  clientId={this.googleClientId}
                  render={renderProps => (
                    <Button variant="contained" color="secondary" 
                    onClick={renderProps.onClick} disabled={renderProps.disabled}
                    style={{ textTransform: 'none', width: '100%'}}><i className="fab fa-google" style={{ marginRight: '5px'}}></i>Google</Button>
                  )}
                  buttonText="Login"
                  onSuccess={this.handleGoogleRes}
                  onFailure={this.handleGoogleError}
                  cookiePolicy={'single_host_origin'}
                  fetchBasicProfile={false}
                />
            </form>
          </div>
        )}

        {this.state.isGoogleSignup && (
          <form onSubmit={this.doGoogleSignup} autoComplete="off">
            <h2 className="signInHeading">Google Sign Up</h2>
            <Divider style={{ marginBottom: '20px' }} />
            {this.state.errors.default ? <Alert severity="error">{this.state.errors.default}</Alert> : null}
            <TextField
              value={this.state.username}
              label="Username*"
              onChange={(ev) => this.handleChange('username', ev)}
              name="username"
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!this.state.errors.username}
              helperText={this.state.errors.username}
            />
            <Button
              style={{ marginTop: '10px' }}
              type="submit"
              disabled={!this.state.username}
              variant="contained"
              color="primary"
              size="large"
            >
              Register
            </Button>
          </form>
        )}
      </div>
    );
  }
}

function PersonalDetails(props) {
  if (props.step !== 1) {
    return null;
  }

  return (
    <Fragment>
      <TextField
        value={props.name}
        label="Name*"
        onChange={(ev) => props.handleChange('name', ev)}
        name="name"
        fullWidth
        margin="normal"
        variant="outlined"
        error={!!props.errors.name}
      />
      <br />
      <TextField
        value={props.email}
        label="Email*"
        type="email"
        onChange={(ev) => props.handleChange('email', ev)}
        name="email"
        fullWidth
        margin="normal"
        variant="outlined"
        error={!!props.errors.email}
      />
      <br />
      <TextField
        label="Birthday"
        onChange={(ev) => props.handleChange('birth', ev)}
        type="date"
        fullWidth
        value={props.birth}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        variant="outlined"
        error={!!props.errors.birth}
      />
      <br />
    </Fragment>
  );
}

function UserDetails(props) {
  if (props.step !== 2) {
    return null;
  }

  return (
    <Fragment>
      <TextField
        value={props.username}
        label="Username*"
        onChange={(ev) => props.handleChange('username', ev)}
        name="username"
        fullWidth
        margin="normal"
        variant="outlined"
        error={!!props.errors.username}
      />
      <br />
      <TextField
        value={props.password}
        label="Password*"
        onChange={(ev) => props.handleChange('password', ev)}
        name="password"
        fullWidth
        margin="normal"
        type="password"
        variant="outlined"
        error={!!props.errors.password}
      />
      <br />
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  user: state.userRegister,
  auth: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch({ type: constants.SET_CURRENT_USER, user }),
  createUser: (user) => dispatch({ type: constants.CREATE_USER, user }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
