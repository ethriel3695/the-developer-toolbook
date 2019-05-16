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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

const names = [
  'Do you complain often of feeling bad? If so, what is the cause?',
  'Do you find fault with other people at the slightest provocation?',
  'Do you frequently make mistakes in your work? If so, why?'
];

const apiUrl = 'https://the-developer-toolbook-api.appspot.com';
// const apiUrl = 'http://localhost:8080';
class SelfAnalysis extends React.Component {
  constructor(props) {
    super(props);
    let missionDate = new Date();
    missionDate.setDate(missionDate.getDate() + 30);
    let userId = this.getUserId();
    this.state = {
      question: '',
      answer: '',
      truth: '',
      commitment: '',
      archive: false,
      dueDate: missionDate,
      visibleDialog: false,
      visibleInfo: false,
      editSelfAnalysis: false,
      analysis: null,
      userId: userId,
      currentId: null,
      currentAnswer: null,
      currentTruth: null,
      currentCommitment: null
    }
  }

  componentDidMount() {
    this.getAnalysis();
  }

  getUserId = () => {
    let value = JSON.parse(localStorage.getItem('profile'));
    let userId = value.sub.split('|')[1];
    return userId;
  }

  getAnalysis = () => {
    const url = `${apiUrl}/api/analysis`;
    let requestObject = {
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
        this.setState({analysis: data});
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

  toggleAutoSuggestion = (e, id, answer, truth, commitment) => {
    this.setState({
        editSelfAnalysis: !this.state.editSelfAnalysis,
        currentId: id,
        currentAnswer: answer,
        currentTruth: truth,
        currentCommitment: commitment
    });
  }

  onStatementUpdate = () => {
    let id = this.state.currentId;
    let answer = this.state.currentAnswer;
    let truth = this.state.currentTruth;
    let commitment = this.state.currentCommitment;
    const url = `${apiUrl}/api/analysis/${id}`;
    let requestObject = {
        answer: answer,
        truth: truth,
        commitment: commitment,
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
          editSelfAnalysis: !this.state.editSelfAnalysis
        });
        this.getAnalysis();
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
    const url = `${apiUrl}/api/analysis/${id}`;
    fetch(url, {
      method: 'delete', 
      mode: 'cors',
      credentials: 'omit'
    })
    .then(response => {
      response.text().then(res => {
        this.getAnalysis();
      })
    })
  }

  onFormUpdate = (id, archive) => {
    const url = `${apiUrl}/api/analysis/${id}`;
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
        this.getAnalysis();
      })
    })
  }

  onFormSubmit = () => {
    const url = `${apiUrl}/api/analysis`;
    let requestObject = {
        question: this.state.question,
        answer: this.state.answer,
        truth: this.state.truth,
        commitment: this.state.commitment,
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
        this.getAnalysis();
        this.toggleDialog();
      })
    })
  }


  render() {
    const { classes } = this.props;
    const { question, answer, truth, commitment
      , visibleDialog, editSelfAnalysis
      , visibleInfo, analysis } = this.state;
    return (
      <div>
        {visibleDialog && 
          <Dialog
            open={visibleDialog}
            onClose={this.toggleDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Self Analysis"}</DialogTitle>
            <DialogContent>
              <form className={classes.w100}>
                    <Row>
                    <Col xs="12">
                    <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="question-select">Question</InputLabel>
                    <Select
                      value={this.state.question}
                      autoWidth={true}
                      onChange={this.handleChange}
                      style={{width: '10 !important'}}
                      inputProps={{
                        name: 'Question',
                        id: 'question-select'
                      }}
                    >
                      {names.map((question, index) => (
                        <MenuItem key={index} value={question}>
                          {question}
                        </MenuItem>
                      ))}
                    </Select>
                    </FormControl>
                    {/* <TextField
                      id="outlined-multiline-flexible-1"
                      label="Question"
                      multiline
                      rowsMax="8"
                      value={question}
                      onChange={this.handleChange('question')}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    /> */}
                    <TextField
                      id="outlined-multiline-flexible-2"
                      label="Answer"
                      multiline
                      rowsMax="8"
                      value={answer}
                      onChange={this.handleChange('answer')}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-multiline-flexible-3"
                      label="What is the truth once you strip away your limiting beliefs?"
                      multiline
                      rowsMax="8"
                      value={truth}
                      onChange={this.handleChange('truth')}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-multiline-flexible-4"
                      label="What are you committed to in order to shift your mindset?"
                      multiline
                      rowsMax="8"
                      value={commitment}
                      onChange={this.handleChange('commitment')}
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
                      id='submit-self-analysis'
                      onClick={this.onFormSubmit}
                      style={{backgroundColor: '#c31924', color: '#fff', borderColor: '#c33424'}}>
                        Clarity
                      </Button>
                  </Col>
                  </Row>
                  </Col>
                  </Row>
              </form>
            </DialogContent>
          </Dialog>
        }
        {editSelfAnalysis && 
          <Dialog
            open={editSelfAnalysis}
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
                      label="Answer"
                      multiline
                      rowsMax="8"
                      value={this.state.currentAnswer}
                      onChange={this.handleChange('currentAnswer')}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-multiline-flexible-3"
                      label="What is the truth once you strip away your limiting beliefs?"
                      multiline
                      rowsMax="8"
                      value={this.state.currentTruth}
                      onChange={this.handleChange('currentTruth')}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-multiline-flexible-4"
                      label="What are you committed to in order to shift your mindset?"
                      multiline
                      rowsMax="8"
                      value={this.state.currentCommitment}
                      onChange={this.handleChange('currentCommitment')}
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
                      id='update-self-analysis'
                      onClick={this.onStatementUpdate}
                      style={{backgroundColor: '#c31924', color: '#fff', borderColor: '#c33424'}}>
                        Update Self Analysis
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
            <DialogTitle id="alert-dialog-title">{"Self Analysis Instructions"}</DialogTitle>
            <DialogContent>
            <div>
                <strong>{`Answer these questions with Honesty and you will find the
                truth about yourself and experience growth! `}
                </strong>
            </div>
            <br />
            <div>
            <strong>{`Take the time to answer all the questions in full
                and if you cannot make an honest assessment then find
                someone you trust and have them complete an honest
                assessment about you!`}
            </strong>
            </div>
            <br />
            <div>
            <strong>{`Only when you look at yourself with introspection can change
                really begin to happen!`}
            </strong>
            </div>
            </DialogContent>
          </Dialog>
        }
        <SEO title="Self Analysis" />
        <Grid container spacing={16}>
          <Grid item sm={12}>
            <h1 style={pageStyles.textCenter}>
            SELF ANALYSIS
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
          {analysis != null && analysis.length > 0 && analysis.map((analysis, index) => {
            return (
              <Grid item xs={12} sm={6} lg={4}
              key={`selfAnalysisContainer-${index}`}>
                <BasicImageCard 
                  key={`selfAnalysisCard-${index}`}
                  id={analysis._id}
                  title={analysis.answer}
                  subHeader={<Moment format="MM/DD/YYYY">{analysis.dueDate}</Moment>}
                  content={analysis.answer}
                  truth={analysis.truth}
                  commitment={analysis.commitment}
                  editStatement={editSelfAnalysis} 
                  toggleAutoSuggestion={this.toggleAutoSuggestion} 
                  archive={analysis.archive} 
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

export default withStyles(styles)(SelfAnalysis);
