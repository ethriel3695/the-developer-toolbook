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

class Meditation extends React.Component {
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
            MEDITATION
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
            fullWidth
          >
            <Tab label="Clearing" />
            <Tab label="Character" />
            <Tab label="Mission" />
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
                    <h4 style={pageStyles.textCenter}>Clear your mind and energy and experience peace!</h4>
                </Grid>
                <Grid item sm={12}>
                <strong>NOTE:</strong> This does not have to look a certain way. Focus on the feelings of peace and tranquility
                    and the process will get easier as you continue to perform this meditation
                    <ol>
                    <li>
                        Set a timer for 5-10 minutes
                    </li>
                    <li>
                        Focus on breathing deeply and relaxed, in and out and let your mind start to wander 
                    </li>
                    <li>
                        Create a flame in your mind and focus on getting it to appear brighter and in full focus
                    </li>
                    <li>
                        Each time a thought or emotion comes up send it to the flame and let the flame consume everything
                    </li>
                    </ol>
                </Grid>
            </Grid>
            </TabContainer>
            <TabContainer dir={theme.direction}>
                <Grid container>
                    <Grid item sm={12}>
                        <h4 style={pageStyles.textCenter}>Be the person you want and know you can be!</h4>
                    </Grid>
                    <Grid item sm={12}>
                    <strong>NOTE:</strong> This does not have to look a certain way. Focus on the feelings of peace and tranquility
                        and the process will get easier as you continue to perform this meditation
                        <ol>
                        <li>
                            Set a timer for 5-10 minutes
                        </li>
                        <li>
                            Focus on breathing deeply and relaxed, in and out and let your mind start to wander 
                        </li>
                        <li>
                            Create a flame in your mind and focus on getting it to appear brighter and in full focus
                        </li>
                        <li>
                            Each time a thought or emotion comes up send it to the flame and let the flame consume everything
                        </li>
                        </ol>
                    </Grid>
                </Grid>
            </TabContainer>
            <TabContainer dir={theme.direction}>
                <Grid container>
                    <Grid item sm={12}>
                        <h4 style={pageStyles.textCenter}>Clear your mind and energy and experience peace!</h4>
                    </Grid>
                    <Grid item sm={12}>
                    <strong>NOTE:</strong> This does not have to look a certain way. Focus on the feelings of peace and tranquility
                        and the process will get easier as you continue to perform this meditation
                        <ol>
                        <li>
                            Set a timer for 5-10 minutes
                        </li>
                        <li>
                            Focus on breathing deeply and relaxed, in and out and let your mind start to wander 
                        </li>
                        <li>
                            Create a flame in your mind and focus on getting it to appear brighter and in full focus
                        </li>
                        <li>
                            Each time a thought or emotion comes up send it to the flame and let the flame consume everything
                        </li>
                        </ol>
                    </Grid>
                </Grid>
            </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

Meditation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Meditation);