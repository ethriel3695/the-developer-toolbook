import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import HeaderText from '../Text/TypographyH6';
import Links from '../Link/Links';
import SimpleAppBar from './SimpleAppBar';
import HeaderButton from '../Button/HeaderButton';
import MenuIcon from '@material-ui/icons/Menu';
// import { Link } from 'gatsby';


// import { connect } from "react-redux";

// import { login } from '../../store/actions/index';
// import { logout } from '../../store/actions/index';
// import { renewSession } from '../../store/actions/index';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

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
    open: false,
    anchor: 'right'
  };

  handleDrawerOpen = () => {
    if (this.state.open) {
      this.setState({ open: false });
    } else {
      this.setState({ open: true });
    }
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, siteTitle } = this.props;
    const { open } = this.state;

    return (
    <SimpleAppBar className={classes.root} 
      style={pageStyles.headerColor}>
        <HeaderButton 
          className={classes.menuButton} 
          aria-label="Menu"
        >
          <MenuIcon style={pageStyles.foregroundColor} />
        </HeaderButton>
        <HeaderText className={classes.grow}>
            <Links
            to="/"
            style={pageStyles.plainLink}>
                {siteTitle}
            </Links>
        </HeaderText>
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