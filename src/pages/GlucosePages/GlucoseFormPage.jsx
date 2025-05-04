// src/pages/GlucosePages/GlucoseFormPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGlucose } from '../../utilities/glucose-api';
import './GlucoseFormPage.css';

function GlucoseFormPage() {
  const [glucoseLevel, setGlucoseLevel] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await createGlucose({ glucose_level: glucoseLevel }, token);
      // alert('Glucose Entry Added');
      navigate('/glucose');
    } catch (err) {
      // alert('Failed to Add Glucose Entry');
    }
  }

  return (
    <div className="glucose-form-page">
      <h2>Add Glucose Entry</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={glucoseLevel}
          onChange={(e) => setGlucoseLevel(e.target.value)}
          placeholder="Glucose Level (mg/dL)"
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default GlucoseFormPage;
