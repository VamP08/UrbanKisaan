import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddPlot = () => {
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [sowingDate, setSowingDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch crops from the server
    const fetchCrops = async () => {
      try {
        const response = await fetch('/server/crop', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch crops');
        const data = await response.json();
        setCrops(data.crops);
      } catch (error) {
        console.error('Error fetching crops:', error);
      }
    };

    fetchCrops();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/server/plot/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          cropid: selectedCrop,
          cropsowingdate: sowingDate
        })
      });
      console.log(response)
      if (!response.ok) throw new Error('Failed to add plot');
      
      // Redirect to dashboard on success
      navigate('/');
    } catch (error) {
      console.error('Error adding plot:', error);
    }
  };

  return (
    <div>
      <h2>Add New Plot</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Select Crop</Form.Label>
          <Form.Control 
            as="select" 
            value={selectedCrop} 
            onChange={(e) => setSelectedCrop(e.target.value)}
            required
          >
            <option value="">Choose a crop</option>
            {crops.map((crop) => (
              <option key={crop.cropid} value={crop.cropid}>
                {crop.cropname}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Sowing Date</Form.Label>
          <Form.Control 
            type="date" 
            value={sowingDate} 
            onChange={(e) => setSowingDate(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Plot
        </Button>
      </Form>
    </div>
  );
};

export default AddPlot;