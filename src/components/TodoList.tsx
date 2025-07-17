import React from "react";
import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";

interface Props {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TodoList: React.FC<Props> = ({ todos, onToggle, onDelete, onEdit }) => {
  return (
    <div>
      {todos.length === 0 ? (
        <p className="text-center text-gray-400">No tasks found</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
