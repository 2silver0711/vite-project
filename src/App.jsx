import React from "react";
import SimpleCounter from "./SimpleCounter";
import MultiCounterList from "./MultiCounterList";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <h1>🐰 Counter Playground</h1>

      <div className="card">
        <h2>🥕 초심플 카운터</h2>
        <SimpleCounter />
      </div>

      <div className="card">
        <h2>🥕 멀티 카운터</h2>
        <MultiCounterList />
      </div>
    </div>
  );
}
