import React from 'react';
import { Link } from 'react-router-dom';

const ReturnToSongRequests = () => {
    return (
        <div>
            <Link to="/songrequests">
                Back to song requests
            </Link>
        </div>
    );
};

export default ReturnToSongRequests;