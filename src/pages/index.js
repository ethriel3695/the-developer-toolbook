import React, { Component } from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import HomepageGrid from '../components/Grid/HomepageGrid';
import { handleAuthentication, renewSession, logout } from '../store/actions/index';
import { connect } from "react-redux";

class IndexPage extends Component {

  componentDidMount() {
    // this.props.logout();
    // this.props.renewSession();
      // this.props.handleAuthentication();
      // if(isBrowser) {
      //   window.location.reload();
      // }
  }
  render () {
      return (
        <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <HomepageGrid />
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
  return { handleAuthentication: () => dispatch(handleAuthentication()),
    renewSession: () => dispatch(renewSession()),
    logout: () => dispatch(logout()) }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (IndexPage);
