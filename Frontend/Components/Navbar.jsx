import React, { useState } from "react";
import Signup from './Signup';
import { useNavigate, NavLink } from 'react-router-dom';
import Login from './Login';

function Navbar() {
    const [formType, setFormType] = useState('signup');
    const [visible, setVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('temp'));
    const navigate = useNavigate();

    function handleLogout() {
        setIsLoggedIn(false);
        localStorage.clear();
        navigate('/');
    }
    function handleNavigate()
    {
        navigate('/');
    }
    function toggleDropdown() {
        setVisible(!visible);
    }

    function switchToLogin(e){
        e.preventDefault();
        setFormType('login');
        setVisible(true);
    }

    function switchToSignup(e){
        e.preventDefault();
        setFormType('signup');
        setVisible(true);
    }

    return (
        <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "rgb(220, 230, 255,0.4)"}}>
            <div className="container-fluid">
                <img src="/icon.webp" onClick={handleNavigate} style={{width:"2%"}} alt="icon" ></img>
                <h2 className="navbar-brand" onClick={handleNavigate}>RapidNews</h2>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${visible ? 'show' : ''}`} id="navbarTogglerDemo01">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item mt-0" >
                            <NavLink className="nav-link" to="/notes" activeclassname="active"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z" />
                                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                            </svg></NavLink>
                        </li>
                        <li className={`nav-item dropdown ${visible ? 'show' : ''}`}>
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" onClick={(e) => { e.preventDefault(); toggleDropdown(); }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-square" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                                </svg>
                            </a>
                            <div className={`dropdown-menu dropdown-menu-end p-3 ${visible ? 'show' : ''}`} aria-labelledby="navbarDropdown" style={{ maxWidth: "300px", maxHeight: "400px", position: "absolute", backgroundColor:"rgb(225, 230, 255,0.9)", right: 0 }}>
                                {visible && (
                                    <>
                                        {!isLoggedIn ? 
                                        ( formType === 'signup' ? <Signup /> : <Login setCheck={setIsLoggedIn} /> ) 
                                        : ( <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
                                        )}
                                        {!isLoggedIn && (formType === 'signup' ?
                                            ( <a href="#" style={{ backgroundColor: "rgb(225, 230, 255)" }} onClick={switchToLogin} className="dropdown-item">Already have an account? Login</a>)
                                            : (
                                                <a href="#" style={{ backgroundColor: "rgb(225, 230, 255)" }} onClick={switchToSignup} className="dropdown-item">Don't have an account? Signup</a>
                                              )
                                        )}
                                    </>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
