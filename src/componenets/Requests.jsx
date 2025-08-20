import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requests';

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + 'user/requests/received', {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRequest = async (status, id) => {
    try {
      await axios.post(BASE_URL + `requests/review/${status}/${id}`, {}, {
        withCredentials: true,
      });
      dispatch(removeRequest(id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;
  if (requests.length === 0)
    return <div className="flex flex-col text-center justify-center p-6 space-y-10 w-full text-white">No requests found</div>;

  return (
    <div className="bg-[#111827] flex flex-col text-center justify-center px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-white mb-8">Connection Requests</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {requests.map((request) => {
          const { firstName, lastName, age, gender, skills, about, photoURL } =
            request.fromUserId;

          return (
            <div
              key={request._id}
              className="bg-white rounded-2xl shadow-lg p-6 flex gap-6 items-center"
            >
              <img
                src={
                  photoURL ||
                  './default_profile_pic.png'
                }
                alt="profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-red-600"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">
                  {firstName} {lastName}
                </h2>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Age:</span> {age}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Gender:</span> {gender}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Skills:</span> {skills.join(', ')}
                </p>
                <p className="text-sm text-gray-500 mt-1 italic">{about}</p>

                <div className="flex gap-4 mt-4 items-center justify-center">
                  <button
                    onClick={() => handleRequest('accepted', request._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRequest('rejected', request._id)}
                    className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-lg font-medium transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
