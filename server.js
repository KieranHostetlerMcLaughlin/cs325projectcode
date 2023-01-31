
/*********************
All the modules I need
**********************/

const http = require("http");
const fs = require("fs");

/*************************************
 * Read in all my files
 * These are the vars that will do that
 *************************************/

var index = ""
var style = ""
var script = ""
var fourofour = ""

//sets the port
//this is the version to try if you get an in use error
//i have 2 versions
//on this one, the default port is 50000
//on the other, it's 3000
//please try the other one first
var port = process.env.port || 3000;

//reads in the index.html file
fs.readFile("./public/index.html", "utf8", function(error, data) {

    if (error) {throw error;}
    index = data;
    console.log("file contents:", data);
})

//reads in the style.css file
fs.readFile("./public/style.css", "utf8", function(error, data) {

    if (error) {throw error;}
    style = data;
    console.log("file contents:", data);
})

//reads in the javascript file
fs.readFile("./public/script.js", "utf8", function(error, data) {

    if (error) {throw error;}
    script = data;
    console.log("file contents:", data);
})

//reads in the 404 file
fs.readFile("./public/404.html", "utf8", function(error, data) {

    if (error) {throw error;}
    fourofour = data;
    console.log("file contents:", data);
})

/********************
This makes the server
*********************/
const server = http.createServer(function(request, response) {

    //this sees if the user wants to go to the index.html file
    if (request.url === "/index.html" || request.url === "/") {
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/html")
        response.write(index);
        response.end();

    //this sees if the user wants to go to the style.css file
    } else if (request.url === "/style.css") {
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/css")
        response.write(style);
        response.end();

    //this sees if the user wants to go to the index.js file
    } else if (request.url === "/script.js") {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/javascript")
        response.write(script);
        response.end();

    //this is for everything else that can't be handled
    } else {
        response.statusCode = 404;
        response.setHeader("Content-Type", "text/html")
        response.write(fourofour);
        response.end();
    }
});

/***********************************************
 * This listens for server environment variables
 **********************************************/

//this is what happens if there's no environment variable
//it's the default

server.listen(port, function() {console.log("listening on port:", port);});