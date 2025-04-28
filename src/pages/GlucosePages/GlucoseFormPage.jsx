// src/pages/GlucosePages/GlucoseFormPage.jsx
import { useState } from 'react';
import { createGlucose } from '../../utilities/glucose-api';  // <-- صح هنا
import './GlucoseFormPage.css';

function GlucoseFormPage() {
  const [glucoseLevel, setGlucoseLevel] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await createGlucose({ glucose_level: glucoseLevel }, token);  // <-- وصح هنا
      alert('Glucose Entry Added');
      window.location.href = '/glucose';  // توجيه بعد الإضافة
    } catch (err) {
      alert('Failed to Add Glucose Entry');
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
