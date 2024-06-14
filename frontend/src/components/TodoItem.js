import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "../axios";
import { formatDate } from "../helpers/showTime";

const TodoItem = ({ todo, fetchTodos }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const editTodoDialog = () => setShowEditDialog(true);

  const closeEditDialog = () => setShowEditDialog(false);

  const handleEdit = async () => {
    try {
      await axios.put(`/api/todos/${todo.id}`, {
        title: editedTitle,
        description: editedDescription,
      });
      fetchTodos();
      setShowEditDialog(false);
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const handleShowDeleteDialog = () => setShowDeleteDialog(true);

  const handleCloseDeleteDialog = () => setShowDeleteDialog(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/todos/${todo.id}`);
      fetchTodos();
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggle = async () => {
    try {
      await axios.put(`/api/todos/${todo.id}`, { completed: !todo.completed });
      fetchTodos();
    } catch (error) {
      console.error("Error toggling todo completion:", error);
    }
  };

  return (
    <>
      <Card style={{ marginBottom: 10 }}>
        <CardContent>
          <Grid
            container
            justifyContent="start"
            alignItems="center"
            direction="row"
          >
            <Grid item>
              {}
              <Checkbox
                size="large"
                checked={todo.completed}
                onChange={handleToggle}
              />
            </Grid>

            <Grid item justifyContent="start" alignItems="start" sm container>
              <Typography
                variant="h6"
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Grid container>
                <Typography variant="body2">{todo.description}</Typography>
                <Box p={0.8}>{}</Box>
                <Typography variant="body2">
                  {formatDate(todo.updatedAt)}
                </Typography>{" "}
              </Grid>
            </Grid>
            <Grid item xs></Grid>
            <Grid item>
              {}
              <IconButton onClick={editTodoDialog}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleShowDeleteDialog}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {}
      <Dialog open={showDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this todo?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="info">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {}
      <Dialog open={showEditDialog} onClose={closeEditDialog}>
        <DialogTitle>Edit Todo</DialogTitle>

        <div style={{ margin: "16pix" }}>
          {" "}
          <DialogContent>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <Box p={0.4}></Box>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              style={{ marginTop: 10 }}
            />
          </DialogContent>{" "}
        </div>
        <DialogActions>
          <Button onClick={closeEditDialog} color="warning">
            Cancel
          </Button>
          <Button onClick={handleEdit} color="success">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TodoItem;
