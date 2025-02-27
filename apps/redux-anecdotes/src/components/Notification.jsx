import { useDispatch, useSelector } from "react-redux";
import { clearNotif } from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (notification === null) {
    return null;
  } else {
    setTimeout(() => {
      dispatch(clearNotif());
    }, 3000);

    return <div style={style}>{notification}</div>;
  }
};

export default Notification;
