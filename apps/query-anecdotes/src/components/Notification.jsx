import {
  useNotificationValue,
  useNotificationDispatch,
} from "../NotificationContext";
import { useEffect } from "react";

const Notification = () => {
  const notification = useNotificationValue();
  const dispatch = useNotificationDispatch();

  // useEffect deals with clearing notification; runs/triggered on notification/dispatch change
  useEffect(() => {
    if (notification) {
      const timeout = setTimeout(() => {
        dispatch({ type: "HIDE" });
      }, 3000); // Hide after 3 seconds

      // Cleanup the timeout if notification changes before timeout ends
      return () => clearTimeout(timeout);
    }
  }, [notification, dispatch]); // Only run when notification changes

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (notification === "") return null;

  return <div style={style}>{notification}</div>;
};

export default Notification;
