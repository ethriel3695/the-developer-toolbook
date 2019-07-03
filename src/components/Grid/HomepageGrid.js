import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

import BookCard from '../Card/BookCard';
// import CardMedia from '@material-ui/core/CardMedia';
// import Card from '@material-ui/core/Card';
// import Image from '../image'
// import { Link } from 'gatsby'
// import { Carousel } from 'react-responsive-carousel';
// import TestImage from '../../images/gatsby-astronaut.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing(6)}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
  homeFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

class HomepageGrid extends React.Component {
  componentDidMount() {
    // document.getElementById("heroIFrame")
    //     .setAttribute("allowfullscreen", "true")
    // document.getElementById("heroIFrame")
    //     .setAttribute("src",
    //     "https://www.youtube.com/embed/BD_wgxl2y2o");
  }
  render() {
    // const { classes } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item sm={12} lg={4}>
          <Typography variant="h4"> Redefine your reality </Typography>
          <br />
        </Grid>
        <Grid item sm={12} lg={4}>
          <Typography variant="h4">Elevate humanity </Typography>
          <br />
        </Grid>
        <Grid item sm={12} lg={4}>
          <Typography variant="h4">Love. Joy. Peace. </Typography>
          <br />
        </Grid>
        <Grid item sm={12} lg={4}>
          <BookCard
            title={'The Miracle Equation'}
            subHeader={
              'The Two Decisions That Move Your Biggest Goals from Possible, to Probable, to Inevitable'
            }
            author={'Hal Elrod'}
          />
        </Grid>
        <Grid item sm={12} lg={4}>
          <BookCard
            title={'Think and Grow Rich'}
            subHeader={
              'The Secret to Being Successful, Self Confident, and Getting Anything and Everything You Want'
            }
            author={'Napoleon Hill'}
          />
        </Grid>
        <Grid item sm={12} lg={4}>
          <BookCard
            title={'The Miracle Morning'}
            subHeader={
              'The Not-So-Obvious Secret Guaranteed to Transform Your Life (Before 8AM)'
            }
            author={'Hal Elrod'}
          />
        </Grid>
      </Grid>

      // <div className={classes.homeFlex}>
      // <Typography variant='h4'> Redefine your reality </Typography><br/>
      // <Typography variant='h4'>Elevate humanity </Typography><br/>
      // <Typography variant='h4'>Love. Joy. Peace. </Typography><br/>
      // </div>
    );
  }
}

HomepageGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomepageGrid);
