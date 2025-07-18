import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Todo } from "../types/todo";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { formatDate } from "../utils/common.ut";
import DotsIcon from "../assets/threeDots.svg";

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  const handleEditSubmit = () => {
    if (!editText.trim()) return;
    onEdit(todo.id, editText.trim());
    setIsEditing(false);
  };

  const formattedDate = useMemo(() => {
    return formatDate(todo.created_at);
  }, [todo.created_at]);

  return (
    <div className=" flex justify-between p-3 rounded-lg shadow-sm bg-white">
      {/* Main Todo item */}
      <div
        onClick={() => onToggle(todo.id)}
        className="flex w-full flex-col hover:cursor-pointer gap-1"
      >
        <span
          className={`flex-1 ${
            todo.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {todo.text}
        </span>
        <p className="text-xs text-gray-400">Created: {formattedDate}</p>
      </div>
      <div
        ref={optionsRef}
        className="flex relative bg-background-400 p-1 rounded-sm hover:cursor-pointer h-fit"
      >
        <img
          src={DotsIcon}
          className="h-4 w-4"
          alt="Dots"
          onClick={() => setShowOptions(!showOptions)}
        />
        {showOptions && (
          <div className="flex flex-col absolute right-0 top-full bg-white border border-border-100 rounded-2xl z-10 shadow-xl">
            <span
              className="pl-3 py-2 pr-16 hover:cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </span>
            <span className="w-full border border-border-100" />
            <span
              className="pl-3 py-2 pr-16 hover:cursor-pointer"
              onClick={() => setOpenConfirmation(true)}
            >
              Delete
            </span>
          </div>
        )}
      </div>

      {/* Editing Modal */}
      {isEditing && (
        <Modal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          title="Edit task"
        >
          <div className="flex flex-col w-full gap-6">
            <div className="flex flex-col gap-2">
              <input
                className="flex-1 px-3 py-2 border rounded-md outline-none"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <p className="text-xs text-gray-400">Created: {formattedDate}</p>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setEditText(todo.text);
                  setIsEditing(false);
                }}
                text="Cancel"
                variant="tertiary"
              />
              <Button onClick={handleEditSubmit} text="Save" />
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {openConfirmation && (
        <Modal
          isOpen={openConfirmation}
          onClose={() => setOpenConfirmation(false)}
          title="Are you sure ?"
        >
          <div className="flex flex-col w-full gap-6">
            <div className="flex flex-col gap-2">
              <p>You want to delete "{todo.text}"</p>
              <p className="text-xs text-gray-400">Created: {formattedDate}</p>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => onDelete?.(todo.id)}
                text="Yes, Delete"
                variant="tertiary"
              />
              <Button
                onClick={() => setOpenConfirmation(false)}
                text="Cancel"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TodoItem;
