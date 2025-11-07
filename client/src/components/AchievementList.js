import React from 'react';

export default function AchievementList({ achievements, onDelete }) {
  if (achievements.length === 0) {
    return <p style={{ textAlign: 'center', color: '#999' }}>Chưa có thành tích nào. Hãy thêm nhé!</p>;
  }

  return (
    <div>
      {achievements.map((ach) => (
        <div key={ach._id} style={{
          border: '1px solid #ddd', padding: '15px', margin: '10px 0',
          borderRadius: '10px', background: '#fff9c4', position: 'relative'
        }}>
          <h3 style={{ margin: '0 0 5px 0' }}>{ach.title}</h3>
          {ach.description && <p style={{ margin: '5px 0' }}>{ach.description}</p>}
          <small>{new Date(ach.date).toLocaleDateString('vi-VN')}</small>
          <button onClick={() => onDelete(ach._id)} style={{
            position: 'absolute', top: '10px', right: '10px',
            background: '#e74c3c', color: 'white', border: 'none',
            padding: '5px 10px', borderRadius: '5px', cursor: 'pointer'
          }}>
            Xóa
          </button>
        </div>
      ))}
    </div>
  );
}