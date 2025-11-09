import React, { useState } from 'react';

export default function AchievementForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [howEarned, setHowEarned] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAch = { title, description, amount: Number(amount), howEarned };

    const res = await fetch('https://heodat.onrender.com/api/achievements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAch)
    });

    const data = await res.json();
    onAdd(data);

    setTitle('');
    setDescription('');
    setAmount('');
    setHowEarned('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Tiêu đề thành tích"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <textarea
        placeholder="Mô tả"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <input
        type="number"
        placeholder="Số tiền (VND)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <input
        type="text"
        placeholder="Cách kiếm (e.g., Freelance, Lương thưởng)"
        value={howEarned}
        onChange={(e) => setHowEarned(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button type="submit" style={{
        background: '#e91e63', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px'
      }}>
        Bỏ vào heo đất
      </button>
    </form>
  );
}