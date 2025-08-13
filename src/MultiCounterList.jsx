import React, { useState } from "react";
import MultiCounter from "./MultiCounter";

export default function MultiCounterList() {
  const [counts, setCounts] = useState([0, 0, 0]); // 기본 3개

  // 증가/감소
  const handleChange = (idx, delta) => {
    setCounts(prev =>
      prev.map((value, i) => (i === idx ? value + delta : value))
    );
  };

  // 카운터 추가
  const handleAddCounter = () => {
    setCounts(prev => [...prev, 0]);
  };

  // 카운터 삭제
  const handleDeleteCounter = (idx) => {
    setCounts(prev => prev.filter((_, i) => i !== idx));
  };

  // 전체 리셋
  const handleResetAll = () => {
    setCounts(prev => prev.map(() => 0));
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
          onDelete={handleDeleteCounter}
        />
      ))}

      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <button className="add-btn" onClick={handleAddCounter}>
          ➕ 카운터 추가
        </button>
        <button className="reset-btn" onClick={handleResetAll}>
          ♻ 전체 리셋
        </button>
      </div>

      <div className="total-label">Total: {total}</div>
    </div>
  );
}
