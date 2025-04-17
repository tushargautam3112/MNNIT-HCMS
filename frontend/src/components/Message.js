import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import React from "react";
import { useState} from "react";

const Message = props => {
  const [open, setOpen] = useState(props.open)
  const handleClose = () => {
    setOpen(prev => !prev)
  };

  // useEffect(() => {
  //   if (props) setOpen(prevOpen => !prevOpen);
  // }, [props, setOpen]);
  return (
    <Snackbar autoHideDuration={3000} open={open} onClose={handleClose}>
      <Alert
        severity={props.severity}
        sx={{ width: "100%" }}
        onClose={handleClose}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
};

Message.defaultProps = {
  open: false
}

export default Message;
