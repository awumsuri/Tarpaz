"use strict"

var apn     = require("./node-apn");
var mongoose    = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TARPAZ');
var Device      = require("./../models/device");

Device.find({}, function (err, devices) {
    if(err){
        console.log("Error:"+err);
        return;
    }

    devices.forEach(function (device) {
        if(device.token && device.token !== "(null)"){
            apn.send(device.token, "Push Services back online. Thanks for your patience.", device.badges, null);
        }
    });
});
