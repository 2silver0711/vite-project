import React from 'react';

// 📌 멀티 카운터의 각각 버튼 UI
export default function MultiCounterButton({ index, count, onIncrease }) {
  return (
    <button onClick={() => onIncrease(index)}>
      {index + 1}번 카운터: {count}
    </button>
  );
}
