import { Outlet, useNavigate } from "react-router"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import axios from 'axios';
import { BASE_URL } from "../utils/constants";


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store => store.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL + "profile/view ", {
          withCredentials: true
        })
        dispatch(addUser(response.data.data))
      }
      catch (err) {
        if (err.status === 401) {
          navigate('/login');
        }
      }
    }
    if (!userData) {
      fetchData();
    }
  }, [])

  return (
    <>
      <div className="h-screen flex flex-col bg-[#111827] text-white overflow-hidden">
        <Navbar />
        <main className="flex-grow overflow-y-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}
export default App