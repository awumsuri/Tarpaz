var mongoose	= require('mongoose');
var Schema	= mongoose.Schema;

var RSSFeedSchema 	= Schema({
		lastModified:Number
});

module.exports	= mongoose.model("rss_feed", RSSFeedSchema);
