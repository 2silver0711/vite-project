// src/component/AppAntdTodo.jsx
import React, { useState } from "react";
import { Input, Button, List, Typography, Space, message } from "antd";
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function AppAntdTodo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) {
      message.warning("할 일을 입력해주세요!");
      return;
    }
    setTodos([...todos, { text: input, completed: false }]);
    setInput("");
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Ant Design Todo List ✅</h2>

      <Space.Compact style={{ width: "100%", marginBottom: 16 }}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 입력하세요"
          onPressEnter={addTodo}
        />
        <Button type="primary" onClick={addTodo}>
          추가
        </Button>
      </Space.Compact>

      <List
        bordered
        dataSource={todos}
        renderItem={(todo, index) => (
          <List.Item
            actions={[
              <Button
                type="text"
                icon={<CheckOutlined />}
                onClick={() => toggleTodo(index)}
              />,
              <Button
                danger
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => deleteTodo(index)}
              />,
            ]}
          >
            <Text delete={todo.completed}>{todo.text}</Text>
          </List.Item>
        )}
      />
    </div>
  );
}