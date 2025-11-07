import React from 'react';

export default function PiggyBank({ count }) {
  return (
    <div style={{
      textAlign: 'center', padding: '20px', background: '#ffebee',
      borderRadius: '15px', marginBottom: '20px'
    }}>
      <h2 style={{ margin: '0', color: '#e91e63' }}>Con Heo Đất Thành Tích</h2>
      <div style={{
        fontSize: '60px', fontWeight: 'bold', color: '#e91e63'
      }}>
        {count} đồng xu
      </div>
    </div>
  );
}