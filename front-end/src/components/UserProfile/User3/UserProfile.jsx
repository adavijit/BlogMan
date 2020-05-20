import React, { Component } from 'react';
import Navbar from '../../Quiz/common/Nabvar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookIcon from '@material-ui/icons/Book';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';


import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';


import SwipeableViews from 'react-swipeable-views';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import './user3.css';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
    },
    button: {
      margin: theme.spacing(1),
    },
    rootcard: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: '#A29F9F',
    },
  }));

export default function UserProfile() {

    
  
        const [value, setValue] = React.useState(0);
        const theme = useTheme();

        const classes = useStyles();


        const handleChange = (event, newValue) => {
        setValue(newValue);
        };
    
        const handleChangeIndex = (index) => {
        setValue(index);
        };

        return (
            <div>
                <Navbar/>
                <div className="profileheader">
                    <div className="headercontent">
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={12} md={4}>
                        <div className="profileavatar">
                            <AccountCircleIcon style={{ fontSize: '150px', color: '#eeeeee'}}/>
                            <div className="userhandle">
                                <h4>User Name</h4>
                                <p>@user_handle</p>
                            </div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} style={{ marginLeft: 'auto', marginTop: 'auto'}}>
                        <div className="social">
                        <List >
                  
                            <ListItem>
                                <GitHubIcon fontSize="large" className="socialIcon github"/>
                                <FacebookIcon fontSize="large" className="socialIcon facebook"/>
                                <TwitterIcon fontSize="large" className="socialIcon twitter"/>
                                <InstagramIcon fontSize="large" className="socialIcon instagram"/><br/>
                               
                            </ListItem>
                            <ListItem>
                            <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.button}
                                    size="small"
                                    startIcon={<EditIcon />}
                                >Edit profile
                                </Button>
                            </ListItem>
                        
                        </List> 
                        </div>
                      </Grid>
                      </Grid>
                    </div>
                </div>
                <div>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="on"
                    
                    >
                    <Tab label="Blog" wrapped icon={<BookIcon />} {...a11yProps(0)}/>
                    <Tab label="Favorites" wrapped icon={<FavoriteIcon />} {...a11yProps(1)} />
                    <Tab label="Followers" wrapped icon={<PeopleAltIcon />} {...a11yProps(2)} />
                    <Tab label="Following" wrapped icon={<GroupAddIcon />} {...a11yProps(3)} />
                </Tabs>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                    <p>Blog</p>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                    <p>Favorites</p>
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} style={{ backgroundColor: '#DEDEDE'}}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <Card className={classes.rootcard}>
                                  <CardContent>
                                    <Grid container spacing={3}>
                                      <Grid item xs={4} md={4}>
                                        <AccountCircleIcon style={{ fontSize: '90px' }}/>
                                      </Grid>
                                      <Grid item xs={8} md={8}>
                                        <h4>User Name</h4>
                                        <p>@user_handle</p>
                                        <Button variant="outlined">Following</Button>
                                      </Grid>
                                    </Grid>
                                  </CardContent>
                                
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Card className={classes.rootcard}>
                                <CardContent>
                                  <Grid container spacing={3}>
                                    <Grid item xs={4} md={4}>
                                      <AccountCircleIcon style={{ fontSize: '90px' }}/>
                                    </Grid>
                                    <Grid item xs={8} md={8}>
                                      <h4>User Name</h4>
                                      <p>@user_handle</p>
                                      <Button variant="outlined">Following</Button>
                                    </Grid>
                                  </Grid>
                                </CardContent>
                              
                              </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Card className={classes.rootcard}>
                                <CardContent>
                                  <Grid container spacing={3}>
                                    <Grid item xs={4} md={4}>
                                      <AccountCircleIcon style={{ fontSize: '90px' }}/>
                                    </Grid>
                                    <Grid item xs={8} md={8}>
                                      <h4>User Name</h4>
                                      <p>@user_handle</p>
                                      <Button variant="outlined">Following</Button>
                                    </Grid>
                                  </Grid>
                                </CardContent>
                              
                              </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Card className={classes.rootcard}>
                                <CardContent>
                                  <Grid container spacing={3}>
                                    <Grid item xs={4} md={4}>
                                      <AccountCircleIcon style={{ fontSize: '90px' }}/>
                                    </Grid>
                                    <Grid item xs={8} md={8}>
                                      <h4>User Name</h4>
                                      <p>@user_handle</p>
                                      <Button variant="outlined">Following</Button>
                                    </Grid>
                                  </Grid>
                                </CardContent>
                              
                              </Card>
                            </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4} style={{ backgroundColor: '#DEDEDE'}}>
                          <h3>Suggestions</h3>
                          <hr/>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                              <Card className={classes.rootcard}>
                                    <CardContent>
                                      <Grid container spacing={3}>
                                        <Grid item xs={4} md={4}>
                                          <AccountCircleIcon style={{ fontSize: '90px' }}/>
                                        </Grid>
                                        <Grid item xs={8} md={8}>
                                          <h4>User Name</h4>
                                          <p>@user_handle</p>
                                          <Button variant="outlined">Follow</Button>
                                        </Grid>
                                      </Grid>
                                    </CardContent>
                                  
                              </Card>
                            </Grid>
                            <Grid item xs={12} md={12}>
                              <Card className={classes.rootcard}>
                                    <CardContent>
                                      <Grid container spacing={3}>
                                        <Grid item xs={4} md={4}>
                                          <AccountCircleIcon style={{ fontSize: '90px' }}/>
                                        </Grid>
                                        <Grid item xs={8} md={8}>
                                          <h4>User Name</h4>
                                          <p>@user_handle</p>
                                          <Button variant="outlined">Follow</Button>
                                        </Grid>
                                      </Grid>
                                    </CardContent>
                                  
                              </Card>
                            </Grid>
                          </Grid>
                        </Grid>
                    </Grid>
                    
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                    <p>Following</p>
                    </TabPanel>
                </SwipeableViews>
 
                

                </div>
            </div>
        )
    
}

