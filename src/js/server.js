var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TARPAZ', function(err) {
    if (err) throw err;
});

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var Device = require("./models/device");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var port = process.env.PORT || 8007;
var router = express.Router();
router.use(function(req, res, next) {
    next();
});
app.get('/', function(req, res) {
    res.status('404').send('<h1>Forbidden</h1>');
});

router.route("/removetoken").post(function(req, res) {
    Device.find({
        "token": req.body.token
    }, function(err, devices) {
        if (err) {
            throw err;
            res.send("error: %s");
        } else {
            devices.forEach(function(device) {
                device.remove();
            });
            res.send("success");
        }
    });
});

router.route("/resettoken").post(function(req, res) {
    Device.find({
        "token": req.body.token
    }, function(err, devices) {
        if (err) {
            console.log("err:" + err);
            throw err;
            res.send("error: %s", err);
        } else {
            devices.forEach(function(device) {
                device.badges = 0;
                device.save();
                console.log("reseting token:" + device.token);
            });
            res.send("success");
        }
    });
});
router.route("/storetoken")
    .post(function(req, res) {
        if (req.body.token === "(null)") {
            console.log("Null token sent");
            res.send("null token sent");
            return;
        }
        Device.find({
            "token": req.body.token
        }, function(err, docs) {
            if (err) {
                console.log("err:" + err);
                res.send(err);
                return;
            }

            if (docs && docs.length > 0) {
                res.send("success");
                return;
            }

            if (req.body.token === undefined) {
                res.send("no token");
                return;
            }
            var device = new Device();
            device.token = req.body.token;
            device.badges = 0;
            device.save(function(err) {
                if (err)
                    res.send(err);
                else
                    res.send("success");
            });
        });
    });

app.use("/api", router);
app.use("/static", express.static("public"));
app.listen(port, '172.31.60.240', function(err) {
    if (err) throw err;
    console.log("Conected to port:" + port);
});
