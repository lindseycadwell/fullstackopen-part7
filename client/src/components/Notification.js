import React from "react";
import { useSelector } from "react-redux";

import {
  selectNotificationContent,
  selectNotificationType,
} from "../slices/notificationSlice";

const Notification = () => {
  const notificationContent = useSelector(selectNotificationContent);
  const notificationType = useSelector(selectNotificationType);

  const styles =
    notificationType === "success"
      ? successNotificationStyles
      : failureNotificationStyles;

  return notificationContent ? (
    <div style={styles}>{notificationContent}</div>
  ) : null;
};

export default Notification;

const successNotificationStyles = {
  border: "3px solid #00FF00",
  padding: "5px",
  marginBottom: "15px",
};

const failureNotificationStyles = {
  border: "3px solid #FF0000",
  padding: "5px",
  marginBottom: "15px",
};
