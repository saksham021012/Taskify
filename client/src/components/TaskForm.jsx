import React, { useState, useEffect } from 'react';
import { CirclePlus, Loader, Save } from 'lucide-react';

const TaskForm = ({ 
  onAddTask, 
  onCancel,
  initialData = null, 
  submitButtonText = "Add Task",
  formTitle = "Add New Task",
  isEditing = false
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // set initial data when editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddTask({
        title: title.trim(),
        description: description.trim()
      });
      
      // reset form on success only if not editing
      if (!initialData) {
        setTitle('');
        setDescription('');
      }
    } catch (error) {
      console.error('Error in TaskForm:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={
        isEditing 
          ? "space-y-3 sm:space-y-4" 
          : "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mt-6 sm:mt-8"
      }
    >
      {formTitle && (
        <h3 className="text-lg font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-gray-50">
          {formTitle}
        </h3>
      )}
      
      <div className="space-y-3 sm:space-y-4">
        {/* title input */}
        <input 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          className={`
            w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
            rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500 
            transition disabled:opacity-50 text-sm sm:text-base
            ${isEditing ? 'px-3 py-2' : 'px-3 sm:px-4 py-2 sm:py-3 border-gray-200 rounded-lg'}
          `}
          placeholder="Task title..." 
          type="text"
          required
        />
        
        {/* description textarea */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
          className={`
            w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
            rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500 
            transition disabled:opacity-50 resize-none text-sm sm:text-base
            ${isEditing ? 'px-3 py-2' : 'px-3 sm:px-4 py-2 sm:py-3 border-gray-200 rounded-lg'}
          `}
          placeholder="Task description..."
          rows={isEditing ? "2" : "3"}
          required
        />
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
          {/* update or add button */}
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`
              bg-violet-500 hover:bg-violet-600 disabled:bg-violet-300 dark:disabled:bg-violet-700 
              text-white transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed
              text-sm sm:text-base
              ${isEditing 
                ? 'px-4 py-2 rounded-md' 
                : 'font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg'
              }
            `}
          > 
            {/* update icon or save icon */}
            {isSubmitting ? (
              <Loader className="animate-spin" size={18} />
            ) : (
              initialData ? <Save size={18} /> : <CirclePlus size={18} />
            )}

            {/* loading state text */}
            <span className="whitespace-nowrap">
              {isSubmitting 
                ? (initialData ? 'Updating...' : 'Adding...')
                : submitButtonText
              }
            </span>
          </button>
          
          {/* cancel button when editing */}
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 text-sm rounded-md transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TaskForm;