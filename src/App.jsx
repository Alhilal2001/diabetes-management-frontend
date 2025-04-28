// src/App.jsx
import { Routes, Route } from 'react-router-dom';

// Navbar
import Navbar from './components/Navbar/Navbar';

// Pages
import Dashboard from './pages/Dashboard/Dashboard';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import GlucoseListPage from './pages/GlucosePages/GlucoseListPage';
import GlucoseFormPage from './pages/GlucosePages/GlucoseFormPage';
import MealListPage from './pages/MealPages/MealListPage';
import MealFormPage from './pages/MealPages/MealFormPage';
import ActivityListPage from './pages/ActivityPages/ActivityListPage';
import ActivityFormPage from './pages/ActivityPages/ActivityFormPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/glucose" element={<GlucoseListPage />} />
        <Route path="/glucose/new" element={<GlucoseFormPage />} />
        <Route path="/meals" element={<MealListPage />} />
        <Route path="/meals/new" element={<MealFormPage />} />
        <Route path="/activities" element={<ActivityListPage />} />
        <Route path="/activities/new" element={<ActivityFormPage />} />
      </Routes>
    </>
  );
}

export default App;
