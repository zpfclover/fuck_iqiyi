var titleStr=$(document).attr('title');
titleStr=titleStr.match(/[^-]*/)[0];
var bgm=titleStr.split(' ');
var bgmName=bgm[0];
var bgmNum=titleStr.split(' ')[1].match(/[0-9]+/)[0];

function Init(){
//$.get('http://zpf522.vip1.3000idc.com/jsonLoad.aspx?bgmName='+bgmName+'&bgmNum='+bgmNum,function(data){
$.get('http://zpf522.vip1.3000idc.com/jsonLoad.aspx?bgmName='+bgmName+'&bgmNum='+bgmNum,function(data){
	getXMLShoot(data);
});
}

var offset=$('.player-dsj').offset();
var X=0;
var Y=0;
if(offset!=null){
var X=$('.player-dsj').offset().left;
var Y=$('.player-dsj').offset().top+12;
}
var H=$('.player-dsj').height();
var W=$('.player-dsj').width();
H=(H==null?400:H);
W=(W==null?600:W);
var postionStyle="width:"+W+"px;height:"+H+"px;position:absolute;top:"+Y+"px;left:"+X+"px;";
//alert(X+" "+Y+" "+W+" "+H);

$('body').append('<div id="MaskX" style="'+postionStyle+'color:#fcfcfc;font-size:18px;font-weight:bold;text-shadow:1px 1px 5px #111"></div>');
$('#MaskX').append('<input id="btn_control" type="button" value="加载中" style="position:absolute;left:-120px;bottom:5px;z-index:20;" disabled="disabled" />')

function getXMLShoot(url){
$.get(url,function(data){
	var O=XmlTOObj(data);
	console.log(O);
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
console.log(zhai_L);
for(var i=0;i<zhai_L;i++)
	zhai.push(0);
var IIII=0;
var StopOrGo=0;
	
var IntervalA;
function StartShoot(){
	StopOrGo=1;
	$("#btn_control").val('点击停止');
	$("#btn_control").unbind('click');
	$("#btn_control").click(function(){StopShoot();});
}
function StopShoot(){
	StopOrGo=0;
	$("#btn_control").val('点击开始');
	$("#btn_control").unbind('click');
	$("#btn_control").click(function(){StartShoot();});
}
function checkW(){
if(StopOrGo==1){
	goFlowAnimation();
	AddNewBlock();
	timeLine_Now+=timeAddIndex;
}
}
function AddNewBlock(){
	var nowI=0;
	while(timeLine_Now/1000>=parseFloat(PdA[nowI].attr[0])&&nowI<PdA.length){
		if(!PdA[nowI].isShow){
			var CanGO=getZhaiCanGo();
			if(CanGO>=0){
				$('#MaskX').append('<div id="p'+PdA[nowI].id+'" z="'+CanGO+'" class="s_p" style="position:absolute;left:'+W+'px;top:'+CanGO*zhai_X+'px;white-space:nowrap;" >'+PdA[nowI].content+'</div>');
				PdA[nowI].isShow=true;
			}
			//console.log(nowI);
		}
		nowI++;
	}
}
function goFlowAnimation(){
	var Arr=$('#MaskX .s_p');
	$(Arr).each(function(){
	//console.log($(this).css("left"));
		var left=parseInt($(this).css("left"))-4;
		var Zi=parseInt($(this).attr('z'));
		
		$(this).css({"left":left+"px"});
		if(left+$(this).width()<-5){
			$(this).remove();
			if(Zi>=0)
				zhai[Zi]=0;
		}
		else if(left+$(this).width()<W-110){
			$(this).attr({'z':-1});
			if(Zi>=0)
				zhai[Zi]=0;
		}
	});
}
 
function getZhaiCanGo(){
	for(var i=0;i<zhai_L;i++){
		//var index=IIII+i;
		//index=(index>zhai_L?zhai_L-index:index);
		if(zhai[i]==0){
			zhai[i]=1;
			//IIII=index;
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





Init();