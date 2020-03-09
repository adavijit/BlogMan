import React, { Component } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';

export default class AddChat extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.onSubmit}>
          <Grid container direction="row" alignItems="center" spacing={4}>
            <Grid item>
              <TextField
                value={this.props.username}
                label="Username*"
                onChange={(ev) => this.props.onChange(ev)}
                name="username"
                margin="normal"
                variant="outlined"
                error={!!this.props.error}
                helperText={
                  this.props.error ||
                  'Enter the username of person you want to chat with.'
                }
              ></TextField>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                disabled={!this.props.username}
                variant="contained"
                color="primary"
                size="large"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}
