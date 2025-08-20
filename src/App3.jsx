// src/component/App3.jsx

/**
 * React + Ant Design To-Do List
 * -------------------------------------
 * ✅ CRUD 개념 정리
 * - C (Create): 새로운 todo 등록
 * - R (Read): todo 목록 읽기 및 렌더링
 * - U (Update): todo 수정 및 완료 여부 토글
 * - D (Delete): todo 삭제
 * 
 * + 로컬스토리지(LocalStorage) 활용
 *   → 새로고침해도 데이터가 사라지지 않음 (Persistence)
 * 
 * + Ant Design 컴포넌트 사용
 *   → Input, Button, List, Typography, message 등
 */

import { useState, useEffect } from "react";
import { Input, Button, List, Typography, Space, message } from "antd"; 
import { SearchOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import styles from "./css/App.module.css"; 

const { Text } = Typography;

function App3() {
  // ----------------- [R - Read] 초기 상태 불러오기 -----------------
  /**
   * todos 상태는 앱의 핵심 데이터
   * - 초기화 시 로컬스토리지(localStorage)에서 불러옴
   * - JSON.parse()를 통해 문자열 → 객체 배열로 변환
   * - 저장된 값이 없으면 빈 배열 []
   */
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  /**
   * useEffect: todos 상태가 변할 때마다 로컬스토리지에 저장
   * - JSON.stringify()로 객체 배열 → 문자열 변환 후 저장
   */
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ----------------- [C - Create] 할 일 추가 -----------------
  /**
   * 새로운 todo 항목 추가
   * @param {string} text - 입력한 할 일 내용
   */
  const addTodo = (text) => {
    if (!text.trim()) {
      // 빈 문자열 또는 공백만 입력했을 때 경고 메시지
      message.warning("할 일을 입력해주세요!");
      return;
    }
    setTodos([
      ...todos,
      {
        id: Date.now(),   // 현재 시간을 밀리초 단위로 변환 → 고유한 ID 생성
        text,             // 입력받은 텍스트
        completed: false, // 처음에는 완료되지 않은 상태
      },
    ]);
  };

  // ----------------- [U - Update] 텍스트 수정 -----------------
  /**
   * 특정 todo의 텍스트 수정
   * @param {number} id - 수정할 todo의 고유 ID
   * @param {string} updatedText - 새로 수정된 텍스트
   */
  const updateTodo = (id, updatedText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: updatedText } : todo
      )
    );
  };

  // ----------------- [U - Update] 완료 여부 토글 -----------------
  /**
   * 완료 상태 토글 (체크박스 개념)
   * @param {number} id - 토글할 todo의 고유 ID
   */
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // ----------------- [D - Delete] 삭제 -----------------
  /**
   * 특정 todo 삭제
   * @param {number} id - 삭제할 todo의 고유 ID
   */
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // ----------------- 검색 기능 -----------------
  /**
   * 검색어 입력값 관리
   * - searchQuery: 현재 검색창에 입력한 문자열
   * - filteredTodos: 검색어가 포함된 todo만 필터링
   *   (검색어가 없으면 전체 todos 출력)
   */
  const [searchQuery, setSearchQuery] = useState("");
  const filteredTodos = searchQuery
    ? todos.filter((todo) =>
        todo.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : todos;

  // ----------------- UI 렌더링 -----------------
  return (
    <div className={styles.app}>
      <h1>📌 Ant Design 기반 To-Do List (App3)</h1>

      {/* ----------------- 입력창 -----------------
        - Ant Design의 Input.Search 컴포넌트 활용
        - enterButton 옵션 → 엔터 OR 버튼 클릭으로 todo 추가 가능
      */}
      <Space.Compact style={{ width: "100%", marginBottom: 16 }}>
        <Input.Search
          placeholder="할 일을 입력하세요"
          enterButton="추가"
          onSearch={addTodo} // addTodo 호출
        />
      </Space.Compact>

      {/* ----------------- 검색창 -----------------
        - 검색창은 기본 input 태그 사용
        - UX 개선을 위해 type="search" (X 버튼으로 전체 삭제 가능)
      */}
      <div className={styles.searchInput}>
        <SearchOutlined className={styles.ico} />
        <input
          type="search"
          placeholder="할 일을 검색할 수 있어요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* ----------------- 리스트 -----------------
        - Ant Design의 List 컴포넌트 활용
        - actions 배열에 버튼(완료/삭제) 넣기
        - Typography.Text의 delete 속성으로 취소선 표시
      */}
      <List
        bordered
        dataSource={filteredTodos}
        locale={{ emptyText: "할 일이 없습니다 🎉" }} // 리스트가 비었을 때
        renderItem={(todo) => (
          <List.Item
            actions={[
              <Button
                type="text"
                icon={<CheckOutlined />}
                onClick={() => toggleComplete(todo.id)}
              />,
              <Button
                danger
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => deleteTodo(todo.id)}
              />,
            ]}
          >
            {/* 완료된 경우 → 취소선 표시 */}
            <Text delete={todo.completed}>{todo.text}</Text>
          </List.Item>
        )}
      />
    </div>
  );
}

export default App3;