
import { useEffect, useState } from "react";
import "./App.css";
// import Navigation from './components/Navigation';
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  // React state
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [activePage, setActivePage] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load tasks from Django API
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Could not load tasks");
        }

        const data = await response.json();
        setTasks(data);
        setError("");
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  // Dashboard counts
  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount = tasks.length - completedCount;

  // Sidebar options
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "all", label: "All Tasks", icon: "📋" },
    { id: "pending", label: "Pending Tasks", icon: "⏳" },
    { id: "completed", label: "Completed Tasks", icon: "✅" },
  ];

  // Add task through Django API
  async function addTask(event) {
    event.preventDefault();

    const title = taskInput.trim();

    if (!title) {
      alert("Please enter a task!");
      return;
    }

    try {
      setError("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const newTask = await response.json();

      setTasks((previousTasks) => [
        ...previousTasks,
        newTask,
      ]);

      setTaskInput("");
    } catch (err) {
      setError(err.message || "Could not add task");
    }
  }

  // Complete or uncomplete a task
  async function toggleTask(taskId) {
    const task = tasks.find(
      (item) => item.id === taskId
    );

    if (!task) return;

    try {
      setError("");

      const response = await fetch(
        `${API_URL}${taskId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !task.completed,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks((previousTasks) =>
        previousTasks.map((item) =>
          item.id === taskId ? updatedTask : item
        )
      );
    } catch (err) {
      setError(err.message || "Could not update task");
    }
  }

  // Delete task through Django API
  async function deleteTask(taskId) {
    try {
      setError("");

      const response = await fetch(
        `${API_URL}${taskId}/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((previousTasks) =>
        previousTasks.filter(
          (task) => task.id !== taskId
        )
      );
    } catch (err) {
      setError(err.message || "Could not delete task");
    }
  }

  // Filter tasks according to selected sidebar option
  const visibleTasks = tasks.filter((task) => {
    if (activePage === "pending") {
      return !task.completed;
    }

    if (activePage === "completed") {
      return task.completed;
    }

    return true;
  });

  const pageTitle = menuItems.find(
    (item) => item.id === activePage
  )?.label;

  // Reusable task form
  function TaskForm({ placeholder }) {
    return (
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          placeholder={placeholder}
          value={taskInput}
          onChange={(event) =>
            setTaskInput(event.target.value)
          }
        />

        <button type="submit">+ Add Task</button>
      </form>
    );
  }

  // Reusable task list
  function TaskList({ items }) {
    if (items.length === 0) {
      return (
        <p className="empty-message">
          No tasks found. Add a task to get started!
        </p>
      );
    }

    return (
      <ul className="task-list">
        {items.map((task) => (
          <li key={task.id} className="task-item">
            <label className="task-label">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />

              <span
                className={
                  task.completed ? "task-done" : ""
                }
              >
                {task.title}
              </span>
            </label>

            <button
              type="button"
              className="delete-button"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">TaskFlow</h2>

        <p className="menu-heading">MENU</p>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={
                activePage === item.id
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() => setActivePage(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          Stay productive 🚀
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}

        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <>
            {/* Dashboard */}
            {activePage === "dashboard" && (
              <section>
                <h1>Dashboard</h1>

                <p className="subtitle">
                  Welcome back! Manage your daily tasks.
                </p>

                <div className="stats-grid">
                  <div className="stat-card">
                    <p>Total Tasks</p>
                    <h2>{tasks.length}</h2>
                  </div>

                  <div className="stat-card">
                    <p>Pending Tasks</p>
                    <h2>{pendingCount}</h2>
                  </div>

                  <div className="stat-card">
                    <p>Completed Tasks</p>
                    <h2>{completedCount}</h2>
                  </div>
                </div>

                <div className="content-card">
                  <h2>Quick Add Task</h2>

                  <TaskForm placeholder="What do you need to do?" />

                  <p className="hint">
                    Open All Tasks to view and manage your tasks.
                  </p>
                </div>
              </section>
            )}

            {/* All, Pending and Completed */}
            {activePage !== "dashboard" && (
              <section>
                <div className="page-header">
                  <div>
                    <h1>{pageTitle}</h1>

                    <p className="subtitle">
                      Organize your work, one task at a time.
                    </p>
                  </div>

                  <span className="task-count">
                    {visibleTasks.length} tasks
                  </span>
                </div>

                {activePage === "all" && (
                  <div className="content-card">
                    <TaskForm placeholder="Enter a new task..." />
                  </div>
                )}

                <div className="content-card">
                  <TaskList items={visibleTasks} />
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
