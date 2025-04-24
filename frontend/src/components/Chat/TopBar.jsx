import React from "react";

const TopBar = ({
  setSelectedUserId,
  selectedUserId,
  offlinePeople,
  onlinePeople,
}) => {
  const onlineUser = onlinePeople[selectedUserId];
  const offlineUser = offlinePeople[selectedUserId];

  const displayName = onlineUser
    ? onlineUser.username
    : `${offlineUser?.firstName || ""} ${offlineUser?.lastName || ""}`;

  const isOnline = !!onlineUser;

  return (
    <div className="absolute top-0 left-0 right-0 text-white w-full py-5 px-4 bg-gray-900 flex items-center gap-4 z-30 shadow-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 cursor-pointer"
        onClick={() => setSelectedUserId(null)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>

      <div className="flex items-center gap-2">
        <span className="text-lg font-medium capitalize">{displayName}</span>
        <span
          className={`h-3 w-3 rounded-full ${
            isOnline ? "bg-green-500" : "bg-gray-500"
          }`}
        />
      </div>
    </div>
  );
};

export default TopBar;
