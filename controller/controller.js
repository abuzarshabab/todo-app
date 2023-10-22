const { json } = require('body-parser');
const task = require('../database/model/task');
const Task = require('../database/model/task');
const { default: mongoose } = require('mongoose');

async function createTask (req, res) {
  try {

    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      isCompleted: false,
    })  

    await task.save()

    res.status(201).json({ msg: "Task created successfully", task });
  } catch (error) {
    console.log('Error occured while creating the Task: ', error)
    res.status(400).json({ error: 'Error occured while creating the Task' })
  }
}

async function fetchTasks (req, res) {
  try {
    const tasks = await Task.find({})
    
    if (!tasks.length) { res.status(204).send() }

    res.status(200).json(tasks)
  } catch (error) {
    console.log('Error occured while fetching the Tasks: ', error)
    res.status(400).json({ error: 'Error occured while fetching the tasks' })
  }
}

async function fetchTask (req, res) {
  try {
    const taskObjectId = new mongoose.Types.ObjectId(req.params.taskId)
    const task = await Task.find({ _id: taskObjectId })

    console.log('Task', task)
    if (!task.length) { res.status(204).send() }

    res.status(200).json(task)
  } catch (error) {
    console.log('Error occured while fetching the Task :', error)
    res.status(400).json({ error: 'Error occured while fetching the task :' + req.params.taskId })
  }
}

async function updateTask (req, res) {
  try {
    const taskObjectId = new mongoose.Types.ObjectId(req.params.taskId)

    const updateRusult = await Task.findOneAndUpdate(
      { _id: taskObjectId },
      { isCompleted: req.query.isCompleted || true },
      { new: true }
    )
    
    if (!updateRusult) { res.status(404).json({ message: "Update failed"}) }

    res.status(200).json(updateRusult)
  } catch (error) {
    console.log('Error occured while updating the Task :', error)
    res.json({ error: 'Error occured while updating the task :' + req.params.taskId }).status(400)
  }

}

async function deleteTask (req, res) {
  try {
    const taskObjectId = new mongoose.Types.ObjectId(req.params.taskId)
    const deleteResult = await Task.deleteOne({ _id: taskObjectId });

    if (!deleteResult.deletedCount) { res.status(404).json({ message: "Delete failed, No task found" }) }

    res.status(200).json(deleteResult)
  } catch (error) {
    console.log('Error occured while updating the Task :', error)
    res.status(400).json({ error: 'Error occured while updating the task :' + req.params.taskId })
  }
}

module.exports = { fetchTasks, createTask, fetchTask, updateTask, deleteTask }