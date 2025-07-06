import React, { useEffect, useState } from 'react';
import EditProfile from './EditProfile';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from "../utils/userSlice";
import { useNavigate } from 'react-router';
import axios from 'axios';
import { BASE_URL } from "../utils/constants";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(store => store.user);
    const [loading, setLoading] = useState(false);

    //need to add this as redux does not persists store variables. Whenever we will reload the profile page, redux store will become null and we need to make an api call to populate the user data again. 
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(BASE_URL + "profile/view", {
                    withCredentials: true
                });
                dispatch(addUser(response.data.data));
            } catch (err) {
                if (err?.response?.status === 401) {
                    navigate('/login');
                } else {
                    console.error(err);
                }
            } finally {
                setLoading(false);
            }
        };

        if (!userData) {
            fetchData();
        }
    }, []);

    if (!userData || loading) {
        return <div className="text-center py-10 text-gray-600 text-lg">Loading profile...</div>;
    }

    return (
        <div>
            <EditProfile user={userData} />
        </div>
    );
};

export default Profile;