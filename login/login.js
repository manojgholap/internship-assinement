// const mongoose = require('mongoose');
// dont use mongoclient instead use mongoose 
// move constant in separate file

let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/"
exports.signIn = (req, res) => {
    {
        let data = req.body;
        let userName = data.userName;
        let password = data.password;
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            let dbo = db.db("assinement");
            dbo.collection("login").find({ username: userName, password: password }).toArray(function (err, result) {
                if (err) throw err
                if (result.length > 0) {
                    resdata = {
                        status: true,
                        message: "login successfully",
                        data: result
                    }
                    res.send(resdata)
                }
                else {
                    resdata = {
                        status: false,
                        message: "invalid credentials",
                    }
                    res.send(resdata)

                }
                db.close();
            });
        });
    }
}
