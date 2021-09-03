var express = require("express");
var app = express();
var cors=require('cors');
var login=require('./login/login');
var projectList=require('./projectlist/projectlist')


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
  express.json({
    limit: "50mb",
    extended: true,
    type: "application/json"
  },)
);

app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    type: "application/x-www-form-urlencoding"
  })
);
app.use(
  express.json({
    type: "application/json"
  })
);
app.use(
 express.raw({
    limit: "50mb"
  })
);
app.post('/login',login.signIn);
app.post('/createproject',projectList.createProject);
app.post('/updatestatus',projectList.updateStatus);
app.get('/projectlist',projectList.projectList);
app.get('/getcount',projectList.getCount);
app.get('/getBarCount',projectList.getBarCount);
app.get('/getBarCount1',projectList.getBarCount1);

app.listen(8000);
console.log('server is started at port 8000');