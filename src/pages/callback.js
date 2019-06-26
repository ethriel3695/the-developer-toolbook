import React, { Component } from 'react';
import Layout from '../components/layout';
import LoadingProgress from '../components/Progress/LoadingProgress';
import { withStyles } from '@material-ui/core/styles';
import { handleAuthentication } from '../components/Auth/Auth';

const styles = {
    root: {
      flexGrow: 1
    },
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    },
    list: {
      width: 250,
    },
  };

class Callback extends Component {
  render () {
    handleAuthentication();
      return (
      <Layout>
          <div>
              <LoadingProgress />
          </div>
      </Layout>
      )
  }
}
  
  export default withStyles(styles)(Callback);