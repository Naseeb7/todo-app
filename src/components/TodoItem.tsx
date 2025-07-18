import React, { useEffect, useRef, useState, useMemo } from "react";
import type { Todo } from "../types/todo";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { formatDate } from "../utils/common.ut";
import DotsIcon from "../assets/threeDots.svg";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showOptions, setShowOptions] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(e.target as Node)
      ) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formattedDate = useMemo(
    () => formatDate(todo.created_at),
    [todo.created_at]
  );

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      className="flex justify-between p-3 rounded-lg shadow-sm bg-white origin-top"
      layout
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        onClick={() => onToggle(todo.id)}
        className="flex flex-col w-full cursor-pointer gap-1"
      >
        <span className={todo.completed ? "line-through text-gray-400" : ""}>
          {todo.text}
        </span>
        <span className="text-xs text-gray-400">Created: {formattedDate}</span>
      </div>

      <div
        ref={optionsRef}
        className="relative px-1 cursor-pointer flex h-fit bg-background-400 roundedxl"
      >
        <img
          src={DotsIcon}
          className="h-4 w-4"
          onClick={() => setShowOptions(!showOptions)}
        />

        <AnimatePresence>
          {showOptions && (
            <motion.div
              key="options-menu"
              className="flex flex-col absolute right-0 top-full bg-white border border-border-100 rounded-2xl z-10 shadow-xl"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <span
                className="pl-3 py-2 pr-16 hover:cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </span>
              <span className="w-full border border-border-100" />
              <span
                className="pl-3 py-2 pr-16 hover:cursor-pointer"
                onClick={() => setConfirmDelete(true)}
              >
                Delete
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit task"
      >
        <div className="flex flex-col gap-4">
          <input
            className="px-3 py-2 border rounded outline-none"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <div className="flex gap-4 justify-end">
            <Button
              text="Cancel"
              onClick={() => setIsEditing(false)}
              variant="tertiary"
            />
            <Button text="Save" onClick={handleEdit} />
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Are you sure?"
      >
        <div className="flex flex-col gap-4">
          <p>Delete "{todo.text}"?</p>
          <div className="flex gap-4 justify-end">
            <Button text="Cancel" onClick={() => setConfirmDelete(false)} />
            <Button
              text="Yes, Delete"
              variant="tertiary"
              onClick={() => {
                setConfirmDelete(false);
                onDelete(todo.id); // ✅ Delete here directly
              }}
            />
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default TodoItem;
