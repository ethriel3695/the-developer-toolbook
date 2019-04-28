import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ArchiveIcon from '@material-ui/icons/ArchiveRounded';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteForever';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class BasicImageCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    let archived = 'default';
    let archiveBackground = 'transparent';
    if (this.props.archive === true) {
      archived = 'primary';
      archiveBackground = 'green';
    }

    return (
      <Card className={classes.card}>
        <CardHeader
        style={{background: archiveBackground}}
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton onClick={this.props.toggleArchive} aria-label="Archive" color={`${archived}`}>
                <ArchiveIcon />
              </IconButton>
            </CardActions>
          }
          title="Get 100,000.00 in savings"
          subheader="June 1st 2019"
        />
        <CardContent>
          <Typography component="p">
            By the first day of June 2019 I have in my possession $100,000.00 which will come
            to me in various forms day by day. In return for this money I give this everything I have
            no matter what until the last possible moment and this is my choice and commitment. I believe 
            I have this money in my possession. My belief in myself
            is so strong that I can see this money with my eyes and touch it with my hands! It is now 
            awaiting transfer to me provided I put forth the extraordinary effort to work towards this goal 
            at least 30 minutes daily until the last possible moment.
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton onClick={this.props.toggleAutoSuggestion} aria-label="Edit Card">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="Delete Card">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

BasicImageCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicImageCard);