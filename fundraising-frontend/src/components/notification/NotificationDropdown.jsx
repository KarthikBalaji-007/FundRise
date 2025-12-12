import React from 'react';
import { FaBell, FaCheckCircle, FaDonate, FaComment } from 'react-icons/fa';

const NotificationDropdown = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 1,
      type: 'donation',
      message: 'You received a donation of ₹2,000',
      campaign: 'Help Fight Cancer',
      time: '5 minutes ago',
      isRead: false
    },
    {
      id: 2,
      type: 'approval',
      message: 'Your campaign "Education Fund" has been approved',
      time: '2 hours ago',
      isRead: false
    },
    {
      id: 3,
      type: 'comment',
      message: 'New comment on your campaign',
      campaign: 'Help Fight Cancer',
      time: '1 day ago',
      isRead: true
    }
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'donation':
        return <FaDonate className="text-green-500" />;
      case 'approval':
        return <FaCheckCircle className="text-blue-500" />;
      case 'comment':
        return <FaComment className="text-orange-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Dropdown */}
      <div className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-xl border z-50 max-h-[500px] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-lg">Notifications</h3>
          <button className="text-primary text-sm hover:underline">
            Mark all as read
          </button>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto flex-1">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <FaBell className="mx-auto mb-3 text-gray-300" size={48} />
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition ${
                  !notif.isRead ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!notif.isRead ? 'font-semibold' : ''}`}>
                      {notif.message}
                    </p>
                    {notif.campaign && (
                      <p className="text-xs text-gray-600 mt-1">
                        Campaign: {notif.campaign}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>
                  {!notif.isRead && (
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t bg-gray-50 text-center">
          <button className="text-primary text-sm font-semibold hover:underline">
            View All Notifications
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationDropdown;
