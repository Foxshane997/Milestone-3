import React from 'react';
import { Link } from 'react-router-dom';

const ReturnToQueue = () => {
    return (
        <div className="navButtonContainer">
            <Link to="/" className="navButton">
                Back to the song queue
            </Link>
        </div>
    );
};

export default ReturnToQueue;