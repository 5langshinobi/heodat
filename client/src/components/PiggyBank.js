import React from 'react';
import piggyImage from '../images/piggy.gif';

export default function PiggyBank({ count, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        textAlign: 'center',
        padding: '20px',
        background: 'linear-gradient(135deg, #ffebee, #fff0f5)',
        borderRadius: '20px',
        margin: '20px 0',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(233, 30, 99, 0.2)',
        transition: 'transform 0.2s'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <img
        src={piggyImage}
        alt="Con heo đất sinh động"
        style={{
          width: '180px',
          height: 'auto',
          animation: 'bounce 1.5s infinite'
        }}
      />
      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#e91e63',
        marginTop: '10px'
      }}>
        {count} đồng xu
      </div>
    </div>
  );
}