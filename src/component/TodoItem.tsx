import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./TodoItem.css";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onUpdate: (id: number, newText: string) => void;
  onToggleCompletion: (id: number) => void;
  editingTodoId: number | null;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDelete,
  onEdit,
  onUpdate,
  onToggleCompletion,
  editingTodoId,
}) => {
  const [newText, setNewText] = useState(todo.text);

  const handleUpdate = () => {
    if (newText.trim() === "") return;
    onUpdate(todo.id, newText);
  };

  return (
    <div className="list-container">
      {editingTodoId === todo.id && !todo.completed ? (
        <div className="todo-container">
          <span>
            <InputText
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              disabled={todo.completed}
            />
          </span>
          <Button
            icon="pi pi-check"
            rounded
            text
            raised
            severity="success"
            aria-label="Update"
            onClick={handleUpdate}
            disabled={todo.completed}
          />
        </div>
      ) : (
        <div
          className={`todo-item ${
            todo.completed ? "completed-todo" : "todo-container"
          }`}
        >
          <Checkbox
            onChange={() => onToggleCompletion(todo.id)}
            checked={todo.completed}
            disabled={todo.completed ? true : false}
          ></Checkbox>
          <span onClick={() => onEdit(todo.id)}>
            <InputText
              value={todo.text}
              disabled={todo.completed ? true : false}
            />
          </span>
          <Button
            icon="pi pi-trash"
            rounded
            severity="danger"
            aria-label="Cancel"
            onClick={() => onDelete(todo.id)}
          />
        </div>
      )}
    </div>
  );
};

export default TodoItem;
