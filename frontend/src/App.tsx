import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CourseCatalog from './pages/CourseCatalog';
import CourseDetails from './pages/CourseDetails';
import CourseComparison from './pages/CourseComparison';
import LearningRoadmap from './pages/LearningRoadmap';

import AdminDashboard from './pages/AdminDashboard';
import AdminUserManagement from './pages/AdminUserManagement';
import AdminRolesPermissions from './pages/AdminRolesPermissions';
import AdminCourses from './pages/AdminCourses';
import AdminAuditLogs from './pages/AdminAuditLogs';
import AdminSecuritySettings from './pages/AdminSecuritySettings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CourseCatalog />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/compare" element={<CourseComparison />} />
        <Route path="/roadmap" element={<LearningRoadmap />} />
        
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUserManagement />} />
        <Route path="/admin/roles" element={<AdminRolesPermissions />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/logs" element={<AdminAuditLogs />} />
        <Route path="/admin/settings" element={<AdminSecuritySettings />} />
      </Routes>
    </Router>
  );
}

export default App;
