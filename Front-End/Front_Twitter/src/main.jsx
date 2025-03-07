import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import FirstPage from './pages/FirstPage.jsx'
import { BrowserRouter, Routes, Route} from "react-router";
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Notification from './pages/Notification.jsx';
import { Provider } from 'react-redux';
import store from './app/store.js'
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<FirstPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/notif" element={<Notification />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </Provider>
  </StrictMode>,
)