import React, { Component } from 'react';
import Navbar from '../common/Navbar';
import './QnA.css';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ExposurePlus2Icon from '@material-ui/icons/ExposurePlus2';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
  },
}));

class QnA extends Component {

  render() {
    const { classes } = this.props; 
    return (
      <div className={classes.root} style={{ backgroundColor: 'white'}}>

          {/* Include the navbar*/}

          <Navbar/>
       
        {/* Main Grid containing the overall layout */}


        <Grid container style={{
          margin: 0,
          width: '100%',
        }} spacing={2}>

            {/* Find Section */}


            <Grid item xs={12} sm={12} md={2} style={{ marginTop: '132px' }}>
            <Card className={classes.root} style={{ backgroundColor: '#eee' }}>
              <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
               <b>Find by tags</b></Typography>
              <List >
              <ListItem>
                <Button variant="contained" size="medium" style={{ backgroundColor: 'yellow' }}>
                    JavaScript
                </Button></ListItem>
                <ListItem>
                  <Button variant="contained" size="medium" style={{ backgroundColor: 'blue' }}>
                    React.js
                  </Button></ListItem>
                  <ListItem>
                    <Button variant="contained" size="medium" style={{ backgroundColor: 'skyblue' }}>
                    Material UI
                  </Button></ListItem>
                  <ListItem>
                  <Button variant="contained" size="medium" style={{ backgroundColor: 'violet' }}>
                    Redux
                  </Button></ListItem>
                  <ListItem>
                    <Button variant="contained" size="medium" style={{ backgroundColor: 'red' }}>
                    HTML
                  </Button></ListItem>
            
              </List>
              </CardContent>
            
            </Card>
            </Grid>

            {/* Question-Answer section */}

            <Grid item xs={12} sm={12} md={8} style={{ marginTop: '60px' }}>

            <div className="container">
            <div>Ask your question..</div>
            <div>Search</div>
            </div>
            
            <Card className={classes.root} style={{ marginTop: '10px', backgroundColor: '#eee' }}>
              <CardContent>
              <div style={{
                display: 'flex',
                alignItems: 'center'}}>
              <AccountCircleIcon className = "svg_icons"/>
                <Typography gutterBottom variant="h5" component="h2" style={{marginLeft:'10px', marginTop: '2px'}}>
                <b>Question Title</b>
                </Typography>
                <Button variant="contained" size="small" style={{ backgroundColor: 'yellow', marginLeft:'10px',
                 marginTop: '2px' }}>
                  JavaScript
                </Button>
                </div>
                <div style = {{marginLeft : '34px'}} >
                <Typography variant="body1" gutterBottom >
                Question Description - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
                </div>
                <ExposurePlus2Icon style = {{marginLeft: '30%', marginTop: '-10%'}}/>
                <div style = {{marginLeft : '34px', display: 'flex',
                  alignItems: 'center'}}>
                  <ThumbUpAltIcon className = "svg_icons1" style = {{marginTop: '-17px'}}/>
                  <Typography gutterBottom variant = "body1" style = {{marginLeft: '5px', 
                  marginTop: '-10px'}}><b>6 Top Answer - A brief/starting of the top answer 
                  to this question</b></Typography>
                </div>
                <Button variant="outlined" size="medium"  style = {{ float: 'right',
                backgroundColor : '#A9A9A9', marginBottom: '12px'}}>
                  Continue Thread
                </Button>
                </CardContent>
              </Card>


            <Card className={classes.root} style={{ marginTop: '10px', backgroundColor: '#eee' }}>
              <CardContent>
              <div style={{
                display: 'flex',
                alignItems: 'center'}}>
              <AccountCircleIcon className = "svg_icons"/>
                <Typography gutterBottom variant="h5" component="h2" style={{marginLeft:'10px', marginTop: '2px'}}>
                <b>Question Title</b>
                </Typography>
                <Button variant="contained" size="small" style={{ backgroundColor: 'violet', marginLeft:'10px',
                 marginTop: '2px' }}>
                  Redux
                </Button>
                </div>
                <div style = {{marginLeft : '34px'}} >
                <Typography variant="body1" gutterBottom >
                Question Description - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
                </div>
                <div style = {{marginLeft : '34px', display: 'flex',
                  alignItems: 'center'}}>
                  <ThumbUpAltIcon className = "svg_icons1" style = {{marginTop: '-12px'}}/>
                  <Typography gutterBottom variant = "body1" style = {{marginLeft: '5px', 
                  marginTop: '-5px'}}><b>4 Top Answer - A brief/starting of the top answer 
                  to this question</b></Typography>
                </div>
                <AccountCircleIcon style = {{ color: 'red', marginLeft : '34px'}} /><AccountCircleIcon style = {{ color: 'green'}} />
                <AccountCircleIcon style = {{ color: 'blue'}} /><br/>
                <Button variant="outlined" size="medium"  style = {{ float: 'right',
                backgroundColor : '#A9A9A9', marginBottom: '12px'}}>
                  Continue Thread
                </Button>
                </CardContent>
              </Card>


            <Card className={classes.root} style={{ marginTop: '10px', backgroundColor: '#eee' }}>
              <CardContent>
              <div style={{
                display: 'flex',
                alignItems: 'center'}}>
              <AccountCircleIcon className = "svg_icons"/>
                <Typography gutterBottom variant="h5" component="h2" style={{marginLeft:'10px', marginTop: '2px'}}>
                <b>Question Title</b>
                </Typography>
                <Button variant="contained" size="small" style={{ backgroundColor: 'blue', marginLeft:'10px',
                 marginTop: '2px' }}>
                  React.js
                </Button>
                <Button variant="contained" size="small" style={{ backgroundColor: 'skyblue', marginLeft:'10px',
                 marginTop: '2px' }}>
                  Material UI
                </Button>
                </div>
                <div style = {{marginLeft : '34px'}} >
                <Typography variant="body1" gutterBottom >
                Question Description - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
                </div>
                <Button variant="outlined" size="medium"  style = {{ float: 'right',
                backgroundColor : '#A9A9A9', marginBottom: '12px'}}>
                  Continue Thread
                </Button>
                </CardContent>
              </Card>

            </Grid>

            {/* Top Question section */}


            <Grid item xs={12} sm={12} md={2} style={{ marginTop: '80px' }}> 
            <Typography variant="h5" gutterBottom style = {{marginLeft: '18%', marginBottom: '10%'}} >
            <b>Top Questions</b>
            </Typography>

              <Card className={classes.root} style={{ marginTop: '10px',  backgroundColor: '#eee' }}>
                  <CardContent>
                  <div style={{
                  display: 'flex',
                  alignItems: 'center'}}>
                <AccountCircleIcon className = "svg_icons"/>
                  <Typography gutterBottom variant="h6" style={{marginLeft:'10px', marginTop: '2px'}}>
                  <b>Question Title</b>
                  </Typography>
                  </div>
                  <div>
                <Typography variant="body" gutterBottom >
                Question Description - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
                </div>
                <AccountCircleIcon style = {{ color: 'red'}} /><AccountCircleIcon style = {{ color: 'green'}} />
                <AccountCircleIcon style = {{ color: 'blue'}} />
                <br/>
                <Button variant="contained" size="small" style = {{ fontSize: '10px', marginTop: '4px', marginBottom: '4px',
                backgroundColor: '#A9A9A9'}}>Continue Thread</Button>
                </CardContent>
                </Card>

                <Card className={classes.root} style={{ marginTop: '10px',  backgroundColor: '#eee' }}>
                  <CardContent>
                  <div style={{
                  display: 'flex',
                  alignItems: 'center'}}>
                <AccountCircleIcon className = "svg_icons"/>
                  <Typography gutterBottom variant="h6" style={{marginLeft:'10px', marginTop: '2px'}}>
                  <b>Question Title</b>
                  </Typography>
                  </div>
                  <div>
                <Typography variant="body" gutterBottom >
                Question Description - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
                </div>
                <AccountCircleIcon style = {{ color: 'red'}} /><AccountCircleIcon style = {{ color: 'green'}} />
                <AccountCircleIcon style = {{ color: 'blue'}} />
                <br/>
                <Button variant="contained" size="small" style = {{ fontSize: '10px', marginTop: '4px', marginBottom: '4px',
                backgroundColor: '#A9A9A9'}}>Continue Thread</Button>
                </CardContent>
                </Card>
  
            </Grid>
        
          
        
        </Grid>
    </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(QnA);