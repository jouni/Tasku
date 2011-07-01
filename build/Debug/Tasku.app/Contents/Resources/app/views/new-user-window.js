var seep = require("seep")

var window = new seep.Overlay({wrap:"div.row", center: true})
window.addStyle("new-user")

window.first = new seep.Input()
window.last = new seep.Input()
window.email = new seep.Input()
window.save = new seep.Button("Save")
window.save.disabled = true

window.first.placeholder = "First Name"
window.last.placeholder = "Last Name"
window.email.placeholder = "Email Address"

var keyListener = function(e) {
    if(this.first.text && this.last.text && this.email.text && this.first.text.length > 0 && this.last.text.length > 0 && this.email.text.length > 0) {
    	this.save.disabled = false
    } else {
    	this.save.disabled = true
    }
    if(e.keyCode == 13) {
    	this.save.click()
    }
}

window.add([new seep.Text("<h1>First Time Here?</h1><p>To start using <em>Tasku</em>, enter your details so everyone knows who you are.</p>"), window.first, window.last, window.email, window.save])

window.first.focus()

window.first.addListener("keyup", keyListener, {bind: window, client: true})
window.last.addListener("keyup", keyListener, {bind: window, client: true})
window.email.addListener("keyup", keyListener, {bind: window, client: true})

window.save.addListener("click", function() {
    var window = this
    global.USER = new User({
        firstname : window.first.text
      , lastname  : window.last.text
      , email     : window.email.text
    })
    global.USER.save()
    this.visible = false
}, {bind: window})

exports.view = window