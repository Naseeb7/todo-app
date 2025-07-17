import React, { useMemo, useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Filter from "./Filter";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Todo } from "../types/todo";
import { filterTodos } from "../utils/filter.ut";

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

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, filter);
  }, [todos, filter]);

  return (
    <main className="flex min-h-screen">
      <div className="flex flex-col w-1/5 px-5 py-8 gap-8">
        <h1 className="text-2xl font-bold">To-Do List</h1>
        <Filter currentFilter={filter} onChange={setFilter} />
      </div>
      <div className="flex flex-col bg-background-100 w-4/5 px-10 py-16 gap-8">
        <AddTodo onAdd={addTodo} />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          currentFilter={filter}
        />
      </div>
    </main>
  );
};

export default TodoApp;
