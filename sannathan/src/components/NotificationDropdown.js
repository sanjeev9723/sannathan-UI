import React, { useState, useEffect, useRef } from 'react';
import notification from "../screens/images/notification.png"

function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = (notificationId) => {
    // Implement logic to mark the notification as read
    // Update the notifications array accordingly
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="notification-dropdown" ref={dropdownRef}>
      {/* <button className="notification-dropdown__button" onClick={toggleDropdown}>
        <img src={notification} alt="Notifications" className="language-icon"/>
        {notifications.length > 0 && (
          <span className="notification-dropdown__count">
            {notifications.length}
          </span>
        )}
      </button> */}
      <button href="#!" className="btn tools-item btn_icons">
							<i className="fa fa-bell-o" aria-hidden="true"></i>
              {/* notification number */}
							{/* <i className="tools-item-count">4</i> */}
						</button>
      {isOpen && (
        <ul className="notification-dropdown__list">
          {notifications.map((notification) => (
            <li key={notification.id} onClick={() => markAsRead(notification.id)}>
              {notification.message}
            </li>
          ))}
          {notifications.length === 0 && (
            <li className="notification-dropdown__empty">No notifications</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default NotificationDropdown;
