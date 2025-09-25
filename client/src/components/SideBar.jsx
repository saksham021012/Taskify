import React from 'react';
import { Home, CheckCircle } from 'lucide-react';

const Sidebar = ({ activeView, setActiveView, totalCount, completedCount }) => {
  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {totalCount} total • {completedCount} completed
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={() => setActiveView('all')}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeView === 'all' 
              ? 'bg-violet-500/10 text-violet-500' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'
          }`}
        >
          <Home size={20} />
          <span>All Tasks</span>
          <span className="ml-auto text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
            {totalCount}
          </span>
        </button>
        
        <button
          onClick={() => setActiveView('completed')}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeView === 'completed' 
              ? 'bg-violet-500/10 text-violet-500' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'
          }`}
        >
          <CheckCircle size={20} />
          <span>Completed</span>
          <span className="ml-auto text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
            {completedCount}
          </span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;