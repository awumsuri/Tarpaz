var mongoose    = require("mongoose");
var Schema      = mongoose.Schema;

var DeviceSchema    = new Schema({
    badges:Number,
    token:String
});

module.exports  = mongoose.model("DeviceTokens", DeviceSchema);
