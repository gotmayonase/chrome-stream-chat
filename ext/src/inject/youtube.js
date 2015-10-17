function processYouTubeLogElement($e){
	try{
		var sender = $e.find(".yt-user-name").text().trim();
		var comment = $e.find(".comment-text").text().trim();
    chrome.runtime.sendMessage(
  	    {"host": window.location.hostname, "sender" : sender, "message" : comment},
  	    function (response) {
  	        console.log(response);
  	    }
  	);
	}catch(e){
		console.log(e);
	}
}

var readyStateCheckInterval = setInterval(function() {
  var $ul = $('ul#all-comments');
  if ($ul.length) {
    clearInterval(readyStateCheckInterval);
    $ul.bind('DOMNodeInserted', function(event) {
      if (event.target.nodeName == 'LI') {
        processYouTubeLogElement($(event.target));
      }
    });
  }
}, 10)
