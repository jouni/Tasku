var seep = require("seep")
  , data = require("./data")
  , sidebar = require("./sidebar").sidebar
  , content = require("./content").content
  , tasks_view = require("./views/tasks").view

  , syncServer = require("./sync-server")

exports.app = seep.Application.extend({
	
	init: function() {
		this._super(APP_NAME)
		this.add(sidebar)
		this.add(content)
		
		var app = this	
		User.findOne({}, function(err, user) {
			if(user) {
				global.USER = user
			} else {
				var window = require("./views/new-user-window").view
				app.add(window)		
			}
		})
		
		sidebar.addNavListener(function(section) {
			// 'this' is sidebar
			content.remove(0)
			if(section == "Tasks") {
				content.add(tasks_view)
			}
			else content.add(new seep.Text(section))
		})
		
		// Ugly!
		sidebar.widgets[1].click()
	}	
})