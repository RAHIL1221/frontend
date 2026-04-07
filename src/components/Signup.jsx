import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:""})
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password, cpassword} = credentials;
        if(password !== cpassword) {
            props.showAlert("Passwords do not match", "danger");
            return;
        }

        const response = await fetch("https://backend-jh3b.onrender.com/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json()
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Account created successfully", "success");
            navigate("/");
        }
        else{
            props.showAlert("Could not create account with this email", "danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className="auth-container">
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <h2 style={{fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem'}}>Create Account</h2>
                <p style={{color: 'var(--text-secondary)'}}>Start your journey with us today</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" required minLength={5} />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" required minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '1rem'}}>Sign Up</button>
                <div style={{marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
                    Already have an account? <Link to="/login" style={{color: 'var(--primary)', fontWeight: 600, textDecoration: 'none'}}>Log in</Link>
                </div>
            </form>
        </div>
    )
}

export default Signup
