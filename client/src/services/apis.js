// services/apis.js
const BASE_URL = import.meta.env.VITE_BASE_URL;

// ========== TASK ROUTES ==========
export const taskEndpoints = {
  CREATE_TASK_API: `${BASE_URL}/tasks/createTask`,        // POST
  GET_ALL_TASKS_API: `${BASE_URL}/tasks/getAllTasks`,     // GET
  UPDATE_TASK_API: (id) => `${BASE_URL}/tasks/updateTask/${id}`, // PUT
  DELETE_TASK_API: (id) => `${BASE_URL}/tasks/deleteTask/${id}`, // DELETE
};
