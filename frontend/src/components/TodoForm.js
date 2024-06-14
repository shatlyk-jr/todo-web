import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "../axios";

const TodoForm = ({ fetchTodos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    try {
      await axios.post("/api/todos", { title, description });
      fetchTodos();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} marginTop={4}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Add Todo
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TodoForm;
