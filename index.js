var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors=require('cors');
var login=require('./login/login');
var projectlist=require('./projectlist/projectlist')
// handle cors 
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header("Access-Control-Allow-Credentials", false);
  next();
});
app.use(
  cors()
  )
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
//app.use(bodyParser.json());
app.use(
  bodyParser.json({
    limit: "50mb",
    extended: true,
    type: "application/json"
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    type: "application/x-www-form-urlencoding"
  })
);
app.use(
  bodyParser.json({
    type: "application/json"
  })
);
app.use(
  bodyParser.raw({
    limit: "50mb"
  })
);
app.post('/login',login.signIn);
app.post('/createproject',projectlist.createproject);
app.post('/updatestatus',projectlist.updatestatus);
app.get('/projectlist',projectlist.projectlist);
app.get('/getcount',projectlist.getcount);
app.get('/getcount1',projectlist.getcount1);
app.listen(8000);
console.log('server is started at port 8000');