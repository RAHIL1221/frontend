import React from 'react';
import AddNote from './AddNote';

const Dashboard = (props) => {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <AddNote showAlert={props.showAlert} />
        </div>
    );
};

export default Dashboard;
