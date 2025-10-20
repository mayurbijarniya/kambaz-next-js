"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo} from "./todosReducer";
import { ListGroup, Button } from "react-bootstrap";

export default function TodoItem({ todo }: { todo: { id: string; title: string } }) {
  const dispatch = useDispatch();
  return (
    <ListGroup.Item
      key={todo.id}
      className="d-flex justify-content-between align-items-center gap-2"
    >
      <span>{todo.title}</span>
      <div className="d-flex gap-2">
        <Button
          variant="primary"
          onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click"
        >
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click"
        >
          Delete
        </Button>
      </div>
    </ListGroup.Item>
  );
}
