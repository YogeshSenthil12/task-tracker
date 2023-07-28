import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchTasksAsync = createAsyncThunk("fetchTasks", async () => {
  const response = await fetch("http://localhost:8000/tasks");
  return response.json();
});

const addTaskSlice = createSlice({
  name: "task",
  initialState: {
    showAddtask: false,
    tasks: [],
  },
  reducers: {
    add: (state, action) => {
      state.tasks.push(action.payload);
      console.log("..........", action.payload);
    },
    remove: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleReminder: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.reminder = !task.reminder;
      }
    },
    setShowAddtask: (state, action) => {
      state.showAddtask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasksAsync.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
  },
});

export const {add, remove, toggleReminder, setShowAddtask} =
  addTaskSlice.actions;
export default addTaskSlice.reducer;
