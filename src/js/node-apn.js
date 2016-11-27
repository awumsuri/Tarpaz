"use strict"

var apn     = require('apn');
var options = {
    cert:"/home/ubuntu/FXTimeKeeper/apn_app/config/Certificates.pem",
    key:"/home/ubuntu/FXTimeKeeper/apn_app/config/key.pem",
    passphrase:"aFREE))@",
    "batchFeedback":true,
    "interval":300
};

var apnConnection   = new apn.Connection(options);
apnConnection.options.production = true;

apnConnection.on("connected", function(){
    console.info("Connected");
});

apnConnection.on("transmitted", function(notification, device){
    console.info("Notifications trasmitted to:" + device.token.toString("hex"));
});

apnConnection.on("transmissionError", function(errCode, notification, device){
    console.error("Notification caused error:"+errCode+"for device ", device, notification);
    if(errCode === 8){
        console.info("A error code of 8 indicates that the device token is invalid. This couldbe for a number reason - are you using the correct environment? i.e. Production vs. Sandbox");
    }
});

apnConnection.on("timeout", function () {
        console.info("Connection Timeout");
});

apnConnection.on("disconnected", function() {
        console.info("Disconnected from APNS");
});

apnConnection.on("socketError", function(err) {
  console.error("APN ERROR>>"+err);
});

function send(token, msg, badge, callback){
    console.log("sending msg:"+msg);
    var device  = new apn.Device(token);
    var note    = new apn.Notification();
    note.badge  = badge;
    note.sound  = "ping.aiff";
    note.alert  = msg;
    apnConnection.pushNotification(note, device);
}

function sendBreakingNews(token, msg, badge,result,callback) {
    console.log("sending breaking msg:"+msg);
    var device  = new apn.Device(token);
    var note    = new apn.Notification();
    var arrowDirection = "";
    if(result.s === "worse")
        arrowDirection = "\ue233 WORSE than Expected.";
    else if(result.s === "better")
        arrowDirection = "\ue232 BETTER than Expected.";
    note.badge  =1;//badge;
    note.sound  = "ping.aiff";
    note.alert  = msg+" "+arrowDirection;
    result.type     = "calendarNews";
    note.payload = result;//{"actual:":result.ba, "direction":result.s,"type":"calendarNews"},
    apnConnection.pushNotification(note, device);
    if(callback)
        callback(result);
}

module.exports.send =  send;
module.exports.sendBreakingNews = sendBreakingNews;

console.info("apnConnection:"+this.send);
