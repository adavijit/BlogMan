import React, { Component, Fragment } from "react";
import constants from "../../utils/constants";
import { TextField, Button, Divider } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "..";
import { userRegister } from "../../services/user"

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      username: "",
      password: "",
      name: "",
      lastname: "",
      bio: "",
      birth: "",
      isAuthenticated: false,
      error: "",
      hidden: true
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
    const { createUser, loginUser } = this.props;
    const { username, password, name, lastname, bio, birth } = this.state;
    const user = {
      username,
      password,
      name,
      lastname,
      bio,
      birth
    };


    userRegister({ user })
      .then(res => {
        if (res.data.error) {
          this.setState({
            error: res.data.error,
            hidden: false
          });
          this.props.history.push("/sign-up");
          return console.warn(res.data.error);
        }
        createUser(res.data.userSaved);
        const { token } = res.data;
        console.log(token);
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
      });
  }

  handleChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  nextStep = () => {
    let step = this.state.step;
    step = step >= 2 ? 3 : step + 1;
    this.setState({
      step
    });
  };

  prevStep = () => {
    let step = this.state.step;
    step = step <= 1 ? 1 : step - 1;
    this.setState({
      step
    });
  };

  nextBtn() {
    let step = this.state.step;
    if (step < 2) {
      return (
        <Button
          style={{ marginTop: "10px" }}
          variant="contained" color="primary"
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
          <Button style={{ marginTop: "10px" }} onClick={this.prevStep}  variant="contained" color="primary"
              size="large">
            Back
          </Button>
          <Button
            style={{ marginTop: "10px" }}
            type="submit"
            disabled={!isEnabled}
            variant="contained" color="primary"
            size="large"
          >
            Register
          </Button>
        </Fragment>
      );
    }

    return null;
  }

  render() {
    const {
      step,
      name,
      lastname,
      birth,
      username,
      password,
      bio,
      exists,
      hidden,
      error
    } = this.state;
    const isEnabled = name && lastname && username && password;
    return (
      <div className="wrap-registerForm">
        <div className="registerForm">
          
         <h2 className="signInHeading">Sign Up</h2>
          <Divider style={{ marginBottom: '20px'}}/>
          {!exists ? (
          
          <Alert severity="error" hidden={hidden}>{error}</Alert>
        ) : null}
          <form onSubmit={this.handleSubmit} autoComplete="off">
            <PersonalDetails
              step={step}
              handleChange={this.handleChange}
              name={name}
              lastname={lastname}
              birth={birth}
            />
            <UserDetails
              step={step}
              handleChange={this.handleChange}
              username={username}
              password={password}
              bio={bio}
            />
            <div className={step > 1 ? "buttons" : ""}>
              {this.prevBtn(isEnabled)}
              {this.nextBtn()}
            </div>
            <div style={{ marginTop: '20px'}}>
              Have an account? <Link to="/sign-in"> Sign In </Link>
            </div>
          </form>
        </div>
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
        onChange={ev => props.handleChange("name", ev)}
        name="name"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <br />
      <TextField
        value={props.lastname}
        label="Last Name*"
        onChange={ev => props.handleChange("lastname", ev)}
        name="lastname"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <br />
      <TextField
        label="Birthday"
        onChange={ev => props.handleChange("birth", ev)}
        type="date"
        fullWidth
        value={props.birth}
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
        variant="outlined"
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
        onChange={ev => props.handleChange("username", ev)}
        name="username"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <br />
      <TextField
        value={props.password}
        label="Password*"
        onChange={ev => props.handleChange("password", ev)}
        name="password"
        fullWidth
        margin="normal"
        type="password"
        variant="outlined"
      />
      <br />
    </Fragment>
  );
}

const mapStateToProps = state => ({
  user: state.userRegister,
  auth: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch({ type: constants.SET_CURRENT_USER, user }),
  createUser: user => dispatch({ type: constants.CREATE_USER, user })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
