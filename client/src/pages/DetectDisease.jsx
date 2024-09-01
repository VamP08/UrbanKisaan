// src/components/DiseaseDetection.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DiseaseDetection = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [disease, setDisease] = useState('');
    const [crop, setCrop] = useState('');
    const [plotid, setPlotId] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handlePlotIdChange = (event) => {
        setPlotId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert('Please upload a file.');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('plotid', plotid); 
        
        try {
            const response = await axios.post('/server/detectdisease/detect-disease', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            const { disease,crop } = response.data;
            setDisease(disease)
            setCrop(crop)

        } catch (error) {
            console.error('Error detecting disease:', error);
        }
    };

    const handleDiseaseClick = () => {
        navigate('/disease', { state: { disease } });
    };

    const handleCropClick = () => {
        navigate('/crop', { state: { crop } });
    };

    return (
        <div>
            <h1>Plant Disease Detection</h1>
            <p>Upload a picture of your plant to detect possible diseases and identify the crop.</p>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Plot Id" value={plotid} onChange={handlePlotIdChange} required={true} />
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload Photo</button>
            </form>

            {disease.diseasename && crop.cropname && (
                <div>
                    <h2>Results:</h2>
                    <p>
                        Disease Name: <button onClick={handleDiseaseClick}>{disease.diseasename}</button>
                    </p>
                    <p>
                        Crop Name: <button onClick={handleCropClick}>{crop.cropname}</button>
                    </p>
                </div>
            )}
        </div>
    );
};

export default DiseaseDetection;
