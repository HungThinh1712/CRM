import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


export default function AlertDialog(props) {
  
  return (
    <div>    
      <Dialog
        open={props.open} onClose={props.onClose}
      >
       
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Bạn có chắc muốn xóa sản phẩm này ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onDeleteClick} color="primary">
            Xóa
          </Button>
          <Button onClick={props.onClose} color="primary" autoFocus>
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}