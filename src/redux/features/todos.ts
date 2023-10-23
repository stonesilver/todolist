import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { TodoContext } from "../../types/index";

interface CounterState {
  todos: TodoContext[];
}

const initialState: CounterState = {
  todos: [
    {
      id: "1cbcf3fd-ddb5-4197-a279-ae68c0fe4c6e",
      task: "read the book",
      done: false,
    },
    {
      id: "4bdee12e-6cb8-4948-88ec-b8b98d09bec5",
      task: "buy dog food",
      done: true,
    },
  ],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    createTodo: (state, action: PayloadAction<TodoContext>) => {
      state.todos.unshift(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const index = state.todos.findIndex((t) => t.id === action.payload);
      state.todos.splice(index, 1);
    },
    toggleDoneState: (state, action: PayloadAction<string>) => {
      const index = state.todos.findIndex((t) => t.id === action.payload);
      state.todos.splice(index, 1, {
        ...state.todos[index],
        done: !state.todos[index].done,
      });
    },
    updateTodo: (state, action: PayloadAction<string>) => {
      const index = state.todos.findIndex((t) => t.id === action.payload);
      state.todos.splice(index, 1, {
        ...state.todos[index],
        task: action.payload,
      });
    },
    markAllAsUndone: (state) => {
      state.todos = state.todos.map((t) => ({ ...t, done: false }));
    },
  },
});

export const {
  createTodo,
  deleteTodo,
  toggleDoneState,
  updateTodo,
  markAllAsUndone,
} = counterSlice.actions;

export const selectCount = (state: RootState) => state.todos.todos;

export default counterSlice.reducer;
