// src/App.jsx
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import Dashboard from './pages/Dashboard/Dashboard';
import GlucoseListPage from './pages/GlucosePages/GlucoseListPage';
import GlucoseFormPage from './pages/GlucosePages/GlucoseFormPage';
import MealListPage from './pages/MealPages/MealListPage';
import MealFormPage from './pages/MealPages/MealFormPage';
import ActivityListPage from './pages/ActivityPages/ActivityListPage';
import ActivityFormPage from './pages/ActivityPages/ActivityFormPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import OverviewPage from './pages/Dashboard/OverviewPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/glucose"
          element={
            <ProtectedRoute>
              <GlucoseListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/glucose/new"
          element={
            <ProtectedRoute>
              <GlucoseFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meals"
          element={
            <ProtectedRoute>
              <MealListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meals/new"
          element={
            <ProtectedRoute>
              <MealFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/activities"
          element={
            <ProtectedRoute>
              <ActivityListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/activities/new"
          element={
            <ProtectedRoute>
              <ActivityFormPage />
            </ProtectedRoute>
          }
        />
        <Route
            path="/meals/:id/edit"
           element={
           <ProtectedRoute>
              <MealFormPage />
              </ProtectedRoute>

           }
        />
        <Route
          path="/glucose/edit/:id"
          element={<ProtectedRoute><GlucoseFormPage /></ProtectedRoute>}
        />
        <Route
          path="/activities/:id/edit"
          element={<ProtectedRoute><ActivityFormPage /></ProtectedRoute>}
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<LoginPage />} />
        <Route path="/overview" element={<OverviewPage />} />
      </Routes>
    </>
  );
}

export default App;
