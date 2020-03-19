
import React, { Component } from 'react';
import Navbar from '../common/Nabvar';
import './quizmcq.css';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Collapse from '@material-ui/core/Collapse';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

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

class quizMcq extends Component {

  render() {
    const { classes } = this.props; 
    return (
      <div className={classes.root}>

      
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs" style={{ marginLeft: '10px', marginRight: '10px'}}>
            
            <Link color="inherit" href="/" onClick={handleClick} style={{ textDecoration: 'none'}}>
              Category
            </Link>
      
            <Typography color="textPrimary">Quiz</Typography>

          </Breadcrumbs>  
       

        <Grid container style={{
          margin: 0,
          width: '100%',
        }} spacing={2}>
        
            <Grid item xs={12} sm={12} md={2}>
            <Card className={classes.root}>
              <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              Topics
              </Typography>
              <hr/>
              <List >
              
                  <ListItem>
                    Entertainment
                  </ListItem>
                  <ListItem>
                  History
                  </ListItem>
                  <ListItem>
                    Science
                  </ListItem>
                  <ListItem>
                    Technology
                  </ListItem>
            
              </List>
              </CardContent>
            
            </Card>
            <Card className={classes.root} style={{ marginTop: '10px' }}>
              <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              Difficulty
              </Typography>
              <hr/>
              <List >
              
                  <ListItem>
                    Beginner
                  </ListItem>
                  <ListItem style={{ backgroundColor: '#eee'}}>
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

            <Card className={classes.root} style={{ marginTop: '10px' }}>
              <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              Rating
              </Typography>
              <hr/>
              <List >
              
                  <ListItem style={{ textAlign: 'center'}}>
                    <StarIcon style={{ color: 'blue'}}/>
                    <StarIcon style={{ color: 'blue'}}/>
                    <StarIcon style={{ color: 'blue'}}/>
                    <StarBorderIcon />
                    <StarBorderIcon />
                  </ListItem>
                  <ListItem>
                    <p>3/5</p>
                  </ListItem>
                 
              </List>
              </CardContent>
            
            </Card>
      
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
            
      
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
              <Card className={classes.root} style={{ marginTop: '10px' }}>
                  <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                 Score Board
                  </Typography>
                  <hr/>
                  <TableContainer>
                  <Table className={classes.table} aria-label="custom pagination table">
                    <TableBody>
                     
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Top Performer:
                          </TableCell>
                          <TableCell align="right">10</TableCell>
                          
                        </TableRow>
                     
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Your Score:
                          </TableCell>
                          <TableCell align="right">04</TableCell>
                          
                        </TableRow>
                     
                     
                      
                    </TableBody>
                    </Table>
                    </TableContainer>
                  </CardContent>
              
                </Card>

                <Card className={classes.root} style={{ marginTop: '10px' }}>
                  <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                  Invite Your Friends
                  </Typography>
                  <hr/>
                  <List >
                  
                      <ListItem>
                        <ShareIcon fontSize="large" className="socialIcon"/>
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

export default withStyles(useStyles, { withTheme: true })(quizMcq);