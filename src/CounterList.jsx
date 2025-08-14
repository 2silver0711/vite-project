import React from "react";
import Counter from "./Counter";

// CounterList: 여러 개의 Counter를 렌더링하는 역할
function CounterList({ counters, onIncrease, onDecrease }) {
  return (
    <div>
      {/* 
        counters 배열을 map으로 순회하며, 
        각 값(count)과 순서(index)를 이용해 Counter 컴포넌트를 만듦 
      */}
      {counters.map((count, index) => (
        <Counter
          key={index}               // key: React가 각 항목을 식별하는 데 필요 (성능, 정확)
          index={index}             // Counter가 자기 순번을 알 수 있게 전달
          count={count}             // 해당 Counter의 현재 값
          onIncrease={onIncrease}   // +버튼 클릭 시 동작
          onDecrease={onDecrease}   // -버튼 클릭 시 동작
        />
      ))}
    </div>
  );
}

export default CounterList;
