var mongoose = require('mongoose');
var apn = require("./node-apn");
var fs = require("fs");

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
router.route("/update").post(function(req, res) {

    var html = '<html>\
                  <head>\
                  <link href="http://localhost:8007/static/styles.css" rel="stylesheet"/>\
                  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"/>\
                   <script src="https://code.jquery.com/jquery-3.1.1.min.js"\
                      integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="\
                      crossorigin="anonymous"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js">\
                  </script>\
                  </head>\
                  <body>\
                    <span class="space"></span>\
                      <div class="logo">\
                        <img src="tarpaz-logo.jpg"/>\
                      </div>\
                      <div class="main">\
                      <span class="title">GOLD PRICE AS OF<BR/>\
                      <span id="time">\
                    <script>$("#time").html(new Date());</script>\
                    </span></span>\
                    <div class ="prices">\
                      <fieldset>\
                        <div class="form-group">\
                          <label class="control-label" for="textinput">FIX: $' + req.body.fix + '</label>\
                        </div>\
                        <div class="form-group">\
                          <label class="control-label" for="textinput">SILVER: $' + req.body.silver + '</label>\
                        </div>\
                        <div class="form-group">\
                          <label class="control-label" for="textinput">10K: $' + req.body.ten + '</label>\
                        </div>\
                        <div class="form-group">\
                          <label class="control-label" for="textinput">14K: $' + req.body.fourteen + '</label>\
                        </div>\
                        <div class="form-group">\
                          <label class="control-label" for="textinput">18K: $' + req.body.eighteen + '</label>\
                        </div>\
                        <div class="form-group">\
                          <label class="control-label" for="textinput">22K: $' + req.body.twentytwo + '</label>\
                        </div>\
                        <div class="form-group">\
                          <label class="control-label" for="textinput">PLT: $' + req.body.plt + '</label>\
                        </div>\
                      </fieldset>\
                    </div>\
                    </div>\
                  </body>\
            </html>';

    fs.writeFile("public/index.html", html, function(err) {
        if (err)
            return console.log(err + ' ' + new Date());
        console.log("new index saved successfully");

        res.status('200').redirect("/static/");
    });

    sendAPN(req.body);
});

router.route("/admin").post(function(req, res) {
    if(req.body.username === "tarpaz" && req.body.password === "tarpaz12345") {
      res.status('200').sendFile(__dirname + "/html/admin.html");
      return;
    }
    res.status('200').redirect("/api/login");
})

router.route("/login").get(function(req, res) {
  res.status('200').sendFile(__dirname + "/html/login.html");
})

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

            console.log("token:" + req.body.token);

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

function sendAPN(params) {
    var prices = "36 W 47TH ST #205, NY\n212-302-7969\n" +
        "FIX: $" + params.fix + "\n" +
        "SILVER: $" + params.silver + "\n" +
        "10K: $" + params.ten + "\n" +
        "14K: $" + params.fourteen + "\n" +
        "18K: $" + params.eighteen + "\n" +
        "22K: $" + params.twentytwo + "\n" +
        "PLT: $" + params.plt;

    Device.find({}, function(err, devices) {

        if (err) {
            console.log("Error:" + err);
            return;
        }

        devices.forEach(function(device) {
            if (device.token && device.token !== "(null)") {
                device.badges += 1;
                apn.send(device.token, prices, device.badges, null);
            }
        });
    });
}

app.use("/api", router);
app.use("/static", express.static("public"));
app.listen(port, '172.31.60.240', function(err) {
//app.listen(port, '127.0.0.1', function(err) {
    if (err) throw err;
    console.log("Conected to port:" + port);
});
