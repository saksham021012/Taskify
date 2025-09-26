import React, { useState, useEffect } from 'react';
import { Loader, Menu } from 'lucide-react';
import NavBar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { 
  createTask, 
  getAllTasks, 
  updateTask, 
  deleteTask 
} from "../services/Operations/taskOperations";

const TaskifyDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('all'); // 'all' or 'completed'
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const result = await getAllTasks();
      if (result.success) {
        setTasks(result.data);
      } 
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    const newTask = {
      ...taskData,
      completed: false
    };

    const result = await createTask(newTask);
    if (result.success) {
      setTasks(prev => [...prev, result.data]);
    }
  };

  const handleToggleComplete = async (taskId, currentStatus) => {
    try {
      const updates = { completed: !currentStatus };
      const result = await updateTask(taskId, updates);
      
      if (result.success) {
        setTasks(prev => 
          prev.map(task => 
            task._id === taskId 
              ? { ...task, completed: !currentStatus }
              : task
          )
        );
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      const result = await deleteTask(taskId);
      if (result.success) {
        setTasks(prev => prev.filter(task => task._id !== taskId));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    const result = await updateTask(taskId, updates);
    
    if (result.success) {
      setTasks(prev => 
        prev.map(task => 
          task._id === taskId 
            ? { ...task, ...updates }
            : task
        )
      );
    }
  };

  // Filter tasks based on active view
  const filteredTasks = tasks.filter(task => {
    if (activeView === 'completed') {
      return task.completed;
    }
    return true; // 'all' view shows all tasks
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <NavBar />
      
      <div className="flex flex-1 min-h-0">
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          totalCount={totalCount}
          completedCount={completedCount}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* mobile Menu Button */}
          <div className="lg:hidden p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
            >
              <Menu size={20} />
            </button>
          </div>

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto h-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50">
                  {activeView === 'completed' ? 'Completed Tasks' : 'All Tasks'}
                </h2>
                {loading && (
                  <div className="flex items-center gap-2 text-violet-500">
                    <Loader className="animate-spin" size={20} />
                    <span className="text-sm sm:hidden">Loading...</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col gap-4 sm:gap-6 pb-6 sm:pb-8">
                {loading ? (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 text-center">
                    <Loader className="animate-spin mx-auto mb-4 text-violet-500" size={24} sm:size={32} />
                    <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Loading tasks...</p>
                  </div>
                ) : (
                  <TaskList
                    tasks={filteredTasks}
                    onToggleComplete={handleToggleComplete}
                    onDeleteTask={handleDeleteTask}
                    onUpdateTask={handleUpdateTask}
                    activeView={activeView}
                  />
                )}
                
                {/* add new task form - only show in all */}
                {activeView === 'all' && !loading && (
                  <TaskForm onAddTask={handleAddTask} />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div> 
  );
};

export default TaskifyDashboard;