import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            props.showAlert("Logged in Successfully", "success");
            navigate("/");

        }
        else{
            props.showAlert("Invalid credentials", "danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className="auth-container">
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <h2 style={{fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem'}}>Welcome Back</h2>
                <p style={{color: 'var(--text-secondary)'}}>Sign in to your notebook dashboard</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" required />
                </div>
                <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '1rem'}}>Log In</button>
                <div style={{marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
                    Don't have an account? <Link to="/signup" style={{color: 'var(--primary)', fontWeight: 600, textDecoration: 'none'}}>Sign up free</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
