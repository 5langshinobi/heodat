import React from 'react';

export default function AchievementList({ achievements, onDelete }) {
  if (!achievements || achievements.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: '#999' }}>
        <p style={{ fontSize: '18px', margin: '10px 0' }}>
          Chưa có thành tích nào.
        </p>
        <p style={{ fontSize: '16px', color: '#e91e63', fontWeight: '600' }}>
          Hãy bỏ vào heo đất ngay!
        </p>
      </div>
    );
  }

  return (
    <div className="list-section">
      {achievements.map((ach, index) => (
        <div
          key={ach._id}
          className="achievement-item"
          style={{
            animationDelay: `${index * 0.1}s`
          }}
        >
          {/* Nút xóa */}
          <button
            className="delete-btn"
            onClick={() => onDelete(ach._id)}
            title="Xóa thành tích"
          >
            ×
          </button>

          {/* Tiêu đề */}
          <div className="achievement-title">
            {ach.title}
          </div>

          {/* Mô tả */}
          {ach.description && (
            <div className="achievement-desc">
              {ach.description}
            </div>
          )}

          {/* Số tiền + Cách kiếm */}
          <div className="achievement-money">
            {(ach.amount || 0).toLocaleString('vi-VN')} VND
            {ach.howEarned && ` - ${ach.howEarned}`}
          </div>

          {/* Ngày */}
          <div style={{
            fontSize: '12px',
            color: '#999',
            marginTop: '8px',
            fontStyle: 'italic'
          }}>
            {new Date(ach.date).toLocaleDateString('vi-VN')}
          </div>
        </div>
      ))}
    </div>
  );
}