import { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';

function ShiftHistoryPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get('http://localhost:9000/shiftreports');
      setReports(res.data);
    } catch (error) {
      console.error('Error fetching shift reports:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container">
      <h1 className="header">Shift Reports</h1>

      {reports.length === 0 ? (
        <p className="sub-text">No shift reports yet.</p>
      ) : (
        reports.map((report) => (
          <div key={report._id} className="incident-card">
            <p><strong>Completed:</strong> {formatDate(report.completedAt)}</p>
            <p><strong>Readiness:</strong> {report.readinessPercent}%</p>
            <p><strong>Total Items:</strong> {report.totalItems}</p>
            <p><strong>Missing Items:</strong> {report.missingItems.length > 0 ? report.missingItems.join(', ') : 'None'}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ShiftHistoryPage;