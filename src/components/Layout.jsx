import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, showAlert }) => {
    return (
        <div className="app-layout">
            <Sidebar />
            <Navbar showAlert={showAlert} />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
