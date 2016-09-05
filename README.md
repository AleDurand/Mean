# Mean

## First install nodejs

## Execute the following command to install the dependencies:

	npm install
	
By default, node will not monitor for file changes after your server has been started. 
This means you’d have to shut down and start the server every time you made a file change. 
This can be fixed with nodemon. To use:
 
	npm install -g nodemon 
	
## Execute the following commands to build and run the app in production enviroment:
	
	grunt prod

	NODE_ENV=production nodemon server.js
	
## Execute the following command to build and run the app in development enviroment:
	
	grunt dev

	nodemon server.js


	


	