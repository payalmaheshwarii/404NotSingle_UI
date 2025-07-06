import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';

const Feed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const feed = useSelector(store => store.feed);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(BASE_URL + "user/feed", {
        withCredentials: true
      });
      if (response.status === 200) {
        dispatch(addFeed([...response.data.data]));
      }
    } catch (err) {
      if (err?.response?.status === 401) navigate('/login');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <>
      {isLoading && <div className="text-center mt-10">Loading...</div>}

      {!isLoading && isError && (
        <div className="text-center text-red-600 mt-10">
          Something went wrong. Please try again later.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="flex items-center justify-center px-4 py-10 min-h-[600px]">
          <div className="relative w-full max-w-md h-[500px] overflow-hidden rounded-2xl">
            {feed?.length > 0 ? (
              feed.map((user, index) => (
                <div
                  key={user._id}
                  className="absolute inset-0 flex justify-center items-center"
                  style={{
                    zIndex: feed.length - index,
                    transform: `translateY(${index * 5}px) scale(${1 - index * 0.02})`,
                    opacity: index > 3 ? 0 : 1,
                  }}
                >
                  <Card user={user} />
                </div>
              ))
            ) : (
              <p className="text-center">No users found</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Feed;
