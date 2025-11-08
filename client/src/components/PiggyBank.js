import React from 'react';
import piggyImage from '../images/piggy.gif'; // Hoặc link trực tiếp

export default function PiggyBank({ count, onClick }) {
  return (
    <div style={{
      textAlign: 'center', padding: '20px', background: '#ffebee',
      borderRadius: '15px', marginBottom: '20px', cursor: 'pointer'
    }} onClick={onClick}>
      <img src={piggyImage} alt="Con heo đất sinh động" style={{ width: '200px', height: 'auto', animation: 'bounce 1s infinite' }} />
      <div style={{
        fontSize: '60px', fontWeight: 'bold', color: '#e91e63'
      }}>
        {count} đồng xu
      </div>
    </div>
  );
}