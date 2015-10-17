function processTwitchLogElement($e){
	if(!$e.hasClass("admin")){
		$c = $e.clone();
		$c.find(".message").find("img").replaceWith(function() { return this.alt; });

		var sender = $c.find(".from").text().trim();
		var comment = $c.find(".message").text().trim();
    chrome.runtime.sendMessage(
  	    {"host": window.location.hostname, "sender" : sender, "message" : comment},
  	    function (response) {
  	        console.log(response);
  	    }
  	);
	}
}

var readyStateCheckInterval = setInterval(function() {
  var $ul = $('ul.chat-lines');
  if ($ul.length) {
    clearInterval(readyStateCheckInterval);
    $ul.bind('DOMNodeInserted', function(event) {
      if (event.target.nodeName == 'DIV') {
        processTwitchLogElement($(event.target).find('li.chat-line'));
      }
    })
  }
});
