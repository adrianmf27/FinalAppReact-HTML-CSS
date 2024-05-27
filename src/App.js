/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-comment-textnodes */
import './App.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import CreateUserComp from './Components/CreateUserComp';
import LoginUserComp from './Components/LoginUserComp';
import React, { useEffect, useState } from 'react';
import { backendUrl } from './Globals';
import CreatePresentComp from './Components/CreatePresentComp';
import MyPresentsComp from './Components/MyPresentsComp';

function App() {
  let [notif, setNotif] = useState("")
  let [login, setLogin] = useState(false)

  let navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("apiKey") != null) setLogin(true)

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {  window.removeEventListener("beforeunload", handleBeforeUnload)  }
  }, [])  

  const handleBeforeUnload = (event) => {
    if (login) { setLogin(false) }
  };
  
  let createNotif = (msg) => {
    setNotif(msg)
    setTimeout(() => {setNotif("")}, 3000)
  }

  let disconnect = async () => {
    await fetch(backendUrl + "/users/disconnect?apiKey=" + localStorage.getItem("apiKey"))
    localStorage.removeItem("apiKey")
    setLogin(false)
    navigate("/login")
  }

  return (
    <div className="main-container">
      <nav>
        <ul className='navbar'>
          <li><Link to="/">Index</Link></li>
          {!login && <li><Link to="/register">Register</Link></li>}
          {!login && <li><Link to="/login">Log In</Link></li>}
          {login && <li><Link to="/presents">Create Present</Link></li>}  
          {login && <li><Link to="/myPresents">My Presents</Link></li>}  
          {login && <li><Link to="#" onClick={disconnect}>Disconnect</Link></li>}  
        </ul>
      </nav>

      {notif != "" && (
        <div className='notification'>
          {notif}
          <span className='close-btn' onClick={() => {setNotif("")}}>X</span>
        </div>
      )}
      
      <Routes>
        <Route path="/" element={<p>Index of website</p>}/>
        <Route path="/register" element={<CreateUserComp createNotification={createNotif}/>}/>
        <Route path="/login" element={<LoginUserComp setLogin={setLogin}/>}/>
        <Route path="/presents" element={<CreatePresentComp createNotification={createNotif} />}/>
        <Route path="/myPresents" element={<MyPresentsComp createNotification={createNotif} />}/>
      </Routes>
    </div>
  );
}

export default App;