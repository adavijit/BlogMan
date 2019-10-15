import React, { Component, Fragment } from 'react'
import constants from '../../utils/constants'
import { TextField, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import jwt_decode from 'jwt-decode'
import { setAuthToken } from '..'
import axios from 'axios'

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      step: 1,
      username: '',
      password: '',
      name: '',
      lastname: '',
      bio: '',
      birth: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      this.props.history.push('/')
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { createUser, loginUser } = this.props
    const { username, password, name, lastname, bio, birth } = this.state
    const user = {
      username,
      password,
      name,
      lastname,
      bio,
      birth,
    }

    return axios
      .post('http://localhost:3000/api/users/register', {
        user,
      })
      .then(res => {
        if (res.data.error) return console.warn(res.data.error)
        createUser(res.data.userSaved)
        console.log(res.data)
        const { token } = res.data
        setAuthToken(token)
        const decoded = jwt_decode(token)
        loginUser(decoded)
        if (this.props.auth) {
          localStorage.setItem('id_token', token)
          localStorage.setItem('user', JSON.stringify(decoded))
          this.setState({
            exists: true
          })
          this.props.history.push('/', this.state)
        }
      })
  }

  handleChange(key, event) {
    this.setState({
      [key]: event.target.value,
    })
  }

  nextStep = () => {
    let step = this.state.step
    step = step >= 2 ? 3 : step + 1
    this.setState({
      step,
    })
  }

  prevStep = () => {
    let step = this.state.step
    step = step <= 1 ? 1 : step - 1
    this.setState({
      step,
    })
  }

  nextBtn() {
    let step = this.state.step
    if (step < 2) {
      return (
        <Button
          style={{ float: 'right', marginTop: '10px' }}
          color="primary"
          onClick={this.nextStep}
        >
          Next
        </Button>
      )
    }

    return null
  }

  prevBtn(isEnabled) {
    let step = this.state.step
    if (step !== 1) {
      return (
        <Fragment>
          <Button style={{ marginTop: '10px' }} onClick={this.prevStep}>
            Back
          </Button>
          <Button style={{ marginTop: '10px' }} type="submit" disabled={!isEnabled} color="primary">
            Register
          </Button>
        </Fragment>
      )
    }

    return null
  }

  render() {
    const { step, name, lastname, birth, username, password, bio} = this.state
    const isEnabled = name && lastname && username && password
    return (
      <div className="wrap-registerForm">
        <div className="registerForm">
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
          </form>
        </div>
      </div>
    )
  }
}

function PersonalDetails(props) {
  if (props.step !== 1) {
    return null
  }

  return (
    <Fragment>
      <TextField
        value={props.name}
        label="Name*"
        onChange={ev => props.handleChange('name', ev)}
        name="name"
        fullWidth
        margin="normal"
      />
      <br />
      <TextField
        value={props.lastname}
        label="Last Name*"
        onChange={ev => props.handleChange('lastname', ev)}
        name="lastname"
        fullWidth
        margin="normal"
      />
      <br />
      <TextField
        label="Birthday"
        onChange={ev => props.handleChange('birth', ev)}
        type="date"
        fullWidth
        value={props.birth}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
      />
      <br />
    </Fragment>
  )
}

function UserDetails(props) {
  if (props.step !== 2) {
    return null
  }

  return (
    <Fragment>
      <TextField
        value={props.username}
        label="Username*"
        onChange={ev => props.handleChange('username', ev)}
        name="username"
        fullWidth
        margin="normal"
      />
      <br />
      <TextField
        value={props.password}
        label="Password*"
        onChange={ev => props.handleChange('password', ev)}
        name="password"
        fullWidth
        margin="normal"
        type="password"
      />
      <br />
      <TextField
        value={props.bio}
        name="bio"
        label="Bio"
        onChange={ev => props.handleChange('bio', ev)}
        margin="normal"
        fullWidth
        multiline
        rowsMax="4"
      />
      <br />
    </Fragment>
  )
}

const mapStateToProps = state => ({
  user: state.userRegister,
})

const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch({ type: constants.SET_CURRENT_USER, user }),
  createUser: user => dispatch({ type: constants.CREATE_USER, user }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
