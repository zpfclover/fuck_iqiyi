var windowSizeObj;
var dan_init_GO=0;
chrome.runtime.sendMessage({greeting: "windowzise"}, function(response) {
    windowSizeObj=response.farewell;
	F_iqiyiPlayer();
});
function F_iqiyiPlayer(){
console.log(windowSizeObj);
	if(windowSizeObj.W!=null&&windowSizeObj.H!=null){
		$('#flashbox').css({"width":windowSizeObj.W+"px","height":windowSizeObj.H+"px"});
		$('.player-dsj').css({"width":windowSizeObj.W+"px"});
		$('#flashArea').css({"height":(windowSizeObj.H+80)+"px"});
	}
	dan_init_GO=1;
}

