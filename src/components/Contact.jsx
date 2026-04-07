import React from 'react';

const Contact = () => {
    return (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="section-title">Contact Us</h2>
            <p className="note-desc">Have a question or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you shortly.</p>
            
            <form onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
                <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-control" placeholder="john@example.com" required />
                </div>
                <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea className="form-control" rows="5" placeholder="How can we help you?" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
            </form>
        </div>
    );
};

export default Contact;
