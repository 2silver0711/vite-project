import React from "react";

// Counter: 단일 카운터의 값과 조작 버튼을 보여주는 컴포넌트
function Counter({ index, count, onIncrease, onDecrease }) {
  return (
    <div>
      {/* 카운터 번호와 현재 값 화면에 표시 */}
      <span>{index + 1}번째 카운터: {count}</span>
      {/* +버튼 클릭 시 해당 index로 onIncrease 호출 */}
      <button onClick={() => onIncrease(index)}>+</button>
      {/* -버튼 클릭 시 해당 index로 onDecrease 호출 */}
      <button onClick={() => onDecrease(index)}>-</button>
    </div>
  );
}

export default Counter;
