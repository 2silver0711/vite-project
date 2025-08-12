import React, { useState, useEffect } from 'react';
import './App.css';

function KakaoVisitorButton({ count, onIncrease }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    onIncrease();
    setClicked(true);
  };

  useEffect(() => {
    if (clicked) {
      const timer = setTimeout(() => setClicked(false), 200);
      return () => clearTimeout(timer);
    }
  }, [clicked]);

  return (
    <button
      className={`kakao-btn ${clicked ? 'clicked' : ''}`}
      onClick={handleClick}
      aria-label="방문자 버튼"
    >
      <span className="kakao-icon">🥕</span>
      <span className="visitor-count">{count}</span>
    </button>
  );
}

export default function App() {
  const [count, setCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const handleIncrease = () => {
    setCount(prev => prev + 1);
  };

  // ✅ count 값이 5의 배수일 때 메시지 표시
  useEffect(() => {
    if (count > 0 && count % 5 === 0) {
      setShowMessage(true);
      // 2.5초 후 메시지 사라짐
      const timer = setTimeout(() => setShowMessage(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <div className="app-container">
      <div className="profile-header">
        <div className="profile-info">
          <img
            src="https://www.mujerdevision.com/NVision/wp-content/uploads/conejo.jpg"
            alt="프로필"
            className="profile-img"
          />
          <h2 className="profile-name">토끼 당근먹이기🐰</h2>
          <p className="profile-status">"아래 버튼을 눌러보세요 ^~^"</p>
        </div>
      </div>

      <KakaoVisitorButton count={count} onIncrease={handleIncrease} />

      {/* 🎉 축하 메시지 */}
      {showMessage && (
        <div className="congrats-msg">
          🎉 축하해요! 토끼가 성장했어요! 🎉
        </div>
      )}
    </div>
  );
}
