/* eslint-disable indent */
import React from "react";

const Notification = ({ successNotification, failureNotification }) => {
  const notification = successNotification
    ? successNotification
    : failureNotification
    ? failureNotification
    : null;

  return <>{notification && <div>{notification}</div>}</>;
};

export default Notification;
