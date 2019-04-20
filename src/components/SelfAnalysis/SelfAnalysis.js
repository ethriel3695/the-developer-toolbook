// import React from 'react';
// import Layout from '../components/layout';
// // import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { withStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// // import Grid from '@material-ui/core/Grid';
// // import { Input } from '@progress/kendo-react-inputs';
// import { Row, Col } from 'reactstrap';
// import Button from '@material-ui/core/Button';
// import pdf from '../images/PDF_icon_sm.png';

// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import {DateFormatInput} from 'material-ui-next-pickers'

// // import { DatePicker } from '@progress/kendo-dateinputs-react-wrapper';
// // import { Button }from '@progress/kendo-react-buttons';
// // import { Dialog, DialogActionsBar }from '@progress/kendo-react-dialogs';

// const isBrowser = typeof window !== 'undefined';
// // import Button from '@material-ui/core/Button';

// const styles = theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//     width: '95%',
//   },
//   dense: {
//     marginTop: 16,
//   },
//   menu: {
//     width: 200,
//   },
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing.unit * 2,
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
//   w100: {
//     width: '100%',
//     overflow: 'hidden'
//   }
// });

// class SelfAnalysis extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       request: '',
//       problemResolution: '',
//       valueOfRequest: '',
//       requirements: '',
//       beneficiaries: '',
//       additionalComments: '',
//       dueDate: new Date(),
//       files: [],
//       visibleDialog: false,
//       userMessage: null
//     }
//   }

//   // componentDidMount () {
//   //   try {
//   //     require('@progress/kendo-ui');
//   //   } catch (e) {
//   //     console.log(e);
//   //   }
    
//   // }

//   toggleDialog = () => {
//     this.setState({
//         visibleDialog: !this.state.visibleDialog
//     });
//   }

//   onFormSubmit = (event) => {
//     event.preventDefault();
//     this.handleRequestSubmission();
//     this.handleFileUpload();
//   };

//   handleRequestSubmission = () => {
//     const url = 'http://127.0.0.1:3030/api/webRequests';
//     const formData = JSON.stringify(this.state);
//     fetch(url, {
//       method: 'post',
//       body: formData,
//       mode: "cors",
//       credentials: 'omit'
//     })
//     .then(response => {
//       response.text().then(res => {
//         this.setState({ visibleDialog: true, userMessage: res });
//         setTimeout(() => {
//           this.setState({ visibleDialog: false });
//         }, 2000);
//       })
//     })
//     .catch(error => {
//       error.text().then(err => {
//         this.setState({ visibleDialog: true, userMessage: err });
//       });
//     });  
//       // console.log(res.text());
//       // alert('done');
//   };

//   // onChange = (event) => {
//   //   this.setState({
//   //     file: event.target.files[0]
//   //   });
//   // }
//   handleChange = name => event => {
//     this.setState({ [name]: event.target.value });
//   };

//   handleFilePreview = event => {
//     let imageContainer = null;
//     let data = null;
//     Object.values(event.target.files).map((file, index) => {
//       imageContainer = document.createElement('img');
//       imageContainer.id = `preview-image_${index}`;
//       imageContainer.alt = file.name;
//       imageContainer.title = file.name;
//       imageContainer.setAttribute('height', '100');
//       imageContainer.setAttribute('width', '100');
//       imageContainer.setAttribute('style', 'padding: 2px;');

//       if (file.type === 'application/pdf') {
//         data = pdf;
//       } else {
//       if(!isBrowser) {
//           return false;
//       } else {
//           data = window.URL.createObjectURL(file);
//       }
        
//       }
//       imageContainer.src = data;
//       document.getElementById('blah').append(imageContainer);
//       setTimeout(function(){
//         // For Firefox it is necessary to delay revoking the ObjectURL
//         if(!isBrowser) {
//           return false;
//         } else {
//             window.URL.revokeObjectURL(data);
//         }
//       }, 100);
//       // this.setState({ files: [...this.state.files], file });
//       this.state.files.push(file);
//       return true;
//     });
//     // document.getElementById('blah').src = window.URL.createObjectURL(event.target.files[0])
//   }

//   handleFileUpload = () => {
//     let formData = new FormData();
//     const files = this.state.files;
//     if (files.length > 0) {
//       files.forEach((file, index) => {
//         formData.append('files[]', file);
//       });
//       formData.append('folderPath', 'web_requests');
//       formData.append('folderName', this.state.request);
//       const url = 'http://tools.spudnik.com/implements/PHP/utils/handleUploads.php';

//       fetch(url, {
//         method: 'post',
//         body: formData,
//       });
//     }
//     this.setState({ file: null });
//   }

//   onChangeDate = (date) => {
//     this.setState({dueDate: date});
//   } 
  
