var seep = require("seep")

var s = exports.sidebar = new seep.layout.Flow()
s.addStyle("sidebar")

var notes = new seep.Button("Notes")
var tasks = new seep.Button("Tasks")
var files = new seep.Button("Files")

notes.addStyle("section")
tasks.addStyle("section")
files.addStyle("section")

notes.removeStyle("s-button")
tasks.removeStyle("s-button")
files.removeStyle("s-button")

notes.tabIndex = -1
tasks.tabIndex = -1
files.tabIndex = -1

s.add([notes, tasks, files])

var listeners = []

s.addNavListener = function(listener) {
	if(listener && typeof listener == "function")
		listeners.push(listener)
}

function clickListener(e) {
	for(var i=0; i < this.widgets.length; i++) {
		var button = this.widgets[i]
		if(button.type == "button") {
			button.removeStyle("selected")
			button.tabIndex = -1
		}
	}
	e.source.addStyle("selected")
	e.source.tabIndex = 0
	this.selected = e.source
	for(var i=0; i < listeners.length; i++) {
		listeners[i].call(this, e.source.text)
	}
}

notes.addListener("click", clickListener, {bind: s})
tasks.addListener("click", clickListener, {bind: s})
files.addListener("click", clickListener, {bind: s})

function keyListener(e) {
	if(e.keyCode == 38 || e.keyCode == 40) {
		var index = this.getWidgetIndex(this.selected)
		if(index < this.count()-1 && e.keyCode==40) {
			// Down
			this.getWidget(index+1).click()
			this.getWidget(index+1).focus()
		} else if(index > 0 && e.keyCode==38) {
			// Up
			this.getWidget(index-1).click()
			this.getWidget(index-1).focus()
		}
	}
}

s.addListener("keydown", keyListener, {bind: s})