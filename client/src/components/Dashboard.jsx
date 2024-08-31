import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [environmentData, setEnvironmentData] = useState(null);
    const [cropDetails, setCropDetails] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        if (!token) {
            setError('No token found. Please log in.');
            return;
        }
        fetch('/server/dashboard/home', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw err; });
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                setEnvironmentData(data.data);
                setCropDetails(data.data.cropDetails);
            } else {
                setError(data.message);
            }
        })
        .catch(err => {
            console.error('Fetch error:', err);
            setError(err.message || 'An error occurred');
        });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!environmentData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Environment Data</h2>
            <p>City: {environmentData.cityname}</p>
            <p>Temperature: {environmentData.temperature}°C</p>
            <p>Humidity: {environmentData.humidity}%</p>

            <h2>Recommended Crops</h2>
            <ul>
                {cropDetails.map((crop, index) => (
                    <li key={index}>
                        <h3>{crop.name}</h3>
                        <p>{crop.details}</p> {/* Replace with actual fields */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
