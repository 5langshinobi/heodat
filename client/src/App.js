import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; // npm install react-modal
import AchievementForm from './components/AchievementForm';
import AchievementList from './components/AchievementList';
import PiggyBank from './components/PiggyBank';
import './App.css';

Modal.setAppElement('#root');

function App() {
  const [achievements, setAchievements] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);
  const [goal, setGoal] = useState(localStorage.getItem('goal') || 1000000); // Mục tiêu mặc định 1 triệu VND
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [breakModalIsOpen, setBreakModalIsOpen] = useState(false);

  const fetchAchievements = async () => {
    const res = await fetch('https://heodat.onrender.com/api/achievements');
    const data = await res.json();
    setAchievements(data);
    const money = data.reduce((sum, ach) => sum + (ach.amount || 0), 0);
    setTotalMoney(money);
  };

  useEffect(() => { fetchAchievements(); }, []);

  const handleAdd = (newAch) => {
  setAchievements([newAch, ...achievements]);
  setTotalMoney((prev) => prev + (newAch.amount || 0)); // Dùng callback
};

  const handleDelete = async (id) => {
  const achToDelete = achievements.find(a => a._id === id);
  await fetch(`https://heodat.onrender.com/api/achievements/${id}`, { method: 'DELETE' });
  const newAchs = achievements.filter(a => a._id !== id);
  setAchievements(newAchs);
  setTotalMoney((prev) => prev - (achToDelete?.amount || 0));
};
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const openBreakModal = () => setBreakModalIsOpen(true);
  const closeBreakModal = () => setBreakModalIsOpen(false);

  const handleSetGoal = (e) => {
    const newGoal = e.target.value;
    setGoal(newGoal);
    localStorage.setItem('goal', newGoal);
  };

  const isGoalReached = totalMoney >= goal;

  return (
  <div className="app-container">
    <header className="app-header">
      <h1>Con Heo Đất Thành Tích</h1>
    </header>

    <div className="piggy-bank">
      <PiggyBank totalMoney={totalMoney} onClick={openModal} />
    </div>

    <div className="goal-input">
      <input
        type="number"
        value={goal}
        onChange={handleSetGoal}
        placeholder="Mục tiêu tiền (VND)"
      />
    </div>

    <div className="form-section">
      <AchievementForm onAdd={handleAdd} />
    </div>

    <div className="list-section">
      <AchievementList achievements={achievements} onDelete={handleDelete} />
    </div>

    {isGoalReached && (
      <button className="break-btn" onClick={openBreakModal}>
        ĐẬP HEO NGAY!
      </button>
    )}

    {/* Modal xem tổng tiền + cách kiếm */}
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
      <h2>Tổng tiền: {(totalMoney || 0).toLocaleString('vi-VN')} VND</h2>
      <h3>Cách kiếm:</h3>
      <ul className="modal-list">
        {achievements.map((ach) => (
          <li key={ach._id}>
            {ach.title} ({(ach.amount || 0).toLocaleString('vi-VN')} VND) - {ach.howEarned}
          </li>
        ))}
      </ul>
      <button onClick={closeModal}>Đóng</button>
    </Modal>

    {/* Modal đập heo (animation) */}
    <Modal isOpen={breakModalIsOpen} onRequestClose={closeBreakModal}>
      <h2 style={{ textAlign: 'center', color: '#e91e63', fontSize: '28px' }}>
        Chúc mừng! Đã đạt mục tiêu!
      </h2>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <img 
          src="https://i.imgur.com/abc123.gif" 
          alt="Heo bị đập" 
          style={{ width: '200px', borderRadius: '20px', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }} 
        />
      </div>
      <button 
        onClick={closeBreakModal}
        style={{
          display: 'block',
          margin: '20px auto',
          padding: '12px 30px',
          background: '#e91e63',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Đóng
      </button>
    </Modal>
  </div>
)
}

export default App;