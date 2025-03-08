import { Alert } from "react-bootstrap";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  } else {
    return <Alert variant="success">{message}</Alert>;
  }
};

export default Notification;
