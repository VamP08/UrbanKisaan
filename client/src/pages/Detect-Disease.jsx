// src/components/DiseaseDetection.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DiseaseDetection = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [diseaseName, setDiseaseName] = useState('');
    const [cropName, setCropName] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert('Please upload a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('/api/detect-disease', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { disease, crop } = response.data;

            setDiseaseName(disease);
            setCropName(crop);
        } catch (error) {
            console.error('Error detecting disease:', error);
        }
    };

    const handleDiseaseClick = () => {
        navigate('/disease');
    };

    const handleCropClick = () => {
        navigate('/crop');
    };

    return (
        <div>
            <h1>Plant Disease Detection</h1>
            <p>Upload a picture of your plant to detect possible diseases and identify the crop.</p>

            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload Photo</button>
            </form>

            {diseaseName && cropName && (
                <div>
                    <h2>Results:</h2>
                    <p>
                        Disease Name: <button onClick={handleDiseaseClick}>{diseaseName}</button>
                    </p>
                    <p>
                        Crop Name: <button onClick={handleCropClick}>{cropName}</button>
                    </p>
                </div>
            )}
        </div>
    );
};

export default DiseaseDetection;
