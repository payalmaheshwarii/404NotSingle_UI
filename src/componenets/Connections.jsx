import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(BASE_URL + 'user/connections', {
          withCredentials: true,
        });
        dispatch(addConnections(res.data.data));
      } catch (err) {
        console.error(err);
      }
    };

    fetchConnections();
  }, []);

  if (!connections) return null;
  if (connections.length === 0)
    return <div className="text-center min-h-screen text-white py-10">No connections found</div>;

  return (
    <div className="bg-[#111827] min-h-screen px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-white mb-8">Your Connections</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="bg-white rounded-2xl shadow-lg p-6 flex gap-6 items-center"
          >
            <img
              src={
                connection.photoURL ||
                './default_profile_pic.png'
              }
              alt="profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-red-600"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {connection.firstName} {connection.lastName}
              </h2>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Age:</span> {connection.age}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Gender:</span> {connection.gender}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Skills:</span>{' '}
                {connection.skills.join(', ')}
              </p>
              <p className="text-sm text-gray-500 mt-1 italic">{connection.about}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
