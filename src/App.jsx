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

  // 토끼 프로필 사진 리스트
  const rabbitImages = [
    "https://e1.pxfuel.com/desktop-wallpaper/239/603/desktop-wallpaper-baby-bunny-5-baby-bunny-kawaii.jpg", // 기본 이미지
    "https://social-phinf.pstatic.net/20210511_249/1620694686964r10zu_JPEG/image_616659168_(2).jpg",          // 10개 이상일 때
    "https://mblogthumb-phinf.pstatic.net/MjAyMjAxMjRfNTcg/MDAxNjQzMDI3NjI3NDMz.2URcawtm1gBlBOUovmVQECViJIM5mGiPOygzK7CJGvYg.FDKp7TZ61OtVoEYm3R5siLL2unShUIc4AV5wH4FGTBIg.PNG.chomchom64/image.png?type=w800",                            // 20개 이상일 때
    "https://pbs.twimg.com/media/EgV5hYwUEAAcvLN.jpg",                              // 30개 이상일 때
    "https://imgnn.seoul.co.kr/img/upload/2020/06/07/SSI_20200607180024.jpg",                              // 40개 이상일 때
    "https://pbs.twimg.com/media/CsVZSOiUEAAnRqM.jpg",                              // 50개 이상일 때
  ];

  // 사진 인덱스 계산 (10개 단위로 순환)
  const currentImgIndex = Math.floor(count / 10) % rabbitImages.length;

  const handleIncrease = () => {
    setCount(prev => prev + 1);
  };

  useEffect(() => {
    if (count > 0 && count % 5 === 0) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <div className="app-container">
      <div className="profile-header">
        <div className="profile-info">
          {/* 프로필 사진이 count 값에 따라 동적으로 변경됨 */}
          <img
            src={rabbitImages[currentImgIndex]}
            alt="프로필"
            className="profile-img"
          />
          <h2 className="profile-name">토끼 당근먹이기🐰</h2>
          <p className="profile-status">"아래 버튼을 눌러보세요 ^~^"</p>
        </div>
      </div>

      <KakaoVisitorButton count={count} onIncrease={handleIncrease} />

      {showMessage && (
        <div className="congrats-msg">
          🎉 축하해요! 토끼가 성장했어요! 🎉
        </div>
      )}
    </div>
  );
}
