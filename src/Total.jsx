import React from "react";

// Total: 모든 카운터 값을 더한 합계만 보여줌
function Total({ counters }) {
  // reduce 함수: 배열의 모든 값을 합침 (누적)
  const sum = counters.reduce((a, b) => a + b, 0);
  return (
    <div>
      <b>총 합계: {sum}</b>
    </div>
  );
}

export default Total;
