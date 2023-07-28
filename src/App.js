import {useState, useEffect} from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import {useDispatch, useSelector} from "react-redux";
import {add, fetchTasksAsync, toggleReminder} from "./store/addTaskSlice";
import {remove} from "./store/addTaskSlice";

function App() {
  const dispatch = useDispatch();
  const [showAddTask, setShowAddTask] = useState(false);
  const tasks = useSelector((state) => state.addTask.tasks);

  useEffect(() => {
    dispatch(fetchTasksAsync);
  }, [dispatch]);

  const handleAddTask = (task) => {
    dispatch(add(task));
  };

  const handleDeleteTask = (id) => {
    dispatch(remove(id));
  };     

  const handleToggleReminder = (id) => {
    dispatch(toggleReminder(id));
  };
  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={handleAddTask} />}
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={handleDeleteTask}
          onToggle={handleToggleReminder}
        />
      ) : (
        "Add Some Tasks"
      )}
      <Footer />
    </div>
  );
}

export default App;
