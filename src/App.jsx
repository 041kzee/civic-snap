import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import useAuthStore from './store/authStore';

// Common Components
import Navbar from './components/layout/Navbar';
import PublicNavbar from './components/layout/PublicNavbar';

// Pages
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import About from './pages/About';

// Citizen Pages
import CommunityMap from './pages/citizen/CommunityMap';
import ReportIssue from './pages/citizen/ReportIssue';
import IssueDetail from './pages/citizen/IssueDetail';
import MyReports from './pages/citizen/MyReports';
import Notifications from './pages/citizen/Notifications';
import Leaderboard from './pages/citizen/Leaderboard';
import Profile from './pages/citizen/Profile';

// Authority Pages
import Dashboard from './pages/authority/Dashboard';
import TicketDetail from './pages/authority/TicketDetail';
import Analytics from './pages/authority/Analytics';
import Heatmap from './pages/authority/Heatmap';
import Departments from './pages/authority/Departments';

// Public Pages
import AccountabilityFeed from './pages/public/AccountabilityFeed';
import WardReport from './pages/public/WardReport';

import ToastContainer from './components/ui/ToastContainer';

const App = () => {
  const { token, role } = useAuthStore();

  // Helper to determine which navbar to show
  const showMainNavbar = token && role !== 'authority';
  const showPublicNavbar = !token;
  // Authority pages handle their own navigation/sidebar layout

  return (
    <Router>
      <ToastContainer />
      <div className="min-h-screen bg-background">
        {showPublicNavbar && <PublicNavbar />}
        {showMainNavbar && <Navbar />}

        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={!token ? <Auth /> : <Navigate to={role === 'authority' ? "/authority/dashboard" : "/map"} />} />
            <Route path="/feed" element={<AccountabilityFeed />} />
            <Route path="/ward-report" element={<WardReport />} />
            <Route path="/about" element={<About />} />

            {/* Protected Citizen Routes */}
            <Route path="/map" element={
              <ProtectedRoute allowedRoles={['citizen']}>
                <CommunityMap />
              </ProtectedRoute>
            } />
            <Route path="/report" element={
              <ProtectedRoute allowedRoles={['citizen']}>
                <ReportIssue />
              </ProtectedRoute>
            } />
            <Route path="/my-reports" element={
              <ProtectedRoute allowedRoles={['citizen']}>
                <MyReports />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute allowedRoles={['citizen']}>
                <Notifications />
              </ProtectedRoute>
            } />
            <Route path="/leaderboard" element={
              <ProtectedRoute allowedRoles={['citizen']}>
                <Leaderboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['citizen']}>
                <Profile />
              </ProtectedRoute>
            } />

            {/* Protected Shared Routes */}
            <Route path="/issues/:id" element={
              <ProtectedRoute>
                <IssueDetail />
              </ProtectedRoute>
            } />

            {/* Protected Authority Routes */}
            <Route path="/authority/dashboard" element={
              <ProtectedRoute allowedRoles={['authority']}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/authority/tickets/:id" element={
              <ProtectedRoute allowedRoles={['authority']}>
                <TicketDetail />
              </ProtectedRoute>
            } />
            <Route path="/authority/analytics" element={
              <ProtectedRoute allowedRoles={['authority']}>
                <Analytics />
              </ProtectedRoute>
            } />
            <Route path="/authority/heatmap" element={
              <ProtectedRoute allowedRoles={['authority']}>
                <Heatmap />
              </ProtectedRoute>
            } />
            <Route path="/authority/departments" element={
              <ProtectedRoute allowedRoles={['authority']}>
                <Departments />
              </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
