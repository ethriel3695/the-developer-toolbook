import React from 'react';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


const theme = createMuiTheme({
  overrides: {
    MuiSelect: {
      selectMenu: {
        whiteSpace: 'normal',
      }
    }
  }
});

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
  'Do you frequently make mistakes in your work? If so, why?',
  'Are you sarcastic and offensive in your conversation?',
  'Do you deliberately avoid the association of anyone, and if so, why?',
  'Do you suffer frequently from indigestion? If so, what is the cause?',
  'Does life seem futile and the future hopeless to you or bright and hopeful? Why?',
  'Do you like your occupation? If not, why?',
  'Do you often feel self-pity, and if so why?',
  'Are you envious of those who excel you?',
  'To which do you devote most time, thinking of SUCCESS, or of FAILURE?',
  'Are you gaining or losing self-confidence as you grow older?',
  'Do you learn something of value from all mistakes?',
  `Are you permitting someone to worry you? If so, why?
   List each person and why they bother you and what you are going to do about it?`,
   'Do you learn something of value from all mistakes?', 
  'Are you sometimes "in the clouds" and at other times in the depth of despondency?',
  'Who has the most inspiring influence on you? What is the cause?',
  'Do you tolerate negative or discouraging influences that you can avoid?',
  'Are you careless of your personal appearance? If so, when and why?',
  'Have you learned how to "drown your troubles" by being to busy to face them?',
  'Would you call yourself a "spineless weakling" if you permitted others to think for you?',
  'Do you neglect internal bathing until autointoxication makes you ill tempered?',
  'How many preventable disturbances annoy you, and why do you tolerate them?',
  'Do you resort to liquor, narcotics or cigarettes to "quiet your nerves"? If so why?',
  'Do you have a DEFINITE MAJOR PURPOSE, and if so, what is it, and what plan have you for achieving it?',
  'Do you suffer from any of the Six Basic Fears? If so, which ones?',
  'Have you a method by which you can shield yourself against the negative influence of others?',
  'Do you make deliberate use of autosuggestion to make your mind positive?',
  'Which do you value most, your material possessions or the privilege of controlling your own thoughts?',
  'Has today added anything of value to your stock of knowledge or state of mind?',
  'Do you face squarely the circumstances that make you unhappy, or sidestep the responsibility?',
  'Do you analyze all mistakes and failures and do what it takes to profit by them?',
  'Can you name three of your most damaging weaknesses? What are you doing to correct them?',
  'Do you encourage other people to bring their worries to you for sympathy?',
  'Do you choose, from your daily experiences, lessons or influences that aid in your personal advancement?',
  'Does your presence have a negative influence on other people as a rule?',
  'Do you form your own opions or permit yourself to be influenced by others?',
  'Does your occupation inspire you with faith and desire?',
  'Are you conscious of possessing spiritual forces of sufficient power to enable you to keep your mind free from all forms of FEAR?',
  'Does your spirituality assist you to keep your own mind positive?',
  'Do you feel it your duty to share other people\'s worries? If so why?',
  'If you believe that "birds of a feather flock together", what have you learned about yourself by studying the friends you attract?',
  'What connection, if any, do you see between the people whom you associate most closely, and any unhappiness you may experience?',
  'Could it be possible that some person you consider to be a friend is, in reality, your worst enemy because of their negative influence on your mind?',
  'By what rule do you judge who is helpful and who is damaging to you?',
  'Are your intimate associates mentally superior or inferior to you?',
  'How much time out of every 24 hours do you devote to: \n a. your occupation \n b. sleep \n c. play and relaxation \n d.acquiring useful knowledge \n e. plain waste?',
  'Who amoung your aquaintances \n a. encourages you most \n b. cautions you most \n c. discourages you most \n d. assists you most in other ways?',
  'What is your greatest worry? Why do you tolerate it?',
  'When others offer you free, unsolicited advice, do you accept it without question or analyze their motive?',
  'What, above all else, do you most desire and are you willing to subordinate all other desires for this one? How much time daily do you devote to acquiring it?',
  'Do you change your mind often? If so why?',
  'Do you usually finish everything you begin?',
  'Are you easily impressed by other people\'s business or professional titles, university degrees or wealth?',
  'Are you easily influenced by what other people think or say of you?',
  'Do you cater to people because of their social or financial status?',
  'Whom do you believe to be the greatest person living? In what respect is this person superior to you?',
  'How much time have you devoted to studying and answering these questions?(At least one day is necessary for analyzing and answering the entire list.)',
];

const apiUrl = 'https://the-developer-toolbook-api.appspot.com';
// const apiUrl = 'http://localhost:8080';
class SelfAnalysis extends React.Component {
  constructor(props) {
    super(props);
    let missionDate = new Date();
    missionDate.setDate(missionDate.getDate() + 30);
    let userId = props.profile !== null ? this.getUserId(props) : null;
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
      currentCommitment: null,
      isAuthenticated: props.isAuthenticated,
      profile: props.profile
    }
  }

  // componentDidMount() {
  //   this.getAnalysis();
  // }
  componentDidMount() {
    if(this.props.profile) {
      if (!this.state.userId) {
        let userId = this.getUserId(this.props);
        this.setState({userId: userId}, () => {
          this.getAffirmations();
        });
      } else {
        this.getAffirmations();
      }
      
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.profile !== this.props.profile) {
      let userId = this.getUserId(this.props);
      this.setState({userId: userId}, () => {
        this.getAnalysis();
      });
    }
  }

  getUserId = (props) => {
    let value = props.profile;
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
            // fullScreen={true}
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
                    <MuiThemeProvider theme={theme}>
                    <Select
                      style={{whiteSpace: 'normal'}}
                      value={question}
                      autoWidth={true}
                      onChange={this.handleChange('question')}
                      inputProps={{
                        name: 'Question',
                        id: 'question-select'
                      }}
                    >
                      {names.map((question, index) => (
                        <MenuItem style={{whiteSpace: 'normal', height: '72px'}} key={index} value={question}>
                          {question}
                        </MenuItem>
                      ))}
                    </Select>
                    </MuiThemeProvider>
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
                      label="What is the truth?"
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
                      label="What are you going to do about it?"
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
                  title={analysis.question}
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
            {(analysis == null || analysis.length === 0)  &&
              <Grid item xs={12} sm={6} lg={4}
              key={`selfAnalysisContainer-0`}>
                <BasicImageCard 
                  key={`selfAnalysisCard-0`}
                  id={0}
                  title={`Example: Why do I shy away from stressful situations?`}
                  subHeader={<Moment format="MM/DD/YYYY">{new Date()}</Moment>}
                  content={`I take things personally when people say something 
                  and I start to shut down.`}
                  truth={`The reality is that the stress is normal and I can handle
                  anything that comes my way. The proof is the fact that I am alive
                  and willing to move forward with the life I have had thus far.`}
                  commitment={`I am going to place myself in uneasy and stressful
                  situations so that I can learn to process and handle stress
                  and be a better person for it!`}
                  editStatement={editSelfAnalysis} 
                  toggleAutoSuggestion={this.toggleAutoSuggestion} 
                  archive={this.state.archive} 
                  toggleArchive={this.toggleArchive}
                  onDelete={this.onDelete}>
                </BasicImageCard>
              </Grid>}
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

const mapStateToProps = (auth) => {
  const { isAuthenticated, profile } = auth.auth
  return {
    isAuthenticated,
    profile
  }
}

export default connect(
  mapStateToProps
) (withStyles(styles)(SelfAnalysis));
