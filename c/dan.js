

var titleStr=$(document).attr('title');
titleStr=titleStr.match(/[^-]*/)[0];
var bgm=titleStr.split(' ');
var bgmName=bgm[0];
var bgmNum=titleStr.split(' ')[1].match(/[0-9]+/)[0];

function Init(){
console.log('1');
init_Basic_W();
//$.get('http://zpf522.vip1.3000idc.com/jsonLoad.aspx?bgmName='+bgmName+'&bgmNum='+bgmNum,function(data){
$.get('http://zpf522.vip1.3000idc.com/jsonLoad.aspx?bgmName='+bgmName+'&bgmNum='+bgmNum,function(data){
	getXMLShoot(data);
	console.log(data);
});
}

var X=0;
var Y=0;
var H=$('.player-dsj').height();
var W=$('.player-dsj').width();
var postionStyle="";
function init_Basic_W(){
	var offset=$('.player-dsj').offset();
	X=0;
	Y=0;
	if(offset!=null){
		X=$('.player-dsj').offset().left;
		Y=$('.player-dsj').offset().top+12;
	}
	H=$('.player-dsj').height();
	W=$('.player-dsj').width();
	H=(H==null?400:H-45);
	W=(W==null?600:W);
	postionStyle="width:"+W+"px;height:"+H+"px;position:absolute;top:"+Y+"px;left:"+X+"px;";

	$('body').append('<div id="MaskX" style="'+postionStyle+'color:#fcfcfc;font-size:18px;font-weight:bold;text-shadow:1px 1px 5px #111;overflow:hidden;"></div>');
	$('body').append('<div id="Control" style="position:fixed;left:5px;bottom:32px;font-size:18px;font-weight:bold;color:#fcfcfc;"></div>');
	$('#Control').append('<input id="btn_control" type="button" value="加载中" style="position:relative;z-index:20;" disabled="disabled" />')
	$('#Control').append('<div id="timeLine" style="position:relative;z-index:20;"></div>');
}

function getXMLShoot(url){
$.get(url,function(data){
	var O=XmlTOObj(data);
	//console.log(O);
    PdA=O;
	$("#btn_control").val('点击开始');
	$("#btn_control").removeAttr('disabled');
	$("#btn_control").click(function(){StartShoot();});
	//StartShoot();
	var IntervalA=setInterval('checkW()',timeAddIndex);
});
}
  
var PdA;  
var timeLine_Now=0;
var timeAddIndex=30;
var zhai=[];
var zhai_X=20;
var zhai_L=H/zhai_X;
var zhai5=[];
console.log(zhai_L);
for(var i=0;i<zhai_L;i++){
    zhai.push(0);
    zhai5.push(0);
}

var IIII = 0;
var IIIII = 0;
var IIIIII = 0;
var StopOrGo=0;
	
var IntervalA;
var startTimeSnap;
var stopTimeSnap=0;
var deltaTimeSnap=0;
var deltaO2O=0;
function StartShoot(){
	if(stopTimeSnap!=0){
		deltaTimeSnap+=(new Date().getTime()-stopTimeSnap);
	}
	else{
		startTimeSnap=new Date().getTime();
	}
	StopOrGo=1;
	$("#btn_control").val('点击停止');
	$("#btn_control").unbind('click');
	$("#btn_control").click(function(){StopShoot();});
}
function StopShoot(){
	stopTimeSnap=new Date().getTime();
	StopOrGo=0;
	$("#btn_control").val('点击开始');
	$("#btn_control").unbind('click');
	$("#btn_control").click(function(){StartShoot();});
}
function checkW(){
    if (StopOrGo == 1) {
        DrawTime();
	goFlowAnimation();
	AddNewBlock();
	//timeLine_Now+=timeAddIndex;
	var nn=new Date().getTime()-startTimeSnap-deltaTimeSnap;
	deltaO2O=(nn-timeLine_Now)/timeAddIndex;
	timeLine_Now=nn;
}
}
function DrawTime() {
    var html = TrimTime(timeLine_Now / 1000) + "/" + TrimTime(parseInt(PdA[PdA.length - 1].attr[0]));
    $('#timeLine').html(html);
}
function TrimTime(S) {
    var miao = S % 60;
    var fen = (S - miao) / 60;
    miao=Math.floor(miao);
    if (miao< 10)
        miao = "0" + miao;
    if (fen<10)
        fen = "0" + fen;
    return fen + ":" + miao;
}
function AddNewBlock() {
    var nowI = 0;
    while (timeLine_Now / 1000 >= parseFloat(PdA[nowI].attr[0]) && nowI < PdA.length) {
        if (!PdA[nowI].isShow) {
            if (PdA[nowI].attr[1] == 1) {
                var CanGO = getZhaiCanGo();
                if (CanGO >= 0) {
                    var speed = Math.floor((Math.random() * 1.5 + 1)*100)/100;
                    $('#MaskX').append('<div id="p' + PdA[nowI].id + '" z="' + CanGO + '" speed="' + speed + '" type="' + PdA[nowI].attr[1] + '" class="s_p" style="position:absolute;left:' + W + 'px;top:' + CanGO * zhai_X + 'px;white-space:nowrap;" >' + PdA[nowI].content + '</div>');
                    PdA[nowI].isShow = true;
					//PdA.remove(nowI);
                }
            }
            else if (PdA[nowI].attr[1] == 5) {
                var CanGO = getZhai5CanGo();
                if (CanGO >= 0) {
                    var speed = Math.floor(Math.random() * 2 + 1);
                    $('#MaskX').append('<div id="p' + PdA[nowI].id + '" z="' + CanGO + '" timeleft="150" type="' + PdA[nowI].attr[1] + '" class="s_p" style="position:absolute;left:' + (W/2 - 4 * PdA[nowI].content.length) + 'px;top:' + CanGO * zhai_X + 'px;white-space:nowrap;" >' + PdA[nowI].content + '</div>');
                    PdA[nowI].isShow = true;
                }
            }
        }
 
        //console.log(nowI);
        nowI++;
    }
}
function goFlowAnimation(){
	var Arr=$('#MaskX .s_p');
	$(Arr).each(function(){
	    if ($(this).attr("type") == "1") {
	        var left = parseFloat($(this).css("left")) - 4* deltaO2O* (parseFloat($(this).attr("speed")));
	        var Zi = parseInt($(this).attr('z'));

	        $(this).css({ "left": left + "px" });
	        if (left + $(this).width() < -5) {
	            $(this).remove();
	            if (Zi >= 0)
	                zhai[Zi] = 0;
	        }
	        else if (left + $(this).width() < W - 110) {
	            $(this).attr({ 'z': -1 });
	            if (Zi >= 0)
	                zhai[Zi] = 0;
	        }
	    }
	    else if ($(this).attr("type") == "5") {
	        var timeleft = parseInt($(this).attr("timeleft"));
	        //console.log(timeleft);
	        timeleft--;
	        if (timeleft < 0) {
	            var Zi = parseInt($(this).attr('z'));
	            $(this).remove();
	            if (Zi >= 0)
	                zhai5[Zi] = 0;
	        }
	        else
	            $(this).attr({ "timeleft": timeleft });
	    }
	});
}
 
