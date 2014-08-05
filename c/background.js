chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
        console.log(response.farewell);
    });
});

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
        if (request.greeting == "windowzise"){
			var obj={};
			obj.W=parseInt(localStorage['sizeW']);
			obj.H=parseInt(localStorage['sizeH']);
            sendResponse({farewell: obj});
		}
});