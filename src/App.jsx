import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Notes from './components/Notes';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import NoteState from './context/notes/NoteState';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 3000);
  }

  // Private Route Wrapper
  const ProtectedRoute = ({ children }) => {
    if (!localStorage.getItem('token')) {
      return <Navigate to="/login" replace />;
    }
    return <Layout showAlert={showAlert}>{children}</Layout>;
  };

  return (
    <>
      <NoteState>
        <Router>
          <Alert alert={alert} />
          <Routes>
            {/* Public Auth Routes */}
            <Route exact path="/login" element={<div className="auth-layout"><Login showAlert={showAlert}/></div>} />
            <Route exact path="/signup" element={<div className="auth-layout"><Signup showAlert={showAlert}/></div>} />
            
            {/* Protected Dashboard Routes */}
            <Route exact path="/" element={<ProtectedRoute><Dashboard showAlert={showAlert}/></ProtectedRoute>} />
            <Route exact path="/notes" element={<ProtectedRoute><Notes showAlert={showAlert}/></ProtectedRoute>} />
            <Route exact path="/contact" element={<ProtectedRoute><Contact showAlert={showAlert}/></ProtectedRoute>} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
