import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SEO from '../seo';
import BasicImageCard from '../Card/BasicImageCard';
import TextField from '@material-ui/core/TextField';
import { Row, Col } from 'reactstrap';
import Moment from 'react-moment';
import { connect } from "react-redux";

import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
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

class AutoSuggestion extends React.Component {
  constructor(props) {
    super(props);
    let missionDate = new Date();
    missionDate.setDate(missionDate.getDate() + 30);
    let userId = this.getUserId(props);
    this.state = {
      title: '',
      statement: '',
      type: 'autoSuggestion',
      archive: false,
      dueDate: missionDate,
      visibleDialog: false,
      visibleInfo: false,
      editAutoSuggestion: false,
      affirmations: null,
      userId: userId,
      currentId: null,
      currentStatement: null,
      isAuthenticated: props.isAuthenticated,
      profile: props.profile
    }
  }

  componentDidMount() {
    this.getAffirmations();
  }

  getUserId = (props) => {
    let value = props.profile;
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
        this.setState({affirmations: data});
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
      editAutoSuggestion: !this.state.editAutoSuggestion,
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
          editAutoSuggestion: !this.state.editAutoSuggestion
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
      , visibleDialog, editAutoSuggestion
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
            <DialogTitle id="alert-dialog-title">{"Auto Suggestion Statement"}</DialogTitle>
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
                      label="Auto Suggestion Statement"
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
        {editAutoSuggestion && 
          <Dialog
            open={editAutoSuggestion}
            onClose={this.toggleAutoSuggestion}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Update Auto Suggestion Statement"}</DialogTitle>
            <DialogContent>
              <form className={classes.w100}>
                    <Row>
                    <Col xs="12">
                    <TextField
                      id="outlined-multiline-flexible-2"
                      label="Auto Suggestion Statement"
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
                      id='update-auto-suggestion'
                      onClick={this.onStatementUpdate}
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
        {visibleInfo && 
          <Dialog
            open={visibleInfo}
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
            <Button onClick={this.toggleDialog} variant="contained" color="primary" autoFocus>
            <AddIcon />
            </Button>
          </Grid>
          
          {affirmations != null && affirmations.length > 0 && affirmations.map((affirmation, index) => {
            return (
              <Grid item xs={12} sm={6} lg={4}
              key={`affirmationContainer-${index}`}>
                <BasicImageCard 
                  key={`affirmationCard-${index}`}
                  id={affirmation._id}
                  title={affirmation.title}
                  subHeader={<Moment format="MM/DD/YYYY">{affirmation.dueDate}</Moment>}
                  content={affirmation.statement}
                  editStatement={editAutoSuggestion} 
                  toggleAutoSuggestion={this.toggleAutoSuggestion} 
                  archive={affirmation.archive} 
                  toggleArchive={this.toggleArchive}
                  onDelete={this.onDelete}>
                </BasicImageCard>
              </Grid>
            )
            })}
          {(affirmations == null || affirmations.length === 0)  &&
            <Grid item xs={12} sm={6} lg={4}
            key={`affirmationContainer-0`}>
              <BasicImageCard 
                key={`affirmationCard-0`}
                id={0}
                title={`Example Auto Suggestion`}
                subHeader={<Moment format="MM/DD/YYYY">{new Date()}</Moment>}
                content={`I have $100,000.00 in my bank account by June 1st 2020
                and I put forth the effort of working every single day at least 30
                minutes to achieve my goal and I will also give the best service
                that I am able as a Software Developer to achieve my goal. I am
                in possession and can touch the money now and I am open to receiving 
                a plan on how to accept the money that is already mine!`}
                editStatement={editAutoSuggestion} 
                toggleAutoSuggestion={this.toggleAutoSuggestion} 
                archive={this.state.archive} 
                toggleArchive={this.toggleArchive}
                onDelete={this.onDelete}>
              </BasicImageCard>
            </Grid>}
        </Grid>
      </div>
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

export default connect(
  mapStateToProps
) (withStyles(styles)(AutoSuggestion));
