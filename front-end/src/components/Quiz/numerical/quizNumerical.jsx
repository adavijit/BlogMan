import React, { Component } from 'react';
import './quiznumerical.css';

import Navbar from '../common/Nabvar';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import ShareIcon from '@material-ui/icons/Share';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

import Grid from '@material-ui/core/Grid';

//  flex styles

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

// function to handle click event on breadcrumbs

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

class quiznumerical extends Component{
    render() {
        const { classes } = this.props; 
        return(
            <div className={classes.root}>
                {/* Include the navbar */}

                <Navbar/>

                {/* Breadcrumbs sections */}
                <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs" style={{ marginLeft: '10px', marginRight: '10px', marginTop: '80px'}}>

                    <Link color="inherit" href="/" onClick={handleClick} style={{ textDecoration: 'none'}}>
                    Category
                    </Link>

                    <Typography color="textPrimary">
                    Numerical Quiz
                    </Typography>

                </Breadcrumbs>  

                {/* Main Grid containing the overall layout */}


                <Grid container style={{
                margin: 0,
                width: '100%',
                }} spacing={2}>

                {/* Topics Section */}

                <Grid item xs={12} sm={12} md={2}>
                <Card className={classes.root}>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    Topic
                    </Typography>
                    <hr/>
                    <List >

                        <ListItem>
                            JavaScript
                        </ListItem>
                        <ListItem>
                            Algorithm
                        </ListItem>
                        <ListItem>
                            Frontend
                        </ListItem>
                        <ListItem>
                            Node.js
                        </ListItem>
                        <ListItem>
                            Data Structure
                        </ListItem>
                        <ListItem>
                            System Design
                        </ListItem>

                    </List>
              </CardContent>

            </Card>

            {/* Difficulty level section */}


            <Card className={classes.root} style={{ marginTop: '10px' }}>
              <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Category
              </Typography>
              <hr/>
              <List >

                  <ListItem>
                    Subjective
                  </ListItem>
                  <ListItem style={{ backgroundColor: '#eee'}}>
                    Numerical
                  </ListItem>
                  <ListItem>
                    MCQ
                  </ListItem>
    

              </List>
              </CardContent>

            </Card>

            {/* Difficulty Section */}

            <Card className={classes.root} style={{ marginTop: '10px' }}>
              <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Difficulty
              </Typography>
              <hr/>
              <List >

                  <ListItem>
                    Easy
                  </ListItem>
                  <ListItem>
                    Medium
                  </ListItem>
                  <ListItem>
                    Hard
                  </ListItem>
    

              </List>
              </CardContent>

            </Card>

            </Grid>
{/* Main Quiz section */}

<Grid item xs={12} sm={12} md={8}>

            <Card className={classes.root} style={{ marginTop: '10px' }}>
              <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              Ongoing Quiz
              </Typography>
              <hr/>
              <Breadcrumbs aria-label="breadcrumb" style={{ marginLeft: '10px', marginRight: '10px'}}>

                <Link color="inherit" href="/" onClick={handleClick} style={{ textDecoration: 'none'}}>
                  Topic
                </Link>

                <Typography color="textPrimary">
                   Numerical
                </Typography>

              </Breadcrumbs> 

              <div className="question-section"> 
              {/* question 1 */}
              <div className="question">
              <Typography variant="h5">
                    Question 1:
              </Typography>
              <Typography variant="h5" gutterBottom>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia itaque sequi eum tempora labore blanditiis !
              </Typography>
              <Typography variant="h5">
                    Answer:
              </Typography>
              <br/>
              <TextField 
                    label="Type your answer here..."
                    multiline
                    rows="2"
                    variant="outlined"
                   style={{ width: '100%', marginBottom: '10px'}} /><br/>
              </div>

              {/* question 2 */}
              <div className="question">
              <Typography variant="h5">
                    Question 2:
              </Typography>
              <Typography variant="h5" gutterBottom>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia itaque sequi eum tempora labore blanditiis !
              </Typography>
              <Typography variant="h5">
                    Answer:
              </Typography>
              <br/>
              <TextField 
                    label="Type your answer here..."
                    multiline
                    rows="2"
                    variant="outlined"
                   style={{ width: '100%', marginBottom: '10px'}} /><br/>
              </div>
              <Button variant="outlined" size="large" style={{float: 'right'}} >
                    Submit
              </Button>
              <br/>
              </div>
              </CardContent>


            </Card>


            {/* Comments section */}

            <Card className={classes.root} style={{ marginTop: '10px' }}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                Comments
                </Typography>
                <hr/>
                <TextField

                    label="Comment"
                    multiline
                    rows="4"
                    variant="outlined"
                   style={{ width: '100%', marginBottom: '10px'}} /><br/>
                   <Button variant="outlined" size="large">
                Post
              </Button>
                </CardContent>

            </Card>
          </Grid>

          {/* Scoreboard section */}


          <Grid item xs={12} sm={12} md={2}>
            <Card className={classes.root} style={{ marginTop: '10px' }}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
               Leader Board
                </Typography>
                <hr/>
                <TableContainer>
                <Table className={classes.table} aria-label="custom pagination table">
                  <TableBody>

                      <TableRow>
                        <TableCell component="th" scope="row">
                          Player 1:
                        </TableCell>
                        <TableCell align="right">22</TableCell>

                      </TableRow>

                      <TableRow>
                        <TableCell component="th" scope="row">
                          Player 2:
                        </TableCell>
                        <TableCell align="right">18</TableCell>

                      </TableRow>

                      <TableRow>
                        <TableCell component="th" scope="row">
                          Player 3:
                        </TableCell>
                        <TableCell align="right">15</TableCell>

                      </TableRow>



                  </TableBody>
                  </Table>
                  </TableContainer>
                </CardContent>

              </Card>

              {/* Social Section */}

              <Card className={classes.root} style={{ marginTop: '10px' }}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                Invite Your Friends
                </Typography>
                <hr/>
                <List>
                    <ShareIcon fontSize="large" className="socialIcon"/>
                </List>
                <List >

                    <ListItem>
                      <FacebookIcon fontSize="large" className="socialIcon facebook"/>
                      <TwitterIcon fontSize="large" className="socialIcon twitter"/>
                      <InstagramIcon fontSize="large" className="socialIcon instagram"/>
                    </ListItem>


                </List>
                </CardContent>

              </Card>

          </Grid>



      </Grid>
  </div>
  );
}
}

export default withStyles(useStyles, { withTheme: true })(quiznumerical); 