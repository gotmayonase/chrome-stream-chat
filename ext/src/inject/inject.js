function processLog(host, sender, message){
	chrome.runtime.sendMessage(
	    {"host": host, "sender" : sender, "message" : message},
	    function (response) {
	        console.log(response);
	    }
	);
}


function processLiveCodingLogElement($e){
	console.log('livecoding');
	var $c = $e.clone();
	var sender = $c.find("a").find('small').remove().end().text();
	$c.find("a").remove();
	$c.find("img").replaceWith(function() { return $.trim(this.alt); });
	var comment = $c.text().trim();

	processLog(window.location.hostname, sender, comment);
}

function processYouTubeLogElement($e){
	try{
		var sender = $e.find(".yt-user-name").text().trim();
		var comment = $e.find(".comment-text").text().trim();
		processLog(window.location.hostname, sender, comment);
	}catch(e){
		console.log(e);
	}
}


function processTwitchLogElement($e){
	if(!$e.hasClass("admin")){
		$c = $e.clone();
		$c.find(".message").find("img").replaceWith(function() { return this.alt; });

		var sender = $c.find(".from").text().trim();
		var comment = $c.find(".message").text().trim();
		processLog(window.location.hostname, sender, comment);
	}
}

$(function(){
	console.log('document ready');
});
chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			console.log('here');
			console.log($('ul.message-pane'));
			clearInterval(readyStateCheckInterval);
			// Twitch
			$('ul.chat-lines').bind('DOMNodeInserted', function(event) {
				if (event.target.nodeName == 'DIV') {
					processTwitchLogElement($(event.target).find('li.chat-line'));
				}
			})

			// LiveCoding
			$('ul.message-pane').bind('DOMNodeInserted', function(event) {
				console.log(event);
				if (event.target.nodeName == 'LI') {
					console.log($(event.target));
					processLiveCodingLogElement($(event.target));
				}
			});

			// YouTube
			$("ul#all-comments").bind('DOMNodeInserted', function(event) {
				if (event.target.nodeName == 'LI') {
					processYouTubeLogElement($(event.target));
				}
			});
		}
	}, 10);
});
