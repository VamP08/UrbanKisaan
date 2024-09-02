import React from 'react';
import { useLocation } from 'react-router-dom';

const Crop = () => {
    const { state } = useLocation();
    const { crop } = state || {};

    if (!crop) {
        return <p>No disease information available.</p>;
    }
    return (
        <div>
            <h1>Crop Information</h1>
            <div>
                <h2>{crop.cropname}</h2>
                <p>Description: {crop.cropdescription}</p>
                <p>Optimal Season: {crop.optimalseason}</p>
                <p>Optimal State: {crop.optimalstate}</p>
            </div>
        </div>
    );
};

export default Crop;
