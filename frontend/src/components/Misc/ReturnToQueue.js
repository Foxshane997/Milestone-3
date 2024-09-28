import React from 'react';
import { Link } from 'react-router-dom';

const ReturnToQueue = () => {
    return (
        <div>
            <Link to="/queue">
                Back to the song queue
            </Link>
        </div>
    );
};

export default ReturnToQueue;