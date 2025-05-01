import { useEffect, useState } from 'react';
import { getAllGlucose, deleteGlucose } from '../../utilities/glucose-api';
import { useNavigate } from 'react-router-dom';
import './GlucoseListPage.css';

function GlucoseListPage() {
  const [glucoseList, setGlucoseList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const token = localStorage.getItem('token');
    const data = await getAllGlucose(token);
    setGlucoseList(data || []);
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    try {
      await deleteGlucose(id, token);
      setGlucoseList(prev => prev.filter(entry => entry.id !== id));
    } catch (err) {
      console.error('Failed to delete glucose entry:', err);
      alert('Error deleting entry.');
    }
  }

  return (
    <div className="glucose-list">
      <h2>Glucose Entries</h2>
      {glucoseList.length === 0 ? (
        <p>No glucose entries available.</p>
      ) : (
        <table className="glucose-table">
          <thead>
            <tr>
              <th>Value (mg/dL)</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {glucoseList.map(entry => (
              <tr key={entry.id}>
                <td>{entry.glucose_level}</td>
                <td>{new Date(entry.timestamp).toLocaleString()}</td>
                <td>
                  <button className="edit-btn" onClick={() => navigate(`/glucose/edit/${entry.id}`)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(entry.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GlucoseListPage;
