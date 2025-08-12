import React, { useState } from 'react';
import FirstRabbit from './FirstRabbit';
import SecondRabbit from './SecondRabbit';
import './App.css';

export default function App() {
  const [showSecondRabbit, setShowSecondRabbit] = useState(false);

  // 첫 번째 토끼 완료 시 호출
  const handleFirstRabbitComplete = () => {
    setShowSecondRabbit(true);
  };

  return (
    <div>
      {!showSecondRabbit ? (
        <FirstRabbit onComplete={handleFirstRabbitComplete} />
      ) : (
        <SecondRabbit />
      )}
    </div>
  );
}