import React from 'react';
import { useLocation } from 'react-router-dom';

const Crop = () => {
    const location = useLocation();
    const { state } = location;
    const crop = state?.crop;

    return (
        <div>
            <h1>Crop Information</h1>
            {crop ? (
                <div>
                    <h2>{crop.cropname}</h2>
                    <p>Description: {crop.description}</p>
                    <p>Growing Conditions: {crop.growingConditions}</p>
                    <p>Harvesting Details: {crop.harvestingDetails}</p>
                </div>
            ) : (
                <p>No crop information available.</p>
            )}
        </div>
    );
};

export default Crop;
