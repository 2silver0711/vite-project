import React from "react";

export default function MultiCounter({ idx, count, onChange, onDelete }) {
  return (
    <div className="multi-row">
      <span className="counter-label">{idx + 1}번</span>
      <button className="circle-btn" onClick={() => onChange(idx, +1)}>＋</button>
      <span className="counter-value">{count}</span>
      <button className="circle-btn" onClick={() => onChange(idx, -1)}>－</button>
      <button className="delete-btn" onClick={() => onDelete(idx)}>❌</button>
    </div>
  );
}
