import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; // npm install react-modal
import AchievementForm from './components/AchievementForm';
import AchievementList from './components/AchievementList';
import PiggyBank from './components/PiggyBank';

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
    setTotalMoney(totalMoney + (newAch.amount || 0));
  };

  const handleDelete = async (id) => {
    await fetch(`https://heodat.onrender.com/api/achievements/${id}`, { method: 'DELETE' });
    const newAchs = achievements.filter(a => a._id !== id);
    setAchievements(newAchs);
    const money = newAchs.reduce((sum, ach) => sum + (ach.amount || 0), 0);
    setTotalMoney(money);
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
    <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', color: '#e91e63' }}>Con Heo Đất Thành Tích</h1>
      <PiggyBank totalMoney={totalMoney} onClick={openModal} />
      <input type="number" value={goal} onChange={handleSetGoal} placeholder="Mục tiêu tiền (VND)" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
      <AchievementForm onAdd={handleAdd} />
      <AchievementList achievements={achievements} onDelete={handleDelete} />
      {isGoalReached && <button onClick={openBreakModal} style={{ background: '#ff0000', color: 'white', padding: '10px', marginTop: '20px' }}>Đập Heo!</button>}

      {/* Modal xem tổng tiền + cách kiếm */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Tổng tiền: {totalMoney.toLocaleString('vi-VN')} VND</h2>
        <h3>Cách kiếm:</h3>
        <ul>
          {achievements.map((ach) => (
            <li key={ach._id}>{ach.title} ({ach.amount.toLocaleString('vi-VN')} VND) - {ach.howEarned}</li>
          ))}
        </ul>
        <button onClick={closeModal}>Đóng</button>
      </Modal>

      {/* Modal đập heo (animation) */}
      <Modal isOpen={breakModalIsOpen} onRequestClose={closeBreakModal}>
        <h2>Chúc mừng! Đã đạt mục tiêu!</h2>

<grok-card data-id="d9052f" data-type="image_card"></grok-card>



<grok-card data-id="76af50" data-type="image_card"></grok-card>



<grok-card data-id="cd7fee" data-type="image_card"></grok-card>

        <button onClick={closeBreakModal}>Đóng</button>
      </Modal>
    </div>
  );
}

export default App;