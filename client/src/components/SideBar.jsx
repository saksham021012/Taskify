import React from 'react';
import { Home, CheckCircle, X } from 'lucide-react';

const Sidebar = ({ 
  activeView, 
  setActiveView, 
  totalCount, 
  completedCount, 
  isOpen, 
  onClose 
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0  backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 
        flex flex-col transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* count Section */}
        <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <div className="sm:hidden">
              <div>{totalCount} total</div>
              <div>{completedCount} done</div>
            </div>
            <div className="hidden sm:block">
              {totalCount} total • {completedCount} completed
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => {
              setActiveView('all');
              onClose?.();
            }}
            className={`w-full flex items-center gap-3 px-3 lg:px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeView === 'all' 
                ? 'bg-violet-500/10 text-violet-500' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'
            }`}
          >
            <Home size={18} className="lg:w-5 lg:h-5" />
            <span className="text-sm lg:text-base">All Tasks</span>
            <span className="ml-auto text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
              {totalCount}
            </span>
          </button>
          
          <button
            onClick={() => {
              setActiveView('completed');
              onClose?.();
            }}
            className={`w-full flex items-center gap-3 px-3 lg:px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeView === 'completed' 
                ? 'bg-violet-500/10 text-violet-500' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'
            }`}
          >
            <CheckCircle size={18} className="lg:w-5 lg:h-5" />
            <span className="text-sm lg:text-base">Completed</span>
            <span className="ml-auto text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
              {completedCount}
            </span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;