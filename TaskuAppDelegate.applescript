--
--  TaskuAppDelegate.applescript
--  Tasku
--
--  Created by Jouni Koivuviita on 2.6.2011.
--

script TaskuAppDelegate
	property parent : class "NSObject"
	property ourWebView : missing value
	
	global app_name
	global node_port
	global mongo_port
	global node_bin
	global mongo_bin
	global db_path
	global cwd
	
	on applicationWillFinishLaunching_(aNotification)
		
		############################################
		# Define application name
		############################################
		set app_name to "Tasku"
		
		############################################
		# Define the port where to run the app (both node server and mongodb)
		############################################
		set node_port to 9012
		set mongo_port to 22344
		
		############################################
		# Define the script to run
		############################################
		set script_name to "server.js"
		
		############################################
		# Define the custom binary names
		############################################
		set node_bin to "tasku-node"
		set mongo_bin to "tasku-mongod"
		
		# Get current working directory path
		set pathOfScript to quoted form of (POSIX path of (path to current application))
		set cwd to do shell script "echo " & pathOfScript & " | sed 's/\\(\\/.*\\/\\)\\(.*\\)/\\1/g' "
		
		
		# Create database file if not already created
		set AppSupFolder to path to application support from user domain
		set db_path to (path to application support from user domain as text) & app_name & ":db:"
		tell application "Finder"
			if not (exists folder app_name of AppSupFolder) then
				do shell script "/bin/mkdir -p " & quoted form of POSIX path of db_path
			end if
		end tell
		
		# Run embedded MongoDB
		do shell script "" & cwd & "Contents/Resources/" & mongo_bin & " --port " & mongo_port & " --dbpath " & quoted form of POSIX path of db_path & " > /dev/null 2>&1 &"
		
		# Remove old node log file
		do shell script "rm -f " & cwd & "Contents/Resources/node.log > /dev/null 2>&1 &"
		
		# Run embedded Node.js server with the given script
		do shell script "" & cwd & "Contents/Resources/" & node_bin & " " & cwd & "Contents/Resources/" & script_name & " " & node_port & " " & mongo_port & " " & app_name & " > " & cwd & "Contents/Resources/node.log 2>&1 &"
		
		delay 2
		
		--tell ourWebView to setMainFrameURL_("http://127.0.0.1:" & node_port)
		
	end applicationWillFinishLaunching_
	
	on applicationShouldTerminate_(sender)
		# Kill the node server
		set the_pid to (do shell script "ps ax | grep " & (quoted form of node_bin) & " | grep -v grep | awk '{print $1}'")
		if the_pid is not "" then do shell script "kill -9 " & the_pid & " > /dev/null 2>&1 &"
		
		
		# Kill the mongo database
		set the_pid to (do shell script "ps ax | grep " & (quoted form of mongo_bin) & " | grep -v grep | awk '{print $1}'")
		if the_pid is not "" then do shell script "kill -9 " & the_pid
		
		# Remove mondo lock file
		do shell script "rm -f " & (quoted form of POSIX path of db_path) & "mongod.lock > /dev/null 2>&1 &"
		
		return current application's NSTerminateNow
	end applicationShouldTerminate_
	
	on log_entry(theLine)
		do shell script "echo " & theLine & " >> ~/Library/Logs/AppleScript-events.log"
	end log_entry
	
	on windowdidbecomekey_(aNotification)
		log_entry("foobar")
		tell window "mainwindow" to set visible to true
	end windowdidbecomekey_
	
	on performClose_(aNotification)
		log_entry("performClose")
	end performClose_
	
end script