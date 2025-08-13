import React from "react";

export default function CounterButton({ count, onIncrease }) {
  return (
    <button className="main-btn" onClick={onIncrease}>
      카운트: {count}
    </button>
  );
}
