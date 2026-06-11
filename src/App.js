import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import ProjectsPage from './pages/ProjectsPage';
import PrivacyPage from './pages/PrivacyPage';
import NotificationsPage from './pages/NotificationsPage';
import NotFoundPage from './pages/NotFoundPage';
import SkipLink from './components/common/SkipLink';
function App() {
    return (_jsxs(_Fragment, { children: [_jsx(SkipLink, {}), _jsx(Routes, { children: _jsxs(Route, { path: "/", element: _jsx(Layout, {}), children: [_jsx(Route, { index: true, element: _jsx(DashboardPage, {}) }), _jsx(Route, { path: "tasks", element: _jsx(TasksPage, {}) }), _jsx(Route, { path: "projects", element: _jsx(ProjectsPage, {}) }), _jsx(Route, { path: "login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "register", element: _jsx(RegisterPage, {}) }), _jsx(Route, { path: "profile", element: _jsx(ProfilePage, {}) }), _jsx(Route, { path: "settings", element: _jsx(SettingsPage, {}) }), _jsx(Route, { path: "privacy", element: _jsx(PrivacyPage, {}) }), _jsx(Route, { path: "notifications", element: _jsx(NotificationsPage, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFoundPage, {}) })] }) })] }));
}
export default App;
