import React, { useEffect, useState } from 'react'; 
import { Modal,Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [environmentData, setEnvironmentData] = useState(null);
    const [cropDetails, setCropDetails] = useState(null);
    const [plotDetails, setPlotDetails] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        if (!token) {
            setError('No token found. Please log in.');
            return;
        }
        const fetchDashboardData = async () => {
            try {
                const response = await fetch('/server/dashboard/home', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: 'include'
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch dashboard data');
                }

                const data = await response.json();
                
                if (data.success) {
                    setEnvironmentData(data.data);
                    setCropDetails(data.data.cropDetails);
                    setPlotDetails(data.data.populatedPlotDetails || []);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message || 'An error occurred');
            }
        };

        fetchDashboardData();
    }, []);

    const handleAddPlot = () => {
        navigate('/add-plot');
    };

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
                        <h3>Name : {crop.name}</h3>
                        <p>Season: {crop.optimalseason}</p>
                        <p>State: {crop.optimalstate}</p>
                    </li>
                ))}
            </ul>
            <div>
            <h2>Your Plots</h2>
            {plotDetails.length === 0 ? (
                <p>You don't have any plots yet. Add one below!</p>
            ) : (
                <ul>
                    {plotDetails.map((plot, index) => (
                        <li key={index}>
                            <h3>Plot ID: {plot.Plotid}</h3>
                            <p>Crop: {plot.cropname}</p>
                            <p>Sowing Date: {new Date(plot.cropsowingdate).toLocaleDateString()}</p>
                            <p>Detection Status: {plot.detectstatus || 'Not detected'}</p>
                        </li>
                    ))}
                </ul>
            )}

            <Button variant="primary" onClick={handleAddPlot}>
                Add New Plot
            </Button>
        </div>        
    </div>
    );
};

export default Dashboard;
