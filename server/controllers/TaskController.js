const Task = require("../models/Task");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.auth.userId; // Clerk user ID

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and Description are both required",
      });
    }

    const newTask = await Task.create({ title, description, userId });

    return res.status(200).json({
      success: true,
      message: "Task Created Successfully",
      data: newTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all tasks for the logged-in user
exports.getTasks = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a task (mark completed or edit) only if it belongs to the user
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.auth.userId;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId }, // filter by task ID + user ID
      updates,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found or not authorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a task only if it belongs to the user
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.auth.userId;

    const deletedTask = await Task.findOneAndDelete({ _id: id, userId });

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found or not authorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
