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
            variant="fullWidth"
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
                    <h4 style={pageStyles.textCenter}>Clear your mind, energy and experience peace</h4>
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
                        <h4 style={pageStyles.textCenter}>Council of Greatness</h4>
                    </Grid>
                    <Grid item sm={12}>
                    <strong>NOTE:</strong> It is important to remember that this exercise is spiritual and each 
                    member of your council is brought to you through your imagination
                    <strong> (As you continue with this meditation each day, ensure you study and research each
                      member of your council so you know each and everything there is to learn about them)</strong>
                        <ol>
                        <li>
                            Before you begin the meditation Select 6-8 members including yourself who will be part
                            of your council <strong> (My council consists starting from my left: Mahatma Gandhi, Gautama Buddha
                              , Jesus Christ, Napoleon Hill, Leonardo Da Vinci, Archangel Gabriel
                              , Harriet Tubman and Myself )</strong>
                        </li>
                        <li>
                            Close your eyes and envision each member sitting with you in a location whether in the woods,
                            around table or in the dinning area. You are the president and leader of the group and guide 
                            all conversations.
                        </li>
                        <li>
                            For the first meeting, address each person and let them know why you have selected them as 
                            part of your council and what character traits you would like to learn and emulate in yourself
                            <strong> (An example would be: Mahatma, I desire to gain your ability of determination for a cause
                              and your ability to inspire millions of people with your passion and conviction)</strong>
                        </li>
                        <li>
                            Strive to perform this meeting nightly before bed with peace and quiet and focus on learning
                            from the group and speaking of thoughts and ideas you have and gathering answers
                            <strong> (You can bring ideas you are currently facing in your business, have simple conversations
                              among friends, discuss your purpose. The possibilities are infinite!)</strong>
                        </li>
                        </ol>
                    </Grid>
                </Grid>
            </TabContainer>
            <TabContainer dir={theme.direction}>
                <Grid container>
                    <Grid item sm={12}>
                        <h4 style={pageStyles.textCenter}>Create passion and inspiration</h4>
                    </Grid>
                    <Grid item sm={12}>
                    <strong>NOTE:</strong> This does not have to look a certain way. Focus on the feelings of peace and tranquility
                        and the process will get easier as you continue to perform this meditation
                        <ol>
                        <li>
                            Set a timer for 20 minutes
                        </li>
                        <li>
                            Focus on breathing deeply and relaxed and remember a time when you did something incredible 
                            in your life or a time when you felt joy and happiness. Remember what it felt like to have 
                            those feelings and what you thought about yourself at that moment in time. Really let it soak
                            in and let your body and mind embrace the feelings and sensations
                        </li>
                        <li>
                            Focus on the thought that you deserve and are capable of creating your main mission
                            and desire. You have and always will be in charge of your actions and you are capable of anything
                            you give yourself permission to do
                        </li>
                        <li>
                            Focus on your main mission at this moment in time. What mission will assist you in being the 
                            best version of yourself and allow you to make the most empowering and beneficial changes in
                            your life. This mission is your first mission and will drive the most change and inspiration to
                            keep moving forward
                        </li>
                        <li>
                            Focus on the action steps necessary to achieve your mission. How much time are you going to spend
                            towards this mission and how often each week. When you have a clear vision of how much time and
                            frequency your action consists of then see yourself performing the actions necessary to achieve 
                            your mission. Remember, it is about taking action and keeping your word to yourself and free 
                            yourself from the worry of what it looks like or what your results are. If you keep your word, 
                            practice integrity and consistency, it is only a matter of time before you achieve your mission
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