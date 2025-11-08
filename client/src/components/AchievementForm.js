import React, { useState } from 'react';

export default function AchievementForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAch = { title, description };

    const res = await fetch('https://heodat-api.onrender.com/api/achievements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAch)
    });

    const data = await res.json();
    onAdd(data);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Thành tích hôm nay..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <textarea
        placeholder="Mô tả (không bắt buộc)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: '100%', padding: '10px', height: '60px' }}
      />
      <button type="submit" style={{
        background: '#ff69b4', color: 'white', padding: '12px',
        border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%'
      }}>
        Bỏ vào heo đất
      </button>
    </form>
  );
}