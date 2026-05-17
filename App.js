import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  // Python Backend Flask API se data lane ke liye
  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error("Error fetching tasks:", err));
  }, []);

  // Naya task add karne ke liye
  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    axios.post('http://localhost:5000/api/tasks', { title })
      .then(res => {
        setTasks([...tasks, res.data]);
        setTitle('');
      })
      .catch(err => console.error("Error adding task:", err));
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', color: '#333' }}>
      <h1 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>📋 Industry Task Board</h1>
      
      <form onSubmit={addTask} style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <input 
          type="text"
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter a new industry task..." 
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
          required 
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
          Add Task
        </button>
      </form>

      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Active Tasks</h3>
        {tasks.length === 0 ? <p style={{ color: '#777' }}>No tasks found. Add one above!</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {tasks.map(task => (
              <li key={task._id} style={{ background: '#fff', padding: '12px', marginBottom: '8px', borderRadius: '4px', borderLeft: '5px solid #28a745', display: 'flex', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <span>{task.title}</span>
                <span style={{ background: '#e2e3e5', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>{task.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
