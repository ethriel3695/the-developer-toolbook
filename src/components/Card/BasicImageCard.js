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
    minWidth: 350,
    minHeight: 225
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
              <IconButton id={this.props.id} onClick={(e) => this.props.toggleArchive(e, this.props.id, this.props.archive)} aria-label="Archive" color={`${archived}`}>
                <ArchiveIcon />
              </IconButton>
            </CardActions>
          }
          title={this.props.title}
          subheader={this.props.subHeader}
        />
        <CardContent>
          <Typography component="p">
          {this.props.content ? this.props.content : ''}
          <br />
          {this.props.truth ? this.props.truth : ''}
          <br />
          {this.props.commitment ? this.props.commitment : ''}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton onClick={(e) => this.props.toggleAutoSuggestion(e, this.props.id, this.props.content, this.props.truth, this.props.commitment)} aria-label="Edit Card">
            <EditIcon />
          </IconButton>
          <IconButton onClick={(e) => this.props.onDelete(e, this.props.id)} aria-label="Delete Card">
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