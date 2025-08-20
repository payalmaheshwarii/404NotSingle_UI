import React, { useState } from 'react';
import Card from './Card';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [age, setAge] = useState(user?.age || '');
    const [gender, setGender] = useState(user?.gender || '');
    const [photoURL, setphotoURL] = useState(user?.photoURL || '');
    const [about, setAbout] = useState(user?.about || '');
    const [skills, setSkills] = useState(user?.skills || '');
    const [showMessage, setShowMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(null);
    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setShowErrorMessage(null);
            
        
            const response = await axios.post(BASE_URL + 'profile/edit', { firstName, lastName, age, gender, photoURL, about, skills }, {
                withCredentials: true
            });

            if (response.status ===200) {
                setShowMessage(true);
                dispatch(addUser(response?.data?.data));
                window.scrollTo({
                    top: 0,
                });
    
                setTimeout(()=> {
                    setShowMessage(false)
                }, 2000)
            }


        }
        catch (err) {
            console.log(err)
            setShowErrorMessage(err?.response?.data?.message);
        }
    }

    return (
        <>
            { showMessage && <div className="mx-auto max-w-md mt-6 px-4 py-3 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-md text-center"> ✅ Profile saved successfully! </div>  }
            {showErrorMessage && <div className='mx-auto max-w-md mt-6 px-4 py-3 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md text-center'> {showErrorMessage} </div>}
            <div className="flex flex-col items-center justify-center px-4 py-10">

                <div className="flex items-center gap-8">
                    <div className="max-w-sm w-full bg-white shadow-xl rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300">
                        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">Edit Profile</h2>

                        <form className="space-y-5" name='edit' onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    type="text"
                                    placeholder="Enter your first name"
                                    className="text-gray-800 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    type="text"
                                    placeholder="Enter your last name"
                                    className="text-gray-800 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                <input
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    type="number"
                                    placeholder="Your age"
                                    className="text-gray-800 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="text-gray-800 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                                <input
                                    value={photoURL}
                                    onChange={(e) => setphotoURL(e.target.value)}
                                    type="url"
                                    placeholder="Link to your profile photo"
                                    className="text-gray-800 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                                <textarea
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                    rows={2}
                                    className="text-gray-800 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
                                <textarea
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    rows={4}
                                    placeholder="Write something about yourself..."
                                    className="text-gray-800 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 rounded-lg shadow-md transition duration-300"
                            >
                                Save Profile
                            </button>
                        </form>
                        
                    </div>
                    
                    
                    <Card user = {{ firstName, lastName, age, gender, photoURL, about, skills }}/> 
                </div>
                
            </div>
        </>

    );
};

//TODO: when we click on connect or ignore in card of edit profile... it also do the swipes just like an idependent card component. Card should not be working like this in edit profile page. It should stick to UI on any button click
//TODO: In mobile view these both componenets should come above each other.. not side by side
export default EditProfile;
