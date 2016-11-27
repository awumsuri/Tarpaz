var apn = require("./node-apn");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/FXTimeKeeperAPN');
var Device = require("./../models/device");

module.exports = {
    send: function(msg, callback) {
        Device.find({}, function(err, devices) {
            if (err) {
                console.log("Error:" + err);
                return;
            }
            devices.forEach(function(device) {
                if (device.token && device.token !== "(null)") {
                    device.badges += 1;
                    apn.send(device.token, msg, device.badges, callback);
                    device.save(function(err) {
                        if (err)
                            console.log("Err:" + err);
                    });
                };
            });
        });
    },
    sendBreakingNews: function(msg, opts, callback) {
        Device.find({}, function(err, devices) {
            if (err) {
                console.log("Error:" + err);
                return;
            }
            devices.forEach(function(device) {
                if (device.token && device.token !== "(null)") {
                    apn.sendBreakingNews(device.token, msg, 0, opts, callback);
                    device.save(function(err) {
                        if (err)
                            console.log("Err:" + err);
                    });
                }
            });
        });
    }
}
