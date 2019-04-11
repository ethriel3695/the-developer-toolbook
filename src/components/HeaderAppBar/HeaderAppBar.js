import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import HeaderText from '../Text/TypographyH6';
import Links from '../Link/Links';
import SimpleAppBar from './SimpleAppBar';
import HeaderButton from '../Button/HeaderButton';
import MenuIcon from '@material-ui/icons/Menu';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { Link } from 'gatsby';
const isBrowser = typeof window !== 'undefined';


// import { connect } from "react-redux";

// import { login } from '../../store/actions/index';
// import { logout } from '../../store/actions/index';
// import { renewSession } from '../../store/actions/index';
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
  }
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
    background: '#FFD700'
  }
}

class HeaderAppBar extends React.Component {

  state = {
    anchorEl: null
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

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, siteTitle } = this.props;
    const { anchorEl } = this.state;

    const open = Boolean(anchorEl);
    // const { open } = this.state;

    return (
    <SimpleAppBar className={classes.root} 
      style={pageStyles.headerColor}>
        
        <HeaderText className={classes.grow}>
            <Links
            to="/"
            style={pageStyles.plainLink}>
                {siteTitle}
            </Links>
        </HeaderText>
        <HeaderButton 
          className={classes.menuButton} 
          aria-label="Menu"
          aria-owns={anchorEl ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
        >
            <MenuIcon 
              style={pageStyles.foregroundColor} />
              </HeaderButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            // anchorOrigin={{
            //   vertical: 'top',
            //   horizontal: 'right',
            // }}
            // transformOrigin={{
            //   vertical: 'top',
            //   horizontal: 'right',
            // }}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>
            <Link style={{ textDecoration: 'none' }} to="/auto-suggestion">Auto Suggestion</Link>
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
            <Link style={{ textDecoration: 'none' }} to="/self-confidence">Self Confidence</Link>
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
            <Link style={{ textDecoration: 'none' }} to="/commitment">Commitment</Link>
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
            <Link style={{ textDecoration: 'none' }} to="/faith">Faith</Link>
            </MenuItem>
          </Menu>
          
       
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

export default withStyles(styles)(HeaderAppBar);