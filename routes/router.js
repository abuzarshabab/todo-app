const express = require('express')
const  { fetchTasks, createTask, fetchTask, updateTask, deleteTask } = require('../controller/controller')

const router = express.Router()

router.get('/tasks', fetchTasks)

router.post('/tasks', createTask)

router.get('/tasks/:taskId', fetchTask)

router.patch('/tasks/:taskId', updateTask)

router.delete('/tasks/:taskId', deleteTask)

module.exports = router;