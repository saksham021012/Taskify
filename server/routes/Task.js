// Import the required modules
const express = require("express")
const router = express.Router()


const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/TaskController")


// Create a Task
router.post("/createTask", createTask)

// Get All Tasks
router.get("/getAllTasks", getTasks)

// Update a Task (mark complete or edit)
router.put("/updateTask/:id", updateTask)

// Delete a Task
router.delete("/deleteTask/:id", deleteTask)

module.exports = router
