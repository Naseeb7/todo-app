import React, { useMemo, useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Filter from "./Filter";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Todo } from "../types/todo";
import { filterTodos } from "../utils/filter.ut";
import { Filtertypes } from "../utils/defaultStates";

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [filter, setFilter] = useState(Filtertypes.ALL);

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
    <main className="flex flex-col sm:flex-row h-screen">
      <div className="flex flex-col sm:w-1/5 px-3 sm:px-5 py-4 sm:py-8 gap-4 sm:gap-8">
        <h1 className="text-xl sm:text-2xl font-bold">To-Do List</h1>
        <Filter currentFilter={filter} onChange={setFilter} />
      </div>

      <div className="flex flex-col bg-background-100 sm:w-4/5  pt-5 sm:pt-16 gap-5 sm:gap-8 flex-1 overflow-hidden">
        <AddTodo onAdd={addTodo} />

        <div className="flex-1 overflow-y-auto pb-4 px-3 sm:px-10">
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            currentFilter={filter}
          />
        </div>
      </div>
    </main>
  );
};

export default TodoApp;
