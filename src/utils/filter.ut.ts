import type { Todo } from "../types/todo";

export const filterTodos = (todos: Todo[], filter: string): Todo[] => {
  switch (filter) {
    case "completed":
      return todos.filter((todo) => todo.completed);
    case "pending":
      return todos.filter((todo) => !todo.completed);
    default:
      return todos;
  }
};
