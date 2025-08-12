import React, { useState } from 'react';
import './App.css';

// ✅ 자식 컴포넌트: 방문자 버튼
function KakaoVisitorButton({ count, onIncrease }) {
  return (
    // count와 onIncrease(부모의 상태 변경 함수)를 props로 받음
    <button
      className="kakao-btn"
      onClick={onIncrease} // 버튼 클릭 → 부모의 onIncrease 함수 실행
    >
      <span className="kakao-icon">💛</span>
      <span className="visitor-count">{count}</span>
    </button>
  );
}

// ✅ 부모 컴포넌트
export default function App() {
  // 1️⃣ 상태 정의: count(방문자 수)
  const [count, setCount] = useState(0);

  // 2️⃣ 상태 변경 함수 정의
  const handleIncrease = () => {
    // setCount로 count 상태를 +1 증가
    setCount(prevCount => prevCount + 1);
    // 🔹 setCount → 상태 변경 요청 → React가 컴포넌트 다시 렌더링
  };

  return (
    <div className="app-container">
      <h1>카카오톡 방문자 버튼 예제</h1>

      {/* 3️⃣ 자식 컴포넌트에 현재 상태(count)와 상태 변경 함수(onIncrease) 전달 */}
      {/* 자식이 클릭하면 onIncrease 실행 → setCount 동작 → UI 업데이트 */}
      <KakaoVisitorButton 
        count={count} 
        onIncrease={handleIncrease} 
      />
    </div>
  );
}