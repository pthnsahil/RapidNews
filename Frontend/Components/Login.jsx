import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "./form.css"

function Login({ setCheck }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate= useNavigate();

    function handleLogout() {
        setCheck(false);
        localStorage.clear();
        setIsLoggedIn(false);
        toast.success("Logged out successfully");
        navigate('/');
    }

     async function handleLogin(e){
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/user/login', { email, password });
            if (response.data.message) {
                toast.success("Logged in successfully");
                localStorage.setItem('email', email);
                localStorage.setItem('temp', true);
                setCheck(true);
                setIsLoggedIn(true);
            } else {
                toast.error("Username or password is incorrect");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <ToastContainer />
            {!isLoggedIn ? (
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="Email1"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="Password1"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary"  style={{opacity:"0.8"}}>Login</button>
                </form>
            ) : (
                <button onClick={handleLogout}  className="btn btn-secondary">Logout</button>
            )}
        </>
    );
}

export default Login;
