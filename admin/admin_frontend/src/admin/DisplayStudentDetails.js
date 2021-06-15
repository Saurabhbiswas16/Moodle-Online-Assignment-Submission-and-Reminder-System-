// import React from "react";

// import AddBoxIcon from "@material-ui/icons/AddBox";
// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import { TextField, Snackbar } from "@material-ui/core";
// import MuiAlert from "@material-ui/lab/Alert";
// import {
//   makeStyles,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   FormHelperText,
//   Select,
// } from "@material-ui/core";

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }
// function timeout(delay) {
//   return new Promise((res) => setTimeout(res, delay));
// }
// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

// function DisplayStudentDetails(props) {
//   return (
//     <div>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         scroll={scroll}
//         aria-labelledby="scroll-dialog-title"
//         aria-describedby="scroll-dialog-description"
//       >
//         <DialogTitle id="scroll-dialog-title">StudentDetails</DialogTitle>
//         <DialogContent dividers={scroll === "paper"}>
//           <DialogContentText
//             id="scroll-dialog-description"
//             ref={descriptionElementRef}
//             tabIndex={-1}
//           >
//             <div className="form-group">
//               <UploadFiles addUploadedFile={addUploadedFile} />
//             </div>
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Close
//           </Button>
//           <Button onClick={handleUpload} color="primary">
//             Upload Assignment
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default DisplayStudentDetails;
