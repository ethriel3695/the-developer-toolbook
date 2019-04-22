import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import HeaderText from '../Text/TypographyH6';
import Links from '../Link/Links';
import SimpleAppBar from './SimpleAppBar';
import HeaderButton from '../Button/HeaderButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import Divider from '@material-ui/core/Divider';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { Link } from 'gatsby';

import { connect } from "react-redux";

import { login } from '../../store/actions/index';
import { logout } from '../../store/actions/index';
import { renewSession } from '../../store/actions/index';

const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
  window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
}

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

const pageStyles = {
  plainLink: {
    color: '#7b1bb3',
    textDecoration: 'none'
  },
  foregroundColor: {
    color: '#7b1bb3'
  },
  headerColor: {
    background: 'linear-gradient(to bottom, #ffcc00 0%, #FFD700 35%, #ffe066 68%, #fff5cc 100%)',
    boxShadow: 'inset 0px 1px 6px 0px #ffe066',
	  margin: 'auto 0px',
    // background: '#FFD700'
  }
}

class HeaderAppBar extends React.Component {

  state = {
    anchorEl: null,
    left: false
  };

  // handleDrawerOpen = () => {
  //   if (this.state.open) {
  //     this.setState({ open: false });
  //   } else {
  //     this.setState({ open: true });
  //   }
  // };

  // handleDrawerClose = () => {
  //   this.setState({ open: false });
  // };

  componentDidMount () {
    //   const { renewSession } = auth;
      // console.log(isLoggedIn());
      // if (this.props.isAuthenticated === true) {
      //   renewSession();
      // }
      // if(localStorage.getItem('isLoggedIn') === 'true') {
      //   renewSession();
      // }
    }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes, siteTitle, isAuthenticated } = this.props;
    const { anchorEl } = this.state;

    const open = Boolean(anchorEl);

    const sideList = (
      <div className={classes.list}>
        <List>
        <ListItem button key={'auto-suggestion'}>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              {/* <ListItemText primary={'Auto Suggestion'}> */}
              <Link style={{ textDecoration: 'none' }} to="/app/auto-suggestion">Auto Suggestion</Link>
              {/* </ListItemText> */}
        </ListItem>
        <ListItem button key={'self-confidence'}>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          {/* <ListItemText primary={'Self Confidence'}> */}
          <Link style={{ textDecoration: 'none' }} to="/app/self-confidence">Self Confidence</Link>
          {/* </ListItemText> */}
        </ListItem>
        <ListItem button key={'commitment'}>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          {/* <ListItemText primary={'Commitment'}> */}
          <Link style={{ textDecoration: 'none' }} to="/app/commitment">Commitment</Link>
          {/* </ListItemText> */}
        </ListItem>
        <ListItem button key={'faith'}>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          {/* <ListItemText primary={'Faith'}> */}
          <Link style={{ textDecoration: 'none' }} to="/app/faith">Faith</Link>
          {/* </ListItemText> */}
        </ListItem>
        <ListItem button key={'self-image'}>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          {/* <ListItemText primary={'Faith'}> */}
          <Link style={{ textDecoration: 'none' }} to="/app/self-image">Self Image</Link>
          {/* </ListItemText> */}
        </ListItem>
          {/* {['Auto Suggestion', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary={text}><Link style={{ textDecoration: 'none' }} to="/auto-suggestion"/></ListItemText>
            </ListItem>
          ))} */}
        </List>
        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </div>
    );
   
    // const { open } = this.state;

    return (
    <SimpleAppBar className={classes.root} 
      style={pageStyles.headerColor}>
      {/* {isAuthenticated && */}
         <HeaderButton 
          className={classes.menuButton} 
          aria-label="Menu"
          aria-owns={anchorEl ? 'menu-sidebar' : undefined}
              aria-haspopup="true"
              onClick={this.toggleDrawer('left', true)}
        >
            <MenuIcon 
              style={pageStyles.foregroundColor} />
        </HeaderButton>
      {/* } */}
        <HeaderText className={classes.grow}>
            <Links
            to="/"
            style={pageStyles.plainLink}>
                {siteTitle}
            </Links>
        </HeaderText>
        {/* {isAuthenticated && */}
        <SwipeableDrawer
          id="menu-sidebar"
          // anchor="right"
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
         {/* } */}
         {
              //auth && (
              <div>
                <HeaderButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                >
                  <AccountCircle style={pageStyles.foregroundColor} />
                </HeaderButton>
            {    
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
            {
              !isAuthenticated && (
            <MenuItem
              onClick={() => {this.props.login()}}>
              <Link to="/">Log In</Link>
            </MenuItem>
              )
            }
            {
              isAuthenticated && (
                  <MenuItem
                    onClick={() => {this.props.logout()}}
                  >
                  <Link to="/">Log Out</Link>
                  </MenuItem>
                )
            }
            </Menu>
            }
            </div>
                }
        {
        //   <Button style={pageStyles.foregroundColor}>
        //   <Links to="/auto-suggestion" style={pageStyles.plainLink}>
        //     Auto Suggestion
        //   </Links>
        // </Button>
        // <Button style={pageStyles.foregroundColor}>
        //   <Links to="/self-confidence" style={pageStyles.plainLink}>
        //     Confidence
        //   </Links>
        // </Button>
      }
    </SimpleAppBar>
    );
  }
}

HeaderAppBar.propTypes = {
    siteTitle: PropTypes.string,
}
  
HeaderAppBar.defaultProps = {
    siteTitle: ``,
}

const mapStateToProps = (auth) => {
  const { isAuthenticated, profile } = auth.auth
  return {
    isAuthenticated,
    profile
  }
}

const mapDispatchToProps = dispatch => {
  return { login: () => dispatch(login()),
    logout: () => dispatch(logout()),
    renewSession: () => dispatch(renewSession()) }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (withStyles(styles)(HeaderAppBar));