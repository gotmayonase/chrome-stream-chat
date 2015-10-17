function processTwitchLogElement($e){
	if(!$e.hasClass("admin")){
		$c = $e.clone();
		$c.find(".message").find("img").replaceWith(function() { return this.alt; });

		var sender = $c.find(".from").text().trim();
		var comment = $c.find(".message").text().trim();
    chrome.runtime.sendMessage(
  	    {"host": window.location.hostname, "sender" : sender, "message" : message},
  	    function (response) {
  	        console.log(response);
  	    }
  	);
	}
}

$(function(){
  $('ul.chat-lines').bind('DOMNodeInserted', function(event) {
    if (event.target.nodeName == 'DIV') {
      processTwitchLogElement($(event.target).find('li.chat-line'));
    }
  })
});
