import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function ChecklistPage() {
  const [equipment, setEquipment] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    const res = await axios.get('http://localhost:9000/equipment');
    setEquipment(res.data);
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'ok' ? 'missing' : 'ok';
    await axios.put(`http://localhost:9000/equipment/${id}`, { status: newStatus });
    fetchEquipment();
  };

  const addNewItem = async () => {
    if (!newItemName.trim()) return;
    await axios.post('http://localhost:9000/equipment', { name: newItemName });
    setNewItemName('');
    fetchEquipment();
  };

  const completeShift = async () => {
    if (equipment.length === 0) return;

    const totalItems = equipment.length;
    const presentCount = equipment.filter(item => item.status === 'ok').length;
    const readinessPercent = Math.round((presentCount / totalItems) * 100);
    const missingItems = equipment
      .filter(item => item.status !== 'ok')
      .map(item => item.name);

    try {
      await axios.post('http://localhost:9000/shiftreports', {
        readinessPercent,
        totalItems,
        missingItems
      });
      alert('Shift Report Submitted');
      navigate('/shifthistory');
    } catch (error) {
      console.error('Error submitting shift report:', error);
      alert('Error submitting report.');
    }
  };

  return (
    <div className="container">
      <h1 className="header">Equipment Checklist</h1>

      <div className="add-item-container">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Enter New Equipment..."
          className="input-field"
        />
        <button onClick={addNewItem} className="primary-button">
          Add Equipment
        </button>
      </div>

      <ul className="list">
        {equipment.map(item => (
          <li key={item._id} className="list-item">
            <button
              onClick={() => toggleStatus(item._id, item.status)}
              className={`item-button ${item.status === 'ok' ? 'present' : 'missing'}`}
            >
              {item.name} — {item.status === 'ok' ? 'Present' : 'Missing'}
            </button>
          </li>
        ))}
      </ul>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button onClick={completeShift} className="resolve-button">
          Complete Shift
        </button>
      </div>
    </div>
  );
}

export default ChecklistPage;