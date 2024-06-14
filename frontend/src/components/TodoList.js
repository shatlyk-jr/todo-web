import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../axios";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TodoForm fetchTodos={fetchTodos} />
        </Grid>
        <Grid item xs={12}>
          {}
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} fetchTodos={fetchTodos} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default TodoList;
