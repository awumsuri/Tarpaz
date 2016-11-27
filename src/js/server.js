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
router.route("/update").post(function(req, res) {
    var params = JSON.parse(req.body);
    var html = '<html>\
      <head>\
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"/>\

        <script\
          src="https://code.jquery.com/jquery-3.1.1.min.js"\
          integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="\
          crossorigin="anonymous"\
        >\
        </script>\
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>\
      </head>\
      <body>\
        <span class="space"></span>\
        <div class="logo">\
          <img src="tarpaz-logo.jpg"/>\
        </div>\
        <div class="main">\
            <span class="title">GOLD PRICE AS OF\
              <BR/>\
              <span id="time">\
                <script>\
                  $("#time").html(new Date());\
               </script>\
             </span>\
         </span>\
        </div>\
        </body>\
        </html>'

    res.status('200').send(html);
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

			console.log("token:"+req.body.token);

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
