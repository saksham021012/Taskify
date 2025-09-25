import React, { useState } from 'react';
import { CheckCircle, Circle, Trash2, Edit3 } from 'lucide-react';
import TaskForm from './TaskForm';

const TaskList = ({ 
  tasks, 
  onToggleComplete, 
  onDeleteTask, 
  onUpdateTask,
  activeView 
}) => {
  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (task) => {
    setEditingTask(task._id);
  };

  const handleUpdateTask = async (taskData) => {
    if (!editingTask) return;

    try {
      await onUpdateTask(editingTask, taskData);
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          {activeView === 'completed' 
            ? 'No completed tasks yet!' 
            : 'No tasks yet! Add your first task below.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {tasks.map((task) => (
          <div 
            key={task._id} 
            className="p-6 group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            {editingTask === task._id ? (
                // editing state form 
              <TaskForm 
                onAddTask={handleUpdateTask}
                onCancel={handleCancelEdit}
                initialData={{
                  title: task.title,
                  description: task.description
                }}
                submitButtonText="Update Task"
                formTitle="Edit Task"
                isEditing={true}
              />
            ) : (
                //not editing form - display buttons and title, description
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">

                  {/* title  */}
                  <h3 className={`font-semibold text-lg mb-2 ${
                    task.completed 
                      ? 'text-gray-500 dark:text-gray-400 line-through' 
                      : 'text-gray-900 dark:text-gray-50'
                  }`}>
                    {task.title}
                  </h3>

                  {/* description  */}
                  <p className={`text-sm leading-relaxed ${
                    task.completed 
                      ? 'text-gray-400 dark:text-gray-500 line-through' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {task.description}
                  </p>
                </div>
                
                {/* edit/complete/delete buttons */}
                <div className="flex items-center gap-2 ml-4 opacity-100 group-hover:opacity-100 transition-opacity">
                    {/* edit button  */}
                  <button
                    onClick={() => handleEditTask(task)}
                    className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-500 transition-colors"
                    title="Edit task"
                  >
                    <Edit3 size={18} />
                  </button>
                    
                    {/* mark complete button  */}
                  {task.completed ? (
                    <button
                      onClick={() => onToggleComplete(task._id, task.completed)}
                      className="p-2 rounded-full hover:bg-yellow-100 dark:hover:bg-yellow-900/50 text-yellow-500 transition-colors"
                      title="Mark as incomplete"
                    >
                      <CheckCircle size={18} />
                    </button>
                  ) : (
                    <button
                      onClick={() => onToggleComplete(task._id, task.completed)}
                      className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900/50 text-green-500 transition-colors"
                      title="Mark as complete"
                    >
                      <Circle size={18} />
                    </button>
                  )}

                  {/* delete button  */}
                  <button
                    onClick={() => onDeleteTask(task._id)}
                    className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 text-red-500 transition-colors"
                    title="Delete task"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;