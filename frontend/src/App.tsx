import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';
import LoginForm from './components/Auth/LoginForm';
import Dashboard from './components/Dashboard/Dashboard';
//import CreateIncidentForm from './components/CreateIncident/CreateIncidentForm';
import CreateIncidentForm from './components/CreateIncident/Survey';
//import SurveyComponent from '../FormBuilder/Survey';
import IncidentList from './components/IncidentManagement/IncidentList';
import Reports from './components/Reports/Reports';
import AIReports from './components/AIReports/AIReports';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="create-incident" element={<CreateIncidentForm />} />
              <Route path="incidents" element={<IncidentList />} />
              <Route path="reports" element={<Reports />} />
              <Route path="ai-reports" element={<AIReports />} />
              <Route index element={<Navigate to="/dashboard" replace />} />
            </Route>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;