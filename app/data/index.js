var mongoose = require("mongoose")

/**
 * Connect to database
 */
mongoose.connect('mongodb://localhost:' + MONGO_PORT + '/' + APP_NAME.toLowerCase())

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId

/**
 * Define User schema
 */
var user_schema = new mongoose.Schema({
    firstname    : String
  , lastname     : String
  , email        : String
    
})
mongoose.model("User", user_schema)
global.User = mongoose.model("User")



/**
 * Define Tag schema
 */
var tag_schema = new mongoose.Schema({
    label   : String
})
mongoose.model("Tag", tag_schema)
global.Tag = mongoose.model("Tag")



/**
 * Define Project schema
 */
var project_schema = new mongoose.Schema({
    name   : String
  , done   : Boolean
})
mongoose.model("Project", project_schema)
global.Project = mongoose.model("Project")



/**
 * Define Note schema
 */
var note_schema = new mongoose.Schema({
    text      : String
  , project   : ObjectId
  , tags      : [Tag]
  , modified  : {
           date : Date
         , user : ObjectId
           }
})
mongoose.model("Note", note_schema)
global.Note = mongoose.model("Note")



/**
 * Define Task schema
 */
var task_schema = new mongoose.Schema({
    title     : String
  , isDone    : Boolean
  , assignee  : ObjectId
  , note      : String
  , due       : Date
  , finished  : Date
  , modified  : {
           user : ObjectId
         , date : Date
         }
  , tags      : [Tag]
  , project   : ObjectId
})
task_schema.pre('save', function (next) {
    this.modified.user = USER
    this.modified.date = new Date()
    next()
})
mongoose.model("Task", task_schema)
global.Task = mongoose.model("Task")