function getZhaiCanGo() {
    if (IIIIII > 3) {
        IIII = 0;
    }

	for(var i=0;i<zhai_L;i++){
		var index=IIII+i;
		index=(index>zhai_L?zhai_L-index:index);
		if (zhai[index] == 0) {
		    zhai[index] = 1;
		    IIII = index;
		    if (IIII = IIIII)
		        IIIIII++;
		    else {
		        IIIIII = 0;
		        IIIII = IIII;
		    }
			return index;
		}
	}
	return -1;
}
function getZhai5CanGo() {
    for(var i=0;i<zhai_L;i++){
        if (zhai5[i] == 0) {
            zhai5[i] = 1;
            return i;
        }
    }
    return -1;
}
 
function XmlTOObj(data){
	var objList=[];
	var id=1;
	$(data).find('d').each(function(){
		var obj={};
		obj.id=id;
		id++;
		obj.attr=$(this).attr('p').split(',');
		obj.content=$(this).html();
		obj.position={x:W,y:0};
		obj.isShow=false;
		objList.push(obj);
	});
	objList=SortObj(objList);
	return objList;
}
function SortObj(arr){
var i=arr.length,j;
var tempExchangVal;
while(i>0)
{
for(j=0;j<i-1;j++)
{
if(parseFloat(arr[j].attr[0])>parseFloat(arr[j+1].attr[0]))
{
tempExchangVal=arr[j];
arr[j]=arr[j+1];
arr[j+1]=tempExchangVal;
}
}
i--;
}
return arr;
}

var AAAA=setInterval('AAAAGO()',1000);
function AAAAGO(){
console.log(dan_init_GO);
	if(dan_init_GO=1){
		Init();
		clearInterval(AAAA);
	}
}



$('body').mouseup(function(e){
	console.log(e.pageX+" "+e.pageY);
	var X=e.pageX;
	var X2=$('#MaskX').offset().left;
	var Y=e.pageY;
	var delta=X-X2;
	var deltaY=Y-$('#MaskX').offset().top-$('#MaskX').height();
	console.log(delta,deltaY)
	if(delta>10&&delta<$('#MaskX').width()-10&&deltaY>0&&deltaY<18){
		var nn=new Date().getTime()-startTimeSnap-deltaTimeSnap;
		var wantToGO=parseInt(PdA[PdA.length - 1].attr[0])*(delta-15)*1000/($('#MaskX').width()-30);
		var timeDelta=wantToGO-nn;
		deltaTimeSnap-=timeDelta;
		
		ShotReset();
	}
	else if(deltaY>18&&deltaY<48&&delta>10&&delta<45){
		if(StopOrGo==1){
			StopShoot();
		}
		else{
			StartShoot();
		}
	}
});

function ShotReset(){
	$('#MaskX').html("");
	var nn=new Date().getTime()-startTimeSnap-deltaTimeSnap;
	for(var i=0;i<PdA.length;i++){
		if(parseFloat(PdA[i].attr[0])<nn/1000-2){
			PdA[i].isShow=true;
		}
		else{
			PdA[i].isShow=false;
		}
	}
	for(var i=0;i<zhai.length;i++){
		zhai[i]=0;
		zhai5[i]=0;
	}
	
	//console.log(PdA);
}