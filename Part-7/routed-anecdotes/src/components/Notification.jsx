const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  } else {
    return (
      <div>
        <h2>{notification}</h2>
      </div>
    );
  }
};

export default Notification;
