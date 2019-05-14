import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SEO from '../seo';
import BasicImageCard from '../Card/BasicImageCard';
import TextField from '@material-ui/core/TextField';
import { Row, Col } from 'reactstrap';
import Moment from 'react-moment';

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

const apiUrl = 'https://the-developer-toolbook-api.appspot.com';
// const apiUrl = 'http://localhost:8080';
class MiracleEquation extends React.Component {
  constructor(props) {
    super(props);
    let missionDate = new Date();
    missionDate.setDate(missionDate.getDate() + 30);
    let userId = this.getUserId();
    this.state = {
      title: '',
      statement: '',
      type: 'miracleEquation',
      archive: false,
      dueDate: missionDate,
      visibleDialog: false,
      visibleInfo: false,
      editMiracleEquation: false,
      affirmations: null,
      userId: userId,
      currentId: null,
      currentStatement: null
    }
  }

  componentDidMount() {
    this.getAffirmations();
  }

  getUserId = () => {
    let value = JSON.parse(localStorage.getItem('profile'));
    let userId = value.sub.split('|')[1];
    return userId;
  }

  getAffirmations = () => {
    const url = `${apiUrl}/api/affirmation`;
    let requestObject = {
      type: this.state.type,
      userId: this.state.userId
    }
    fetch(url, {
      method: 'get',
      headers: requestObject,
      mode: 'cors',
      credentials: 'omit'
    })
    .then(response => {
      response.text().then(res => {
        let data = JSON.parse(res);
        // data.map(affirmation => {
        this.setState({affirmations: data});
        // });
      });
    });
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

  toggleAutoSuggestion = (e, id, statement) => {
    this.setState({
        editMiracleEquation: !this.state.editMiracleEquation,
        currentId: id,
        currentStatement: statement
    });
  }

  onStatementUpdate = () => {
    let id = this.state.currentId;
    let statement = this.state.currentStatement;
    const url = `${apiUrl}/api/affirmation/${id}`;
    let requestObject = {
      statement: statement,
      userId: this.state.userId
    }
    const formData = JSON.stringify(requestObject);
    fetch(url, {
      method: 'put',
      body: formData,
      mode: 'cors',
      credentials: 'omit'
    })
    .then(response => {
      response.text().then(res => {
        this.setState({
          editMiracleEquation: !this.state.editMiracleEquation
        });
        this.getAffirmations();
      });
    })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  toggleArchive = (e, id, archive) => {
    if (archive === true) {
      archive = false;
    } else {
      archive = true;
    }
    this.onFormUpdate(id, archive);
  }

  onDelete = (e, id) => {
    // console.log(e.currentTarget.dataset.id);
    // const id = e.target.getAttribute('data-id');
    this.deleteRecord(id);
  }

  deleteRecord = (id) => {
    const url = `${apiUrl}/api/affirmation/${id}`;
    fetch(url, {
      method: 'delete', 
      mode: 'cors',
      credentials: 'omit'
    })
    .then(response => {
      response.text().then(res => {
        this.getAffirmations();
      })
    })
  }

  onFormUpdate = (id, archive) => {
    const url = `${apiUrl}/api/affirmation/${id}`;
    let requestObject = {
      archive: archive,
      userId: this.state.userId
    }
    const formData = JSON.stringify(requestObject);
    fetch(url, {
      method: 'put',
      body: formData,
      mode: 'cors',
      credentials: 'omit'
    })
    .then(response => {
      response.text().then(res => {
        this.getAffirmations();
      })
    })
  }

  onFormSubmit = () => {
    const url = `${apiUrl}/api/affirmation`;
    let requestObject = {
      title: this.state.title,
      statement: this.state.statement,
      type: this.state.type,
      archive: this.state.archive,
      dueDate: this.state.dueDate,
      userId: this.state.userId
    }
    const formData = JSON.stringify(requestObject);
    fetch(url, {
      method: 'post',
      body: formData,
      mode: 'cors',
      credentials: 'omit'
    })
    .then(response => {
      response.text().then(res => {
        this.getAffirmations();
        this.toggleDialog();
      })
    })
  }


  render() {
    const { classes } = this.props;
    const { title, statement
      , visibleDialog, editMiracleEquation
      , visibleInfo, affirmations } = this.state;
    return (
      <div>
        {visibleDialog && 
          <Dialog
            open={visibleDialog}
            onClose={this.toggleDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Miracle Equation Affirmation"}</DialogTitle>
            <DialogContent>
              <form className={classes.w100}>
                    <Row>
                    <Col xs="12">
                    <TextField
                      id="outlined-multiline-flexible-1"
                      label="Goal/Mission"
                      multiline
                      rowsMax="8"
                      value={title}
                      onChange={this.handleChange('title')}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-multiline-flexible-2"
                      label="Miracle Equation Affirmation"
                      multiline
                      rowsMax="8"
                      value={statement}
                      onChange={this.handleChange('statement')}
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
                      id='submit-miracle-equation'
                      onClick={this.onFormSubmit}
                      style={{backgroundColor: '#c31924', color: '#fff', borderColor: '#c33424'}}>
                        Success is mine!
                      </Button>
                  </Col>
                  </Row>
                  </Col>
                  </Row>
              </form>
            </DialogContent>
          </Dialog>
        }
        {editMiracleEquation && 
          <Dialog
            open={editMiracleEquation}
            onClose={this.toggleAutoSuggestion}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Update Miracle Equation Affirmation"}</DialogTitle>
            <DialogContent>
              {/* <DialogContentText id="alert-dialog-description" style={{color: '#000'}}>
              test
              </DialogContentText> */}
              <form className={classes.w100}>
                    <Row>
                    <Col xs="12">
                    <TextField
                      id="outlined-multiline-flexible-2"
                      label="Miracle Equation Affirmation"
                      multiline
                      rowsMax="8"
                      value={this.state.currentStatement}
                      onChange={this.handleChange('currentStatement')}
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
                      id='update-miracle-equation'
                      onClick={this.onStatementUpdate}
                      style={{backgroundColor: '#c31924', color: '#fff', borderColor: '#c33424'}}>
                        Update Miracle Equation
                      </Button>
                  </Col>
                  </Row>
                  </Col>
                  </Row>
              </form>
            </DialogContent>
          </Dialog>
        }
        {visibleInfo && 
          <Dialog
            open={visibleInfo}
            onClose={this.toggleInfo}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Miracle Equation Instructions"}</DialogTitle>
            <DialogContent>
            <div>
                <strong>{`The Miracle Equation consists of two parts: `}
                </strong>
                {`Unwavering Belief in yourself and that you
                can achieve your mission and Extraordinary Effort to continue until the last moment 
                no matter what this is my only option!`}
            </div>
            <div>
            <strong>{`Unwavering Belief template: `}
            </strong>
                {`I am committed to maintaining Unwavering Belief that I [insert your mission below]
                and put forth Extraordinary Effort until I do, no matter what, this is my only option!`}
            </div>
            <div>
            <strong>{`Extraordinary Effort template: `}
            </strong>
                {`To achieve my mission I commit to [insert plan of action and time commitment]
                no matter what and I release myself from being emotionally attached to my results.`}
            </div>
            </DialogContent>
          </Dialog>
        }
        <SEO title="Auto Suggestion" />
        <Grid container spacing={16}>
          <Grid item sm={12}>
            <h1 style={pageStyles.textCenter}>
            MIRACLE EQUATION
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
          {affirmations != null && affirmations.length > 0 && affirmations.map((affirmation, index) => {
            return (
              <Grid item xs={12} sm={6} lg={4}
              key={`affirmationMiracleContainer-${index}`}>
                <BasicImageCard 
                  key={`affirmationMiracleCard-${index}`}
                  id={affirmation._id}
                  title={affirmation.title}
                  subHeader={<Moment format="MM/DD/YYYY">{affirmation.dueDate}</Moment>}
                  content={affirmation.statement}
                  editStatement={editMiracleEquation} 
                  toggleAutoSuggestion={this.toggleAutoSuggestion} 
                  archive={affirmation.archive} 
                  toggleArchive={this.toggleArchive}
                  onDelete={this.onDelete}>
                </BasicImageCard>
              </Grid>
            )
            })}
          {/*<Grid item sm={12}>
          <BasicImageCard 
            title={'Miracle Equation Affirmation'}
            subHeader={'June 1st 2019'}
            content={`My mission is to have $100,000.00 in my ICCU checking account by June 1st, 2019 
              and the Developer Toolbook MVP for early access ready
              and I put forth Extraordinary Effort until I achieve my mission
              , for as long as it takes, no matter what, this is my only option!
             To achieve my mission I commit to spend at least 30 minutes every single day 
             , for as long as it takes, no matter what and I release
             myself from being emotionally attached to my results!`}
             editMiracleEquation={this.state.editMiracleEquation} 
            toggleAutoSuggestion={this.toggleAutoSuggestion} 
            archive={this.state.archive} 
            toggleArchive={this.toggleArchive}>
          </BasicImageCard>
          </Grid>
          */}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(MiracleEquation);
