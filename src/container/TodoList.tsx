import React from "react";
import TodoItem, { Todo } from "../component/TodoItem";

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onUpdate: (id: number, newText: string) => void;
  onToggleCompletion: (id: number) => void;
  editingTodoId: number | null;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onDelete,
  onEdit,
  onUpdate,
  onToggleCompletion,
  editingTodoId,
}) => {
  return (
    <>
      {todos?.length < 1 ? (
        <h1>You don't have any task</h1>
      ) : (
        todos?.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onEdit={onEdit}
            onUpdate={onUpdate}
            onToggleCompletion={onToggleCompletion}
            editingTodoId={editingTodoId}
          />
        ))
      )}
    </>
  );
};

export default TodoList;

// {todos?.map((todo) => (
//   <TodoItem
//     key={todo.id}
//     todo={todo}
//     onDelete={onDelete}
//     onEdit={onEdit}
//     onUpdate={onUpdate}
//     onToggleCompletion={onToggleCompletion}
//     editingTodoId={editingTodoId}
//   />
// ))}
