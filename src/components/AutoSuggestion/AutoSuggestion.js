import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SEO from '../seo';
import BasicImageCard from '../Card/BasicImageCard';
import TextField from '@material-ui/core/TextField';
import { Row, Col } from 'reactstrap';

import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';

import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const pageStyles = {
  textCenter: {
    display: 'flex',
    justifyContent: 'center'
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '95%',
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  w100: {
    width: '100%',
    overflow: 'hidden'
  }
});
class AutoSuggestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      missionTitle: '',
      autoSuggestion: '',
      archive: false,
      dueDate: new Date(),
      visibleDialog: false,
      visibleInfo: false,
      editAutoSuggestion: false
    }
  }

  toggleDialog = () => {
    this.setState({
        visibleDialog: !this.state.visibleDialog
    });
  }

  toggleInfo = () => {
    this.setState({
      visibleInfo: !this.state.visibleInfo
    });
  }

  toggleAutoSuggestion = () => {
    this.setState({
      editAutoSuggestion: !this.state.editAutoSuggestion
    });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  toggleArchive = () => {
    this.setState({
      archive: !this.state.archive
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.visibleDialog && 
          <Dialog
            open={this.state.visibleDialog}
            onClose={this.toggleDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Create Auto Suggestion Statement"}</DialogTitle>
            <DialogContent>
              {/* <DialogContentText id="alert-dialog-description" style={{color: '#000'}}>
              test
              </DialogContentText> */}
              <form className={classes.w100}>
                    <Row>
                    <Col xs="12">
                    <TextField
                      id="outlined-multiline-flexible-1"
                      label="Goal/Mission"
                      multiline
                      rowsMax="8"
                      value={this.state.missionTitle}
                      onChange={this.handleChange('missionTitle')}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-multiline-flexible-2"
                      label="Auto Suggestion Statement"
                      multiline
                      rowsMax="8"
                      value={this.state.autoSuggestion}
                      onChange={this.handleChange('autoSuggestion')}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                  </Col>
                  <Col xs="12">
                  <Row style={{textAlign: 'right'}}>
                  <Col xs="6" style={{marginRight: 16}}>
                  <Button
                      variant="contained"
                      id='submit-auto-suggestion'
                      onClick={this.onFormSubmit}
                      style={{backgroundColor: '#c31924', color: '#fff', borderColor: '#c33424'}}>
                        Create my new life!
                      </Button>
                  </Col>
                  </Row>
                  </Col>
                  </Row>
              </form>
            </DialogContent>
          </Dialog>
        }
        {this.state.editAutoSuggestion && 
          <Dialog
            open={this.state.editAutoSuggestion}
            onClose={this.toggleAutoSuggestion}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Update Auto Suggestion Statement"}</DialogTitle>
            <DialogContent>
              {/* <DialogContentText id="alert-dialog-description" style={{color: '#000'}}>
              test
              </DialogContentText> */}
              <form className={classes.w100}>
                    <Row>
                    <Col xs="12">
                    <TextField
                      id="outlined-multiline-flexible-2"
                      label="Auto Suggestion Statement"
                      multiline
                      rowsMax="8"
                      value={this.state.autoSuggestion}
                      onChange={this.handleChange('autoSuggestion')}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                  </Col>
                  <Col xs="12">
                  <Row style={{textAlign: 'right'}}>
                  <Col xs="6" style={{marginRight: 10}}>
                  <Button
                      variant="contained"
                      id='update-auto-suggestion'
                      onClick={this.onFormSubmit}
                      style={{backgroundColor: '#c31924', color: '#fff', borderColor: '#c33424'}}>
                        Update auto suggestion
                      </Button>
                  </Col>
                  </Row>
                  </Col>
                  </Row>
              </form>
            </DialogContent>
          </Dialog>
        }
        {this.state.visibleInfo && 
          <Dialog
            open={this.state.visibleInfo}
            onClose={this.toggleInfo}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Auto Suggestion Instructions"}</DialogTitle>
            <DialogContent>
            <ol>
            <li>
            Go into some quiet spot <strong>(preferably in bed at night)</strong> where you will not be disturbed or interrupted. 
            Close your eyes and repeat aloud <strong>(so you may hear your own words)</strong> 
            <ul>
            <li>the written statement of the amount of money you intend to accumulate,</li>
            <li>the time limit for its accumulation,</li>
            <li>and a description of the service or merchandise you intend to give in return for the money.</li>
            </ul>
            As you carry out these instructions, see yourself already in possession of the money. 
            For example: suppose you intend to accumulate $100,000 by the first of June 2019 and you intend to give personal services in return for the money in the capacity of a software developer. 
            Your written statement of your purpose is similar to the following: 
            </li>
            <li>
            Repeat this program night and morning until you can see (in your imagination) the money you intend to create!
            </li>
            <li>
            Place a written copy of your statement where you can see it night and morning. Read it just before retiring and upon rising until it is memorized and part of your soul!
            </li>
            <li>
            Read the entire chapter aloud once every night until you become thoroughly convinced that the principle of AUTO-SUGGESTION is sound, that it will accomplish for you all that has been claimed for it. As you read, underline with a pencil every sentence that impresses you favorably!
            </li>
            </ol>
            </DialogContent>
          </Dialog>
        }
        <SEO title="Auto Suggestion" />
        <Grid container spacing={16}>
          <Grid item sm={12}>
            <h1 style={pageStyles.textCenter}>
            AUTO-SUGGESTION
            <IconButton onClick={this.toggleInfo} aria-label="Instructions">
              <InfoIcon />
            </IconButton>
            </h1>
            
            {/* <IconButton onClick={this.toggleDialog}  aria-label="Instructions">
              <AddIcon />
            </IconButton> */}
            <Button onClick={this.toggleDialog} variant="contained" color="primary" autoFocus>
            <AddIcon />
            </Button>
          </Grid>
          <Grid item sm={12}>
          <BasicImageCard 
            editAutoSuggestion={this.state.editAutoSuggestion} 
            toggleAutoSuggestion={this.toggleAutoSuggestion} 
            archive={this.state.archive} 
            toggleArchive={this.toggleArchive}>
          </BasicImageCard>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(AutoSuggestion);