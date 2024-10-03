import React from 'react';
import { Link } from 'react-router-dom';

const ReturnToSongRequests = () => {
    return (
        <div className="navButtonContainer">
            <Link to="/songrequests" className="navButton">
                Request Song
            </Link>
        </div>
    );
};

export default ReturnToSongRequests;