var seep = require("seep")
  , TaskView = require("./task-view").view


var view = exports.view = new seep.layout.Flow()


view.newTask = new seep.Input()
view.newTask.placeholder = "Create new task..."
view.newButton = new seep.Button("+")
view.newButton.tooltip = "Create Task"

view.newButton.addListener("click", function() {
    if(this.newTask.text) {
    	var task = new Task()
    	task.title = this.newTask.text
    	task.assignee = USER
    	task.save()
    	this.add(new TaskView(task), {index: 1, animate: true})
    	this.newTask.text = ""
    }
}, {bind: view})

view.newTask.addListener("keydown", function(e) {
    if(e.keyCode==13) this.newButton.click()
    else if(e.keyCode==27) {
    	this.newTask.text = ""
    	e.preventDefault()
    	//e.stopPropagation()
    }
}, {bind: view, client: true})

var newLayout = new seep.layout.Flow()
newLayout.addStyle("add-task")

newLayout.add(view.newTask)
newLayout.add(view.newButton)
view.add(newLayout)

view.newTask.addListener("keydown", function(e) {
    if(e.keyCode==40) {
    	var next = this.getWidget(1)
    	if(next) next.focus()
    }
}, {bind: view})

newLayout.addListener("click", function() {
    this.newTask.focus()
}, {bind: view, client: true})


// Find all current tasks from database
Task.find({}, function(err, tasks) {
	tasks.forEach(function(task) {
		view.add(new TaskView(task))
	})
})

