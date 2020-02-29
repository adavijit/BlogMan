import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import CommentIcon from '@material-ui/icons/Comment';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function UserPost() {
  const classes = useStyles();
  let name = 'Jannice Caceras';
  let time = '13 MINS AGO';
  let content = `Great, the new data shoudl fit eneryone. I will tell my students about the change.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a varius urna. 
  Vivamus dignissim urna vitae purus euismod, sed pellentesque urna porta. 
  In tempus fermentum aliquam. Nulla facilisi. Sed ac velit finibus, malesuada nibh nec, 
  tincidunt mi. Maecenas libero nisi, ullamcorper ut placerat id, lacinia id odio. 
  Quisque tincidunt, sem vehicula varius iaculis, ex velit porttitor ante, 
  eu efficitur ipsum justo ac metus.`

  return (
    <Container maxWidth="md">
      <Card className={classes.root}>
        <CardContent>
          <Avatar alt="Jannice Caceres" sizes="lg" src="https://imgix.bustle.com/rehost/2016/9/13/8b58597b-fa6f-4934-8e14-cd94ecc709d7.jpg?w=970&h=546&fit=crop&crop=faces&auto=format&q=70" 
          style= {
            { margin:".5em 1em", float:"left"}
            }
          />
          <Typography variant="h6" component="h2">
            {name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            <strong>{time}</strong>
          </Typography>
    
          <Typography className={classes.pos} color="textSecondary"
            style= {
                { margin:".3em 3em 1em 5em", float:"left"}
            }>
            {content}
          </Typography>
          <CommentIcon fontSize="large" color="action"
          style= {
            { fontSize:"35", margin:".3em .5em", float:"left"}
            }>
          </CommentIcon>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField 
            id="outlined-basic" 
            label="Write a comment" 
            variant="outlined" 
            style= {
              { width: "85%", }
            }
            />
          </form>
        </CardContent>
    </Card>
    </Container>
  );
}

export default UserPost;