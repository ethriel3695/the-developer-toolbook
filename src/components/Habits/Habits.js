import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Grid from '@material-ui/core/Grid';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

const pageStyles = {
    textCenter: {
      display: 'flex',
      justifyContent: 'center'
    }
  }

class Habits extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <h1 style={pageStyles.textCenter}>
            HABITS
            <IconButton onClick={this.toggleInfo} aria-label="Instructions">
              <InfoIcon />
            </IconButton>
        </h1>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Be Proactive" />
            <Tab label="Begin With The End in Mind" />
            <Tab label="Put First Things First" />
            <Tab label="Think Win/Win" />
            <Tab label="Seek First to Serve" />
            <Tab label="Synergize" />
            <Tab label="Sharpen the Saw" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
            <TabContainer dir={theme.direction}>
            <Grid container>
                <Grid item sm={12}>
                    <h4 style={pageStyles.textCenter}>Proactive 30-day Challenge</h4>
                </Grid>
                <Grid item sm={12}>
                    <ol>
                    <li>
                        For a full day, listen to your language and to the language of the people around you. 
                        How often do you use and hear reactive phrases such as "If only", "I cannot", or "i have to"?
                    </li>
                    <li>
                        Identify an experience you might encounter in the near future where based on past experience,
                        you would probably behave reactively. How could you resond proactively? Take several moments and 
                        create the experience vividly in your mind, picturing yourself responding in a proactive manner.
                        Remind yourself of the gap between stimulus and response. Make a commitment to yourself to 
                        exercise your freedom to choose. 
                    </li>
                    <li>
                        Select a problem from your work or personal life that is frustrating to you. Determine whether 
                        it is a direct, indirect, or no control problem. Identify the first step you can take in your 
                        Circle of Influence to solve it and then take the step.
                    </li>
                    <li>
                        Challenge yourself to the Thirty-day test of proactivity. Be aware of the change in your circle of influence.
                    </li>
                    </ol>
                </Grid>
            </Grid>
            </TabContainer>
            <TabContainer dir={theme.direction}>
                <Grid container>
                    <Grid item sm={12}>
                        <h4 style={pageStyles.textCenter}>Council of Greatness</h4>
                    </Grid>
                    <Grid item sm={12}>
                    
                    </Grid>
                </Grid>
            </TabContainer>
            <TabContainer dir={theme.direction}>
                <Grid container>
                    <Grid item sm={12}>
                        <h4 style={pageStyles.textCenter}>Create passion and inspiration</h4>
                    </Grid>
                    <Grid item sm={12}>
                   
                    </Grid>
                </Grid>
            </TabContainer>
            <TabContainer dir={theme.direction}>
                <Grid container>
                    <Grid item sm={12}>
                        <h4 style={pageStyles.textCenter}>Create passion and inspiration</h4>
                    </Grid>
                    <Grid item sm={12}>
                    
                    </Grid>
                </Grid>
            </TabContainer>
            <TabContainer dir={theme.direction}>
                <Grid container>
                    <Grid item sm={12}>
                        <h4 style={pageStyles.textCenter}>Create passion and inspiration</h4>
                    </Grid>
                    <Grid item sm={12}>
                   
                    </Grid>
                </Grid>
            </TabContainer>
            <TabContainer dir={theme.direction}>
                <Grid container>
                    <Grid item sm={12}>
                        <h4 style={pageStyles.textCenter}>Create passion and inspiration</h4>
                    </Grid>
                    <Grid item sm={12}>
                 
                    </Grid>
                </Grid>
            </TabContainer>
            <TabContainer dir={theme.direction}>
                <Grid container>
                    <Grid item sm={12}>
                        <h4 style={pageStyles.textCenter}>Create passion and inspiration</h4>
                    </Grid>
                    <Grid item sm={12}>
                   
                    </Grid>
                </Grid>
            </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

Habits.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Habits);