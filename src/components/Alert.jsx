import React from 'react'

export default function Alert(props) {
    if (!props.alert) return null;
    
    return (
        <div className="alert-container">
            <div className={`alert alert-${props.alert.type}`}>
                {props.alert.type === 'success' ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                )}
                <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>
                    {props.alert.msg}
                </span>
            </div>
        </div>
    )
}
