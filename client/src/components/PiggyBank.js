import React from 'react';
import piggyImage from '../images/piggy.gif'; // ĐÚNG: .gif

export default function PiggyBank({ totalMoney = 0, onClick }) {
  return (
    <div
      onClick={onClick}
      className="piggy-bank"
      style={{ cursor: 'pointer' }}
    >
      <img
        src={piggyImage}
        alt="Con heo đất sinh động"
        style={{
          width: '160px',
          height: 'auto',
          animation: 'bounce 2s infinite',
          pointerEvents: 'none'
        }}
      />
      <div className="money-display">
        {(totalMoney || 0).toLocaleString('vi-VN')} VND
      </div>
    </div>
  );
}