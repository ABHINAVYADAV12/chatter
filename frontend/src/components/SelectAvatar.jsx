import React, { useEffect, useState } from "react";
import axios from "axios";

const SelectAvatar = ({ setSelectedLink, selectedLink }) => {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await axios.get("/api/avatar/all");
        setAvatars(response.data.avatars);
      } catch (error) {
        console.error("Error fetching avatars:", error);
      }
    };
    fetchAvatars();
  }, []);

  return (
    <div className="mt-3">
      <p className="block mb-2 text-lg font-medium text-white">
        Choose Avatar
      </p>
      <div className="grid grid-cols-4 gap-4 mb-7">
        {avatars?.map((avatar) => (
          <img
            key={avatar._id || avatar.link}
            src={avatar.link}
            onClick={() => setSelectedLink(avatar.link)}
            alt={`Avatar ${avatar._id}`}
            style={{ width: "90px", height: "90px", margin: "5px" }}
            className={`rounded-full cursor-pointer p-1 transition duration-200 border-2 ${
              selectedLink === avatar.link
                ? "border-blue-500 scale-105"
                : "border-transparent hover:scale-105"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectAvatar;
