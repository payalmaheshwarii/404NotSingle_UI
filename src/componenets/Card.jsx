import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/feedSlice';
import { useDispatch } from 'react-redux';
import clsx from 'clsx'; 

const Card = ({ user }) => {
  const dispatch = useDispatch();
  const [dismissed, setDismissed] = useState(null);

  const handleRequest = async (status, id, direction) => {
    try {
      setDismissed(direction); // Start swipe
      setTimeout(async () => {
        await axios.post(BASE_URL + 'requests/send/' + status + '/' + id, {}, {
          withCredentials: true,
        });
        dispatch(removeUser(id));
      }, 300);
    } catch (err) {
      console.error(err);
    }
  };

  let userSkills = Array.isArray(user.skills)
    ? user.skills.join(" ")
    : user?.skills?.split(",").join(" ");

  return (
    <div
      className={clsx(
        "flex justify-center max-w-sm w-full h-[480px] bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200 transition-all duration-300 transform",
        {
          'translate-x-[150%] opacity-0': dismissed === 'right',
          '-translate-x-[150%] opacity-0': dismissed === 'left',
        }
      )}
    >
      <div className="p-6 flex flex-col items-center overflow-y-auto">
        <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-4">
          <img
            alt="Profile"
            src={user.photoURL || "./default_profile_pic.png"}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {user?.firstName} {user?.lastName}
        </h2>
        <p className="mt-2 text-gray-600">{user?.about}</p>

        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <p><span className="font-semibold">Age:</span> {user?.age}</p>
          <p><span className="font-semibold">Gender:</span> {user?.gender}</p>
          <p><span className="font-semibold">Skills:</span> {userSkills}</p>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => handleRequest('interested', user._id, 'right')}
            className="px-4 py-2 bg-rose-500 text-white rounded-xl shadow hover:bg-rose-600 transition"
          >
            Connect
          </button>
          <button
            onClick={() => handleRequest('ignored', user._id, 'left')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;