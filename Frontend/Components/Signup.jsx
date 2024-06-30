import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios';
import "./form.css"
function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword,setCPassword]=useState('')

    async function handleSignup(e) {
        try {
            e.preventDefault();
             if(password==cpassword && password.length>7)
                {

            const s = await axios.post('http://localhost:5000/user/register', { email, password })
            
            if (s.data.message) {

                  toast.success('added successfully');
                  
            }

                }

            else {
                toast.error("Reconfirm the password fields")
            }

        }
        catch (error) {
            toast.error("erorr")

        }
    }
        return (
            <>
            <ToastContainer/>
            <form onSubmit={handleSignup}>
                <div className="mb-3">
                    <input type="email"  className="form-control " id="Email1" placeholder="Email " onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">

                    <input type="password" className="form-control" id="Password1" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">

                    <input type="password" className="form-control" id="cPassword1" placeholder='Confirm Password' onChange={(e) => setCPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" style={{opacity:"0.8"}}>Sign Up</button>
            </form>
            </>
        );
    }

    export default Signup;
