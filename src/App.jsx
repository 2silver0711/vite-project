import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function KakaoVisitorButton({ count, onIncrease, label }) {
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
      aria-label={`${label} 방문자 버튼`}
    >
      <span className="kakao-icon">🥕</span>
      <span className="visitor-count">{count}</span>
    </button>
  );
}

export default function App() {
  const MAX_CARROTS_FIRST = 50;
  const MAX_CARROTS_SECOND = 30;

  // 첫 번째 토끼 상태
  const [count1, setCount1] = useState(0);
  // 두 번째 토끼 상태
  const [count2, setCount2] = useState(0);

  // 메시지 상태와 내용
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');

  const timerRef = useRef(null);

  const rabbitImages1 = [
    "https://e1.pxfuel.com/desktop-wallpaper/239/603/desktop-wallpaper-baby-bunny-5-baby-bunny-kawaii.jpg",
    "https://social-phinf.pstatic.net/20210511_249/1620694686964r10zu_JPEG/image_616659168_(2).jpg",
    "https://mblogthumb-phinf.pstatic.net/MjAyMjAxMjRfNTcg/MDAxNjQzMDI3NjI3NDMz.2URcawtm1gBlBOUovmVQECViJIM5mGiPOygzK7CJGvYg.FDKp7TZ61OtVoEYm3R5siLL2unShUIc4AV5wH4FGTBIg.PNG.chomchom64/image.png?type=w800",
    "https://pbs.twimg.com/media/EgV5hYwUEAAcvLN.jpg",
    "https://imgnn.seoul.co.kr/img/upload/2020/06/07/SSI_20200607180024.jpg"
  ];

  const rabbitImages2 = [
    "https://img.freepik.com/premium-photo/cute-white-baby-rabbit-sitting-cloth-friendship-with-cute-easter-bunny_7186-3499.jpg",
    "https://lh3.googleusercontent.com/proxy/SWmfbx2GPwZUau6tHZ3QtHvTj2is2sC7vX4wPEB0CEkzH2ZBmCPXwCFAqF36kEl8BJ6pRwtmuMREt1faiKvcAMZ9TFWx6mMEb0LS2LEkDOIF",
    "https://lh3.googleusercontent.com/proxy/Uobue393kzhwh3C4WpaD02eoSitwhT-JmGK7ddSMQTjuUhMUF9G3LVei9bn0bCX1TqX7cknmoyLmtbzW1TeGMBuA2vukAZHmDXINRjQwgYuTfg",
    "https://mblogthumb-phinf.pstatic.net/20130423_16/superbin0713_13667047178123xoWh_JPEG/090428_pig2.jpg?type=w420",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpCod6dmiinXKVxMxf-YDXhPf6Qc5kq5jVXkR7CHYOuD7i5KqauUtT_enfoysSCBWS2T4&usqp=CAU"
  ];

  const imgIndex1 = Math.min(Math.floor(count1 / 10), rabbitImages1.length - 1);
  const imgIndex2 = Math.min(Math.floor(count2 / 10), rabbitImages2.length - 1);

  const showTemporaryMessage = (text, duration = 2500) => {
    clearTimeout(timerRef.current);
    setMessageText(text);
    setShowMessage(true);
    timerRef.current = setTimeout(() => setShowMessage(false), duration);
  };

  const handleIncrease1 = () => {
    setCount1(prev => {
      if (prev >= MAX_CARROTS_FIRST) {
        showTemporaryMessage("🥕 첫 번째 토끼는 충분히 먹었어요! 두 번째 토끼도 함께 키워보세요!", 4000);
        return prev;
      }
      const newCount = prev + 1;
      if (newCount % 10 === 0) {
        showTemporaryMessage(`🎉 축하해요! 토끼가 성장했어요! (${newCount}개)`);
      } else if (newCount % 5 === 0) {
        showTemporaryMessage(`🥕 당근 먹이는 중! 토끼가 좋아해요! (${newCount}개)`);
      }
      return newCount;
    });
  };

  const handleIncrease2 = () => {
    setCount2(prev => {
      if (prev >= MAX_CARROTS_SECOND) {
        showTemporaryMessage("🥕 두 번째 토끼도 배불러요! 더 이상 먹일 수 없어요!", 4000);
        return prev;
      }
      const newCount = prev + 1;
      if (newCount % 10 === 0) {
        showTemporaryMessage(`🎉 축하해요! 두 번째 토끼가 성장했어요! (${newCount}개)`);
      } else if (newCount % 5 === 0) {
        showTemporaryMessage(`🥕 당근 먹이는 중! 두 번째 토끼가 좋아해요! (${newCount}개)`);
      }
      return newCount;
    });
  };

  const handleReset2 = () => {
    setCount2(0);
    showTemporaryMessage("🔄 두 번째 토끼가 리셋되었어요! 다시 키워보세요!");
  };

  return (
    <div className="app-container">
      {/* 첫 번째 토끼 영역 */}
      <div className="profile-section">
        <div className="profile-info">
          <img
            src={rabbitImages1[imgIndex1]}
            alt="첫 번째 토끼 프로필"
            className="profile-img"
          />
          <h2 className="profile-name">토끼 당근먹이기🐰</h2>
          <p className="profile-status">" 열심히 당근을 주세요! "</p>
          <div className="button-wrapper">
            <KakaoVisitorButton count={count1} onIncrease={handleIncrease1} label="첫 번째 토끼" />
          </div>
          <p className="count-text">당근 먹인 수: {count1}</p>
        </div>
      </div>

      {/* 두 번째 토끼 영역 (첫 번째 토끼를 다 키워야 보임) */}
      {count1 >= MAX_CARROTS_FIRST && (
        <div className="profile-section">
          <div className="profile-info">
            <img
              src={rabbitImages2[imgIndex2]}
              alt="두 번째 토끼 프로필"
              className="profile-img"
            />
            <h2 className="profile-name">둘째 토끼 당근먹이기</h2>
            <p className="profile-status">" 나도 배고파! "</p>
            <div className="button-wrapper">
              <KakaoVisitorButton count={count2} onIncrease={handleIncrease2} label="두 번째 토끼" />
            </div>
            <div className="second-buttons">
              <button className="action-btn" onClick={handleReset2}>
                리셋
              </button>
            </div>
            <p className="count-text">당근 먹인 수: {count2}</p>
          </div>
        </div>
      )}

      {/* 메시지 표시 */}
      {showMessage && (
        <div className="congrats-msg" role="alert" aria-live="polite">
          {messageText}
        </div>
      )}
    </div>
  );
}
