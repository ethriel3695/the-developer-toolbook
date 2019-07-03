import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: '90vw',
  },
});

class RequesterSelect extends React.Component {
  state = {
    open: false,
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="requester-select">Requester</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.props.requester}
            onChange={this.props.handleChange('requester')}
            inputProps={{
              name: 'requester',
              id: 'requester-select',
            }}
          >
            <MenuItem value="">
              <em>Select Requester</em>
            </MenuItem>
            {this.props.users.length > 0 &&
              this.props.users.map(user => {
                let id = user.user_id.split('|')[1];
                return (
                  <MenuItem
                    key={id}
                    value={user.name}
                  >{`${user.name}`}</MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </div>
    );
  }
}

RequesterSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RequesterSelect);
