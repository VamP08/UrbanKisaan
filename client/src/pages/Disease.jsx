// src/components/DiseasePage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const DiseasePage = () => {
    const { state } = useLocation();
    const { disease } = state || {};

    if (!disease) {
        return <p>No disease information available.</p>;
    }

    return (
        <div>
            <h1>{disease.diseasename}</h1>
            <p><strong>Description:</strong> {disease.diseasedesc}</p>
            <p><strong>Symptoms:</strong> {disease.diseasesymptoms}</p>
            <p><strong>Prevention:</strong> {disease.diseaseprevention}</p>
            <p><strong>Fertilizer:</strong> {disease.diseasefertilizer}</p>
        </div>
    );
};

export default DiseasePage;
