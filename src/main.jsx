import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './componenets/App.jsx';
import Login from './componenets/Login.jsx';
import Feed from './componenets//Feed.jsx';
import Profile from './componenets/Profile.jsx';
import { BrowserRouter, Routes, Route } from "react-router";
import { store } from './utils/appStore.js';
import { Provider } from 'react-redux';
import Connections from './componenets/Connections.jsx';
import Requests from './componenets/Requests.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='login' element={<Login />}></Route>
            <Route path='feed' element={<Feed />}></Route>
            <Route path='profile' element={<Profile />}></Route>
            <Route path='/connections' element={<Connections />}></Route>
            <Route path='/requests' element={<Requests />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
