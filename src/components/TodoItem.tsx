import React, { useState } from "react";
import type { Todo } from "../types/todo";

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEditSubmit = () => {
    if (!editText.trim()) return;
    onEdit(todo.id, editText.trim());
    setIsEditing(false);
  };

  const formatDate = (isoDate: string) =>
    new Date(isoDate).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="p-2 border rounded-md shadow-sm mb-2 bg-white">
      <div className="flex justify-between items-center">
        {isEditing ? (
          <>
            <input
              className="flex-1 p-1 border rounded-md"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button
              className="ml-2 text-green-600 hover:underline"
              onClick={handleEditSubmit}
            >
              Save
            </button>
            <button
              className="ml-2 text-gray-500 hover:underline"
              onClick={() => {
                setEditText(todo.text);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <span
              onClick={() => onToggle(todo.id)}
              className={`flex-1 cursor-pointer ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.text}
            </span>
            <button
              className="ml-3 text-blue-500 hover:underline"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="ml-2 text-red-500 hover:underline"
              onClick={() => onDelete(todo.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
      <p className="text-xs text-gray-400 mt-1">
        Created: {formatDate(todo.created_at)}
      </p>
    </div>
  );
};

export default TodoItem;
