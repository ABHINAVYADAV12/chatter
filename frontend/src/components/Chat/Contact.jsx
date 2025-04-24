import React from "react";
import Avatar from "./Avatars";

const Contact = ({
  userId,
  username,
  selectedUserId,
  setSelectedUserId,
  isOnline,
  avatarLink,
}) => {
  const isSelected = selectedUserId === userId;

  return (
    <li
      key={userId}
      className={`capitalize flex items-center justify-between gap-2 py-2 lg:py-3 px-4 lg:px-5 rounded-[1.3rem] cursor-pointer ${
        isSelected ? "bg-primary text-white" : "hover:bg-accent"
      }`}
      onClick={() => {
        setSelectedUserId(userId);
        console.log(userId);
      }}
    >
      <div className="flex items-center gap-3">
        <Avatar
          userId={userId}
          username={username}
          isOnline={isOnline}
          avatarLink={avatarLink}
        />
        <span className="text-xs lg:text-base">{username}</span>
      </div>

      {isOnline && (
        <span className="text-[10px] rounded-full bg-green-500 px-2 py-0.5 text-white">
          Active
        </span>
      )}
    </li>
  );
};

export default Contact;
