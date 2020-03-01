import React, { Component, Fragment } from "react";
import constants from "../../utils/constants";
import { TextField, Button } from "@material-ui/core";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "..";
import axios from "axios";
import { API_BASE_URL } from '../../utils/constants';

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

    return axios
      .post(`${API_BASE_URL}/users/register`, {
        user
      })
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
          color="primary"
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
          <Button style={{ marginTop: "10px" }} onClick={this.prevStep}>
            Back
          </Button>
          <Button
            style={{ marginTop: "10px" }}
            type="submit"
            disabled={!isEnabled}
            color="primary"
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
          {!exists ? (
            <div style={styles} hidden={hidden}>
              {error}
            </div>
          ) : null}
          <span className="formLegend">Sign Up</span>
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
            <div>
              Have an account? <a href="/sign-in"> Sign In </a>
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
      />
      <br />
      <TextField
        value={props.lastname}
        label="Last Name*"
        onChange={ev => props.handleChange("lastname", ev)}
        name="lastname"
        fullWidth
        margin="normal"
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
      />
      <br />
    </Fragment>
  );
}

const styles = {
  color: "red",
  marginBottom: "15px"
};

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
