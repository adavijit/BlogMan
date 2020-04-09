import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Card1 from './Card 1'
import Card2 from './Card 2'
import Card3 from './Card 3'
import Card4 from './Card 4'
import Card5 from './Card 5'

import './index.scss'

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

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"    
          aria-label="full width tabs example"
          centered
        >
          <Tab label="Publicity" {...a11yProps(0)} />
          <Tab label="Design" {...a11yProps(1)} />
          <Tab label="Tech" {...a11yProps(2)} />
          <Tab label="Media" {...a11yProps(3)} />
          <Tab label="Marketing" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Card1/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Card2/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
            <Card3/>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
            <Card4/>
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
            <Card5/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
