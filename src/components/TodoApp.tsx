import React, { useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Filter from "./Filter";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Todo } from "../types/todo";
import { filterTodos } from "../utils/filter";

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [filter, setFilter] = useState("all");

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      created_at: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const filteredTodos = filterTodos(todos, filter);

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">My To-Do List</h1>
      <AddTodo onAdd={addTodo} />
      <Filter currentFilter={filter} onChange={setFilter} />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  );
};

export default TodoApp;
