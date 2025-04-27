import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function AddIncidentPage() {
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState('Medium');
  const [status, setStatus] = useState('Active');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9000/incidents', {
        type,
        location,
        severity,
        status,
      });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate('/incidents'); // Redirect after toast disappears
      }, 2000); // 2 seconds
    } catch (error) {
      console.error('Error creating incident:', error);
      alert('Error creating incident.');
    }
  };

  return (
    <div className="container">
      <h1 className="header">Add New Incident</h1>

      <form onSubmit={handleSubmit} className="add-incident-form">
        <div className="form-group">
          <label>Type of Incident</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="input-field"
            placeholder="e.g., Structure Fire"
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="input-field"
            placeholder="e.g., 123 Main Street"
          />
        </div>

        <div className="form-group">
          <label>Severity</label>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="input-field"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input-field"
          >
            <option value="Active">Active</option>
            <option value="En Route">En Route</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button type="submit" className="primary-button">
            Create Incident
          </button>
        </div>
      </form>

      {showToast && (
        <div className="toast success-toast">
          Incident Created Successfully
        </div>
      )}
    </div>
  );
}

export default AddIncidentPage;