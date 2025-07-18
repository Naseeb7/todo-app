import React, { useMemo } from "react";
import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";
import { Filtertypes } from "../utils/defaultStates";

interface Props {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
  currentFilter: string;
}

const TodoList: React.FC<Props> = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
  currentFilter,
}) => {
  const noTaskText = useMemo(() => {
    switch (currentFilter) {
      case Filtertypes.ALL:
        return "Please add a task!";
      case Filtertypes.COMPLETED:
        return "No completed tasks!";
      case Filtertypes.PENDING:
        return "No pending tasks!";

      default:
        break;
    }
  }, [currentFilter]);
  return (
    <div className="flex flex-col gap-3">
      {todos.length === 0 ? (
        <p className="text-center text-gray-400 text-xl font-semibold">
          {noTaskText}
        </p>
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
