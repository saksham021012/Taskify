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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg">
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
            className="p-4 sm:p-6 group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
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
              // not editing form - display buttons and title, description
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  {/* title */}
                  <h3 className={`font-semibold text-base sm:text-lg mb-2 break-words ${
                    task.completed 
                      ? 'text-gray-500 dark:text-gray-400 line-through' 
                      : 'text-gray-900 dark:text-gray-50'
                  }`}>
                    {task.title}
                  </h3>

                  {/* description */}
                  <p className={`text-sm leading-relaxed break-words ${
                    task.completed 
                      ? 'text-gray-400 dark:text-gray-500 line-through' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {task.description}
                  </p>
                </div>
                
                {/* edit/complete/delete buttons */}
                <div className="flex items-center justify-end sm:justify-start gap-1 sm:gap-2 sm:ml-4 opacity-100 transition-opacity flex-shrink-0">
                  {/* edit button */}
                  <button
                    onClick={() => handleEditTask(task)}
                    className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-500 transition-colors"
                    title="Edit task"
                  >
                    <Edit3 size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                    
                  {/* mark complete button */}
                  {task.completed ? (
                    <button
                      onClick={() => onToggleComplete(task._id, task.completed)}
                      className="p-2 rounded-full hover:bg-yellow-100 dark:hover:bg-yellow-900/50 text-yellow-500 transition-colors"
                      title="Mark as incomplete"
                    >
                      <CheckCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onToggleComplete(task._id, task.completed)}
                      className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900/50 text-green-500 transition-colors"
                      title="Mark as complete"
                    >
                      <Circle size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                  )}

                  {/* delete button */}
                  <button
                    onClick={() => onDeleteTask(task._id)}
                    className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 text-red-500 transition-colors"
                    title="Delete task"
                  >
                    <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
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