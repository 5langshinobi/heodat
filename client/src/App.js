import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; // Import modal
import AchievementForm from './components/AchievementForm';
import AchievementList from './components/AchievementList';
import PiggyBank from './components/PiggyBank';

Modal.setAppElement('#root'); // Để modal hoạt động

function App() {
  const [achievements, setAchievements] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [totalMoney, setTotalMoney] = useState(0);

  const fetchAchievements = async () => {
    const res = await fetch('https://heodat.onrender.com/api/achievements');
    const data = await res.json();
    setAchievements(data);
    const money = data.reduce((sum, ach) => sum + (ach.value || 100000), 0); // Mỗi thành tích = 100k VND
    setTotalMoney(money);
  };

  useEffect(() => { fetchAchievements(); }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleAdd = (newAch) => {
    setAchievements([newAch, ...achievements]);
    setTotalMoney(totalMoney + (newAch.value || 100000));
  };

  const handleDelete = async (id) => {
    await fetch(`https://heodat.onrender.com/api/achievements/${id}`, { method: 'DELETE' });
    const newAchs = achievements.filter(a => a._id !== id);
    setAchievements(newAchs);
    const money = newAchs.reduce((sum, ach) => sum + (ach.value || 100000), 0);
    setTotalMoney(money);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', color: '#e91e63' }}>Con Heo Đất Thành Tích</h1>
      <PiggyBank count={achievements.length} onClick={openModal} />
      <AchievementForm onAdd={handleAdd} />
      <AchievementList achievements={achievements} onDelete={handleDelete} />

      {/* Modal khi click con heo */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{
        content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)' }
      }}>
        <h2>Tổng tiền đóng vào: {totalMoney.toLocaleString('vi-VN')} VND</h2>
        <h3>Cách kiếm:</h3>
        <ul>
          {achievements.map((ach) => (
            <li key={ach._id}>{ach.title} ({ach.value || 100000} VND) - {ach.description}</li>
          ))}
        </ul>
        <button onClick={closeModal}>Đóng</button>
      </Modal>
    </div>
  );
}

export default App;