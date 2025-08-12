import React, { useState, useEffect } from 'react';

export default function KakaoVisitorButton({ count, onIncrease, label }) {
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
      aria-label={`${label} 버튼`}
    >
      <span className="kakao-icon">🥕</span>
      <span className="visitor-count">{count}</span>
    </button>
  );
}
