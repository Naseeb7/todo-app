import React, { useState } from "react";
import Button from "./UI/Button";

interface Props {
  onAdd: (text: string) => void;
}

const AddTodo: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 sm:gap-2 px-3 sm:px-10"
    >
      <input
        type="text"
        className="flex-1 p-2 bg-white border border-gray-600 rounded-lg outline-none"
        placeholder="Do some laundry in the evening..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex w-1/2 self-center sm:w-1/6">
        <Button type="submit" text="Add Task" />
      </div>
    </form>
  );
};

export default AddTodo;
