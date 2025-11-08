import React, { useState, useEffect } from 'react';
import AchievementForm from './components/AchievementForm';
import AchievementList from './components/AchievementList';
import PiggyBank from './components/PiggyBank';

function App() {
  const [achievements, setAchievements] = useState([]);

  const fetchAchievements = async () => {
    const res = await fetch('https://heodat-api.onrender.com/api/achievements');
    const data = await res.json();
    setAchievements(data);
  };

  useEffect(() => { fetchAchievements(); }, []);

  const handleAdd = (newAch) => {
    setAchievements([newAch, ...achievements]);
  };

  const handleDelete = async (id) => {
    await fetch(`https://heodat-api.onrender.com/api/achievements/${id}`, { method: 'DELETE' });
    setAchievements(achievements.filter(a => a._id !== id));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', color: '#e91e63' }}>Con Heo Đất Thành Tích</h1>
      <PiggyBank count={achievements.length} />
      <AchievementForm onAdd={handleAdd} />
      <AchievementList achievements={achievements} onDelete={handleDelete} />
    </div>
  );
}

export default App;