//   render() {
//     const { classes } = this.props;
//     // const {date} = this.state;
//     return (
//       <Layout>
//         <h1>Spudnik Web Request</h1>
//         {this.state.visibleDialog && 
//             <Dialog
//               open={this.state.visibleDialog}
//               onClose={this.toggleDialog}
//               aria-labelledby="alert-dialog-title"
//               aria-describedby="alert-dialog-description"
//             >
//               <DialogTitle id="alert-dialog-title">{"Request Confirmed"}</DialogTitle>
//               <DialogContent>
//                 <DialogContentText id="alert-dialog-description" style={{color: '#000'}}>
//                   {this.state.userMessage}
//                 </DialogContentText>
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={this.toggleDialog} color="secondary" autoFocus>
//                   Ok
//                 </Button>
//               </DialogActions>
//             </Dialog>
//         }
//         {  // <Dialog title={"Request Confirmed"} onClose={this.toggleDialog}>
//           //   <p style={{ margin: "25px", textAlign: "center" }}>{this.state.userMessage}</p>
//           //   <DialogActionsBar>
//           //       <button className="k-button" onClick={this.toggleDialog}>OK</button>
//           //   </DialogActionsBar>
//           // </Dialog>
//         }
//               <form className={classes.w100}>
//                     <Row>
//                     <Col xs="12" lg="6">
//                     <TextField
//                       id="outlined-multiline-flexible-1"
//                       label="Request title (Ex: An approval percentage report)"
//                       multiline
//                       rowsMax="8"
//                       value={this.state.request}
//                       onChange={this.handleChange('request')}
//                       className={classes.textField}
//                       margin="normal"
//                       variant="outlined"
//                     />
//                   </Col>
//                   <Col xs="12" lg="6">
//                     <TextField
//                       id="outlined-multiline-flexible-2"
//                       label="What is your request and the problem it solves?"
//                       multiline
//                       rowsMax="8"
//                       value={this.state.problemResolution}
//                       onChange={this.handleChange('problemResolution')}
//                       className={classes.textField}
//                       margin="normal"
//                       variant="outlined"
//                     />
//                   </Col>
//                   <Col xs="12" lg="6">
//                     <TextField
//                       id="outlined-multiline-flexible-3"
//                       label="What value does this request provide?"
//                       multiline
//                       rowsMax="8"
//                       value={this.state.valueOfRequest}
//                       onChange={this.handleChange('valueOfRequest')}
//                       className={classes.textField}
//                       margin="normal"
//                       variant="outlined"
//                     />
//                   </Col>
//                   <Col xs="12" lg="6">
//                     <TextField
//                       id="outlined-multiline-flexible-4"
//                       label="What are the requirements?"
//                       multiline
//                       rowsMax="8"
//                       value={this.state.requirements}
//                       onChange={this.handleChange('requirements')}
//                       className={classes.textField}
//                       margin="normal"
//                       variant="outlined"
//                     />
//                   </Col>
//                   <Col xs="12" lg="6">
//                     <TextField
//                       id="outlined-multiline-flexible-5"
//                       label="Who else is involved or benefits?"
//                       multiline
//                       rowsMax="8"
//                       value={this.state.beneficiaries}
//                       onChange={this.handleChange('beneficiaries')}
//                       className={classes.textField}
//                       margin="normal"
//                       variant="outlined"
//                     />
//                   </Col>
//                   <Col xs="12" lg="6">
//                     <TextField
//                       id="outlined-multiline-flexible-6"
//                       label="Additional Comments"
//                       multiline
//                       rowsMax="8"
//                       value={this.state.additionalComments}
//                       onChange={this.handleChange('additionalComments')}
//                       className={classes.textField}
//                       margin="normal"
//                       variant="outlined"
//                     />
//                   </Col>
//                   <Col xs="12" lg="6">
//                   <Row>
//                   <Col xs="12" lg="12" style={{marginLeft: 8, marginBottom: 8}}>
//                   <label htmlFor='file-upload'>Please upload relevant files</label>
//                   <br />
//                   <input id='file-upload' name='file-upload' type='file' multiple onChange={this.handleFilePreview}></input>
//                   </Col>
//                   <Col xs="12" lg="12" style={{marginLeft: 8}}>
//                   <div id='blah'></div>
//                   </Col>
//                   </Row>
//                   </Col>
//                   <Col xs="12" lg="6">
//                   <Row>
//                   <Col xs="12" lg="12" style={{marginLeft: 8, marginBottom: 8}}>
//                     {/* <label htmlFor='due-date'>Due Date</label>
//                     <br /> */}
//                     <DateFormatInput 
//                       name='date-input' 
//                       label='Due Date' 
//                       dateFormat='MM/dd/yyyy' 
//                       variant='outlined' 
//                       min={new Date()} 
//                       value={this.state.dueDate} 
//                       onChange={this.onChangeDate}
//                       dialog={true}
//                       />
//                     {/* <DatePicker
//                       id='due-date'
//                       min={new Date()}
//                       value={this.state.dueDate}
//                       onChange={this.handleChange('dueDate')}
//                        /> */}
//                   </Col>
//                   <Col xs="12" lg="12" style={{marginLeft: 8}}>
//                     <Button
//                       variant="contained"
//                       id='submit-web-request'
//                       onClick={this.onFormSubmit}
//                       style={{backgroundColor: '#c31924', color: '#fff', borderColor: '#c33424'}}>
//                         Submit Request
//                       </Button>
//                   </Col>
//                   </Row>
//                   </Col>
//                   </Row>
//               </form>
//       </Layout>
//     );
//   }
// } 

// export default withStyles(styles)(SelfAnalysis);
