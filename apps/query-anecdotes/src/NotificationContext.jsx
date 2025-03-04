import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return action.payload;
    case "HIDE":
      return "";
    default:
      return state;
  }
};

// Create Context
const NotificationContext = createContext();

// Since Provider gives [notification, dispatch] as an array, this returns notification
export const useNotificationValue = () => {
  const context = useContext(NotificationContext);
  return context[0];
};

// Since Provider gives [notification, dispatch] as an array, this returns dispatch
export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext);
  return context[1];
};

// Provider Component
export const NotificationProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, "");

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
