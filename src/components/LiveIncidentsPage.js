import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';

function LiveIncidentsPage() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const res = await axios.get('http://localhost:9000/incidents');
      const sorted = sortBySeverity(res.data);
      setIncidents(sorted);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    }
  };

  // Sorting function
  const sortBySeverity = (data) => {
    const severityOrder = { High: 1, Medium: 2, Low: 3 };
    return data.sort((a, b) => {
      return severityOrder[a.severity] - severityOrder[b.severity];
    });
  };

  const formatTimeSince = (timestamp) => {
    const minutesAgo = Math.floor((Date.now() - new Date(timestamp)) / 60000);
    if (minutesAgo < 1) return 'Just now';
    if (minutesAgo === 1) return '1 minute ago';
    return `${minutesAgo} minutes ago`;
  };

  const markAsResolved = async (id) => {
    try {
      await axios.put(`http://localhost:9000/incidents/${id}`, { status: 'Resolved' });
      fetchIncidents(); 
    } catch (error) {
      console.error('Error updating incident:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Live Incidents</h1>

      {incidents.length === 0 ? (
        <p className="sub-text">No active incidents.</p>
      ) : (
        incidents.map((incident) => (
          <div key={incident._id} className="incident-card">
            <h2>{incident.type}</h2>
            <p>{incident.location}</p>
            <p className={`severity-badge ${incident.severity.toLowerCase()}`}>
              Severity: {incident.severity}
            </p>
            <p>{formatTimeSince(incident.timestamp)}</p>
            <p>Status: {incident.status}</p>

            {incident.status !== 'Resolved' && (
              <button
                className="resolve-button"
                onClick={() => markAsResolved(incident._id)}
              >
                Mark as Resolved
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default LiveIncidentsPage;