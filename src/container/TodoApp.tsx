import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import "./TodoApp.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  // loading Todos from localStorage
  useEffect(() => {
    try {
      const storedTodos: string | null = localStorage.getItem("MY_TODO_LIST");
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos) as Todo[]);
      }
    } catch (error) {
      console.error("Error loading todos from localStorage:", error);
    }
  }, []);

  // whenever todos change save Todos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("MY_TODO_LIST", JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos to localStorage:", error);
    }
  }, [todos]);

  // adding new Todo
  const addTodo = () => {
    if (newTodo.trim() === "") return;

    const newTodos = [
      ...todos,
      {
        id: todos.length + 1,
        text: newTodo,
        completed: false,
      },
    ];

    setTodos(newTodos);
    setNewTodo("");
  };

  //delete Todo
  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    if (editingTodoId === id) {
      setEditingTodoId(null);
    }
  };

  //edit Todo
  const editTodo = (id: number) => {
    setEditingTodoId(id);
  };

  //update Todo
  const updateTodo = (id: number, newText: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
    setEditingTodoId(null);
  };

  //mark as completed Todo
  const toggleCompletion = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div className="add-todo">
        <InputText
          placeholder="Todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button
          icon="pi pi-plus"
          rounded
          text
          raised
          severity="info"
          aria-label="Cancel"
          onClick={addTodo}
        />
      </div>
      <Divider />
      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onEdit={editTodo}
        onUpdate={updateTodo}
        onToggleCompletion={toggleCompletion}
        editingTodoId={editingTodoId}
      />
    </div>
  );
};

export default TodoApp;
