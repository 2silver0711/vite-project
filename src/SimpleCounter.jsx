import React, { useState } from "react";
import CounterButton from "./CounterButton";

export default function SimpleCounter() {
  const [count, setCount] = useState(0);
  const handleIncrease = () => setCount(prev => prev + 1);

  return (
    <div className="counter-section">
      <CounterButton count={count} onIncrease={handleIncrease} />
    </div>
  );
}
