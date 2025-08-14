import React, { useState } from "react";
import CounterList from "./CounterList";
import Total from "./Total";

// App 컴포넌트: 전체 카운터들의 상태와 주요 로직 담당
function App() {
  // ① counters: 카운터 값을 담은 배열 (예: [0, 0, 0]은 3개의 카운터가 각각 0인 상태)
  // ② setCounters: counters 상태를 바꿀 때 사용하는 함수 (React 내장)
  const [counters, setCounters] = useState([0, 0, 0]);

  // index번째 카운터의 값을 1 증가시키는 함수
  const increase = (index) => {
    // map을 사용 → 원본 배열 수정 없이 새로운 배열 생성 (*불변성*)
    setCounters(counters.map((count, i) => (i === index ? count + 1 : count)));
  };

  // index번째 카운터의 값을 1 감소시키는 함수
  const decrease = (index) => {
    setCounters(counters.map((count, i) => (i === index ? count - 1 : count)));
  };

  // 카운터를 새로 추가 (맨 끝에 0 추가)
  const addCounter = () => {
    // 기존 배열에 0을 추가한 새 배열 반환
    setCounters([...counters, 0]);
  };

  return (
    <div>
      <h1>멀티 카운터</h1>
      {/* CounterList에 상태와 동작(이벤트 핸들러) 전달 */}
      <CounterList
        counters={counters}         // 상태 데이터 (배열)
        onIncrease={increase}       // 증가 함수
        onDecrease={decrease}       // 감소 함수
      />
      <button onClick={addCounter}>카운터 추가</button>
      {/* Total은 전체 카운터 값의 합계를 보여줌 */}
      <Total counters={counters} />
    </div>
    
  );
}

export default App;
