import React, { Component } from 'react';
import Layout from '../components/layout';
import LoadingProgress from '../components/Progress/LoadingProgress';
import { handleAuthentication } from '../store/actions/index';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import { navigate } from 'gatsby';

// const isBrowser = typeof window !== 'undefined';

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

    componentDidMount() {
        this.props.handleAuthentication();
        navigate('/');
        // if(isBrowser) {
        //   window.location.reload();
        // }
    }
    render () {
        return (
        <Layout>
            <div>
                <LoadingProgress />
            </div>
        </Layout>
        )
    }
}

const mapStateToProps = (auth) => {
    const { isAuthenticated, profile } = auth.auth
    return {
      isAuthenticated,
      profile
    }
  }

const mapDispatchToProps = dispatch => {
    return { handleAuthentication: () => dispatch(handleAuthentication()) }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  ) (withStyles(styles)(Callback));