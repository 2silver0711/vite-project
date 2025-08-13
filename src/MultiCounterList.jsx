import React, { useState } from 'react';
import MultiCounter from './MultiCounter';

export default function MultiCounterList() {
  const [counts, setCounts] = useState([0, 0, 0]); // 3개 시작

  const handleChange = (idx, delta) => {
    setCounts(prev =>
      prev.map((v, i) => (i === idx ? v + delta : v))
    );
  };

  const handleAddCounter = () => {
    setCounts(prev => [...prev, 0]);
  };

  const total = counts.reduce((sum, v) => sum + v, 0);

  return (
    <div className="counter-section">
      {counts.map((count, i) => (
        <MultiCounter
          key={i}
          idx={i}
          count={count}
          onChange={handleChange}
        />
      ))}

      <button className="add-btn" onClick={handleAddCounter}>
        ➕ 카운터 추가
      </button>

      <div className="total-label">Total: {total}</div>
    </div>
  );
}

