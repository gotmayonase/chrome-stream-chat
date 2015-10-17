function processLiveCodingLogElement($e){
	var $c = $e.clone();
	var sender = $c.find("a").find('small').remove().end().text();
	$c.find("a").remove();
	$c.find("img").replaceWith(function() { return $.trim(this.alt); });
	var comment = $c.text().trim();

  chrome.runtime.sendMessage(
	    {"host": window.location.hostname, "sender" : sender, "message" : comment},
	    function (response) {
	        console.log(response);
	    }
	);
}

var readyStateCheckInterval = setInterval(function() {
  var $ul = $('ul.message-pane');
  if ($ul.length) {
    clearInterval(readyStateCheckInterval);
    $ul.bind('DOMNodeInserted', function(event) {
      if (event.target.nodeName == 'LI') {
        processLiveCodingLogElement($(event.target));
      }
    });
  }
}, 10)
