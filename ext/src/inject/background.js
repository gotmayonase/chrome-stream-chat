chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      var access_token = '5ce7b91aa698e64a6f9cf7bb004802f4'
	    if( request.host && request.sender && request.message){
  			console.log("formatted [" + request.host + "] [" + request.sender + "] [" + request.message + "]");
  			$.ajax({
  			  type: "POST",
  			  url: "http://localhost:3000/messages",
  			  data: {
            message: {
              "source" : request.host,
    				  "username" : request.sender,
    				  "body" : request.message
            },
            access_token: access_token
  			  },
  			  dataType : 'json',
  	          success: function(data) {
  	            //called when successful
  	          	console.log("success: " + data);
  	          },
    	          error:function( jqXHR, textStatus, errorThrown){
  	          	console.log("error: " + textStatus + ":" + errorThrown);
  	          }

  			});
	    }
      console.log("background.js got a message")
      console.log(request);
      console.log(sender);
      sendResponse("bar2");
    }
);


/*
chrome.runtime.onMessage.addListener( function(request,sender,sendResponse){
	alert("asdf");
    if( request.host && request.sender && request.message){
		console.log("formatted [" + request.host + "] [" + request.sender + "] [" + request.message + "]");
		$.ajax({
		  type: "POST",
		  url: "http://localhost:54545/",
		  data: { "host" : request.host,
			  "sender" : request.sender,
			  "message" : request.message
		  },
		  dataType : 'json',
          success: function(data) {
            //called when successful

            alert(data[0].word);

          }
		});
    }else{
		$.ajax({
		  type: "POST",
		  url: "http://localhost:54545/",
		  data: { "host" : "fail",
			  "sender" : "fail",
			  "message" : "fail"
		  },
		  dataType : 'json',
          success: function(data) {
            //called when successful

            alert(data[0].word);

          }
		});
    }

    sendResponse({"ok":"yep"});
}
*/
