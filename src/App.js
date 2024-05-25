/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-comment-textnodes */
import './App.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import CreateUserComp from './Components/CreateUserComp';
import LoginUserComp from './Components/LoginUserComp';
import React, { useEffect, useState } from 'react';
import { backendUrl } from './Globals';

function App() {
  let [notif, setNotif] = useState("")
  let [login, setLogin] = useState(false)

  let navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("apiKey")!= null) setLogin(true)
  }, [])  

  let createNotif = (msg) => {
    setNotif(msg)
    setTimeout(() => {setNotif("")}, 3000)
  }

  let disconnect = async () => {
    await fetch(backendUrl + "/user/disconnect?apiKey=" + localStorage.getItem("apiKey"))
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
        <Route path="/register" element={<CreateUserComp createNotification={createNotif}/>}/>
        <Route path="/login" element={<LoginUserComp setLogin={setLogin}/>}/>
        <Route path="/" element={<p>Index of website</p>}/>
      </Routes>
    </div>
  );
}

export default App;