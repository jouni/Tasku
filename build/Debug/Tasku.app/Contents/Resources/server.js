var PORT = process.argv[2]
global.MONGO_PORT = process.argv[3]
global.APP_NAME = process.argv[4]

// TODO package dependencies to the app bundle (including all sub-dependencies of seep)
var seep = require("seep")

seep.registerApp(__dirname + "/app/app.js")

seep.start(PORT, __dirname+"/app/")