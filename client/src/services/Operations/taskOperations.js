// operations/taskOperations.js
import { apiConnector } from "../apiConnector";
import { taskEndpoints } from "../apis";

const { 
  CREATE_TASK_API, 
  GET_ALL_TASKS_API, 
  UPDATE_TASK_API, 
  DELETE_TASK_API 
} = taskEndpoints;

// ========== CREATE TASK ==========
export const createTask = async (taskData) => {
  try {
    const response = await apiConnector("POST", CREATE_TASK_API, taskData);
    console.log("CREATE_TASK RESPONSE:", response);

    if (!response.data.success) {
      throw new Error("Task creation failed");
    }

    return { success: true, data: response.data.data };
  } catch (error) {
    console.error("CREATE_TASK ERROR:", error);
    return { success: false, error: error.message };
  }
};

// ========== GET ALL TASKS ==========
export const getAllTasks = async () => {
  try {
    const response = await apiConnector("GET", GET_ALL_TASKS_API);
    console.log("GET_ALL_TASKS RESPONSE:", response);

    if (!response.data.success) {
      throw new Error("Failed to load tasks");
    }

    return { success: true, data: response.data.data };
  } catch (error) {
    console.error("GET_ALL_TASKS ERROR:", error);
    return { success: false, data: [], error: error.message };
  }
};

// ========== UPDATE TASK ==========
export const updateTask = async (taskId, updates) => {
  try {
    const response = await apiConnector("PUT", UPDATE_TASK_API(taskId), updates);
    console.log("UPDATE_TASK RESPONSE:", response);

    if (!response.data.success) {
      throw new Error("Task update failed");
    }

    return { success: true, data: response.data.data };
  } catch (error) {
    console.error("UPDATE_TASK ERROR:", error);
    return { success: false, error: error.message };
  }
};

// ========== DELETE TASK ==========
export const deleteTask = async (taskId) => {
  try {
    const response = await apiConnector("DELETE", DELETE_TASK_API(taskId));
    console.log("DELETE_TASK RESPONSE:", response);

    if (!response.data.success) {
      throw new Error("Task deletion failed");
    }

    return { success: true, message: response.data.message };
  } catch (error) {
    console.error("DELETE_TASK ERROR:", error);
    return { success: false, error: error.message };
  }
};
