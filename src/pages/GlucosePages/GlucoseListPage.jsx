// src/pages/GlucosePages/GlucoseListPage.jsx
import './GlucoseListPage.css';

function GlucoseListPage() {
  return (
    <div className="glucose-list-page">
      <h2>Glucose Entries</h2>
      {/* لاحقاً نربطها مع بيانات */}
      <ul>
        <li>120 mg/dL - 2025-04-28</li>
        <li>140 mg/dL - 2025-04-27</li>
      </ul>
    </div>
  );
}

export default GlucoseListPage;
