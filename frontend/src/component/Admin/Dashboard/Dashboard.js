import { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [showMessage, setShowMessage] = useState(true);

  return (
    <div className="dashboard_container">
      <h1 className="dashboard_heading">Admin Dashboard</h1>

      {showMessage && (
        <div className="dashboard_alert">
          <span>🎉 Welcome to Skill Hub Admin Dashboard</span>
          <button
            className="alert_close"
            onClick={() => setShowMessage(false)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
