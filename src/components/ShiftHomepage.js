import { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css'; 

function ShiftHomePage() {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    const res = await axios.get('http://localhost:9000/equipment');
    setEquipment(res.data);
  };

  const calculateReadiness = () => {
    if (equipment.length === 0) return 100;
    const presentCount = equipment.filter(item => item.status === 'ok').length;
    return Math.round((presentCount / equipment.length) * 100);
  };

  const missingItems = equipment.filter(item => item.status !== 'ok');

  return (
    <div className="container">
      <h1 className="header">Shift Readiness Dashboard</h1>

      <div className="readiness-box">
        <h2 className="readiness-text">
          {calculateReadiness()}% Ready
        </h2>
        <p className="sub-text">
          {missingItems.length > 0
            ? `${missingItems.length} item(s) missing`
            : "All equipment accounted for!"}
        </p>
      </div>

      {missingItems.length > 0 && (
        <div className="missing-box">
          <h3 className="missing-header">Missing Equipment:</h3>
          <ul className="list">
            {missingItems.map(item => (
              <li key={item._id} className="list-item">
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ShiftHomePage;