import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import CardMedia from '@material-ui/core/CardMedia';
// import Card from '@material-ui/core/Card';
// import Image from '../image'
// import RecipeReviewCard from '../Card/RecipeReviewCard'
// import { Link } from 'gatsby'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4,
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
});

class HomepageGrid extends React.Component {
    componentDidMount () {
        // document.getElementById("heroIFrame")
        //     .setAttribute("allowfullscreen", "true")
        // document.getElementById("heroIFrame")
        //     .setAttribute("src", 
        //     "https://www.youtube.com/embed/BD_wgxl2y2o");
    };
render () {
  const { classes } = this.props;
  return (
        <Grid container>
            <Grid item xs={12}>
            <Paper className={classes.mainFeaturedPost}>
            {/* <Card>
            <h1>Hi people</h1> */
            // <CardMedia
            //     id="heroIFrame"
            //     component="iframe"
            //     height={400}
            //     src=''
            //     title="Gatsby Intro Video"
            //     alt="Gatsby Intro Video"
            // />}
            /* </Card> */}
            </Paper>
            </Grid>
            <Grid item sm={12}>
            </Grid>
        </Grid>
  );
}
}

HomepageGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomepageGrid);