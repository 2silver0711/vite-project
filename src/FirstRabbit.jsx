import React, { useState, useRef, useEffect } from 'react';
import KakaoVisitorButton from './KakaoVisitorButton';

const MAX_CARROTS_FIRST = 50;

export default function FirstRabbit({ onComplete }) {
  const [count, setCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');
  const messageTimer = useRef(null);
  const completeTimer = useRef(null);

  const rabbitImages = [
    "https://e1.pxfuel.com/desktop-wallpaper/239/603/desktop-wallpaper-baby-bunny-5-baby-bunny-kawaii.jpg",
    "https://social-phinf.pstatic.net/20210511_249/1620694686964r10zu_JPEG/image_616659168_(2).jpg",
    "https://mblogthumb-phinf.pstatic.net/MjAyMjAxMjRfNTcg/MDAxNjQzMDI3NjI3NDMz.2URcawtm1gBlBOUovmVQECViJIM5mGiPOygzK7CJGvYg.FDKp7TZ61OtVoEYm3R5siLL2unShUIc4AV5wH4FGTBIg.PNG.chomchom64/image.png?type=w800",
    "https://pbs.twimg.com/media/EgV5hYwUEAAcvLN.jpg",
    "https://imgnn.seoul.co.kr/img/upload/2020/06/07/SSI_20200607180024_V.jpg",
    "https://mblogthumb-phinf.pstatic.net/20141130_236/didim_yeoul_1417345894088dsNHH_JPEG/were-rabbit.jpg?type=w420"
  ];

  const imgIndex = Math.min(Math.floor(count / 10), rabbitImages.length - 1);

  // 공통 메시지 표시 함수
  const showTemporaryMessage = (text, duration = 2500) => {
    clearTimeout(messageTimer.current);
    setMessageText(text);
    setShowMessage(true);
    messageTimer.current = setTimeout(() => setShowMessage(false), duration);
  };

  const handleIncrease = () => {
    setCount(prev => {
      // 이미 다 먹인 상태면 동작 안 하게
      if (prev >= MAX_CARROTS_FIRST) return prev;

      const newCount = prev + 1;

      if (newCount >= MAX_CARROTS_FIRST) {
        // 50개 도달 시 메시지 → 3초 뒤 화면 전환
        showTemporaryMessage("🥕 첫 번째 토끼는 충분히 먹었어요! 두 번째 토끼를 키우세요!", 3000);

        clearTimeout(completeTimer.current);
        completeTimer.current = setTimeout(() => {
          onComplete();
        }, 3000);

        return newCount;
      }

      if (newCount % 10 === 0) {
        showTemporaryMessage(`🎉 축하해요! 첫 번째 토끼가 성장했어요! (${newCount}개)`);
      } else if (newCount % 5 === 0) {
        showTemporaryMessage(`🥕 당근 먹이는 중! 토끼가 좋아해요! (${newCount}개)`);
      }

      return newCount;
    });
  };

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      clearTimeout(messageTimer.current);
      clearTimeout(completeTimer.current);
    };
  }, []);

  return (
    <div className="app-container">
      <div className="profile-section">
        <img src={rabbitImages[imgIndex]} alt="첫 번째 토끼 프로필" className="profile-img" />
        <h2 className="profile-name">토끼 당근먹이기 🐰</h2>
        <p className="profile-status">"열심히 당근을 주세요!"</p>
        <div className="button-wrapper">
          <KakaoVisitorButton count={count} onIncrease={handleIncrease} label="첫 번째 토끼" />
        </div>
        <p className="count-text">당근 먹인 수: {count}</p>
      </div>

      {showMessage && (
        <div className="congrats-msg">
          {messageText}
        </div>
      )}
    </div>
  );
}
