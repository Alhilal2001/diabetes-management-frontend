import { useEffect, useState } from 'react';
import { getAllGlucose } from '../../utilities/glucose-api';
import './GlucoseListPage.css';

function GlucoseListPage() {
  const [glucoseList, setGlucoseList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const data = await getAllGlucose(token);
      setGlucoseList(data || []);
    };
    fetchData();
  }, []);

  return (
    <div className="glucose-list">
      <h2>Glucose Entries</h2>
      {glucoseList.length === 0 ? (
        <p>No glucose entries available.</p>
      ) : (
        glucoseList.map((entry, index) => (
          <div key={index}>
            {entry.value} mg/dL - {new Date(entry.timestamp).toLocaleDateString()}
          </div>
        
        ))
      )}
    </div>
  );
}

export default GlucoseListPage;
