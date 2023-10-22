const mongoose = require('mongoose')


let task = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  }
})

module.exports = mongoose.model("Task", task)