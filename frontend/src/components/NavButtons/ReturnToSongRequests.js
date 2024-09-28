import React from 'react';
import { Link } from 'react-router-dom';

const ReturnToSongRequests = () => {
    return (
        <div>
            <Link to="/songrequests">
                Request Song
            </Link>
        </div>
    );
};

export default ReturnToSongRequests;