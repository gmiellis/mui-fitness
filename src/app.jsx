import React, { Component  } from 'react';
import {
  Paper,
  TextField,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    margin: 20,
    padding: 20,
    maxWidth: 400,
  },
};

export default withStyles(styles)(
  class App extends Component {
  state = {
    exercises: [
      { id: 1, title: 'Bench Press' },
      { id: 2, title: 'Deadlifts' },
      { id: 3, title: 'Squats' },
    ],
    title: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleCreate = e => {
    // prevents default page reload
    e.preventDefault();
    // checks if title field is not-empty
    if (this.state.title) {
    // sets the state with an updater function to
    // mitigate async updates
    // destructures exercises and title off the prevState
    // object, Spreads out the exercises on the next state with
    // a new exercise object.
      this.setState(({ exercises, title }) => ({
        exercises: [
          ...exercises,
          {
            title,
            id: Date.now(),
          },
        ],
        // resets the title to clear out the input field
        title: '',
      }));
    }
  };

  handleDelete = id => {
    this.setState(({ exercises }) => ({
      exercises: exercises.filter(ex => ex.id !== id),
    }));
  };

  render() {
    const { title, exercises } = this.state;
    return (
      <Paper>
        <Typography
          varient="display1"
          align="center"
          gutterBottom
        >
          Exercises
        </Typography>
        <form onSubmit={this.handleCreate}>
          <TextField
            name="title"
            label="Exercise"
            value={title}
            onChange={this.handleChange}
            margin="normal"
          />
          <Button
            type="submit"
            color="primary"
            variant="raised"
          >
            Create
          </Button>
        </form>
        <List>
          {exercises.map(({ id, title }) => (
            <ListItem key={id}>
              <ListItemText primary={title} />
              <ListItemSecondaryAction>
                <IconButton
                  color="primary"
                  onClick={() => this.handleDelete(id)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
  });
