import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ShiftHomePage from './components/ShiftHomepage';
import ChecklistPage from './components/ChecklistPage';
import LiveIncidentsPage from './components/LiveIncidentsPage'
import ShiftHistoryPage from './components/ShiftHistoryPage';
import AddIncidentPage from './components/AddIncidentPage';
import './index.css';  

function App() {
  return (
    <Router>
      <div className="app">
        
        <header className="app-header">
          <div className="app-title">ReadyResponder</div>
          <nav className="navbar">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/checklist" className="nav-link">Checklist</Link>
            <Link to="/incidents" className="nav-link">Live Incidents</Link>
            <Link to="/addincident" className="nav-link">Add Incident</Link>
            <Link to="/shifthistory" className="nav-link">History</Link>
          </nav>
        </header>

        <div className="page-container">
          <Routes>
            <Route path="/" element={<ShiftHomePage />} />
            <Route path="/checklist" element={<ChecklistPage />} />
            <Route path="/incidents" element={<LiveIncidentsPage />} />
            <Route path="/shifthistory" element={<ShiftHistoryPage />} />
            <Route path="/addincident" element={<AddIncidentPage />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;