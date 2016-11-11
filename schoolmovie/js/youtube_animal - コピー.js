// JavaScript Document

$(function() {
 var isIE=false;
 if(navigator.userAgent.toLowerCase().indexOf("msie")!=-1) isIE=true;
 if(isIE){
   var url="http://gdata.youtube.com/feeds/api/playlists/PLRl1aQqhyuwxCLsRVflo02zjJ54P0g3MA?alt=json-in-script&callback=getList";
   var script = document.createElement("script");
   script.setAttribute("type", "text/javascript");
   script.setAttribute("src", url);
   document.getElementsByTagName("head")[0].appendChild(script);
}else{
	$.getJSON(
		//学校のYoutubeユーザーを指定
		"http://gdata.youtube.com/feeds/api/playlists/PLRl1aQqhyuwxCLsRVflo02zjJ54P0g3MA?alt=json", /* 日本 */
		{
		   v:2,
		   alt:"json"
		},
	  function(xml) {
		 getList(xml);
	  }
   );
}
});
/* IE判定 */
var browser = function() {
var ua = navigator.userAgent;
return {
 ie: ua.match(/MSIE\s([^;]*)/)
};
}();
/* 日付フォーマット */
var timeAgo = function(dateString) {
var rightNow = new Date();
var then = new Date(dateString);
 var isIE=0;
 if(navigator.userAgent.toLowerCase().indexOf("msie")!=-1) isIE=1;
if (isIE) {
   var dary=dateString.split("-");
   var year=dary[0];
   var month=dary[1];
   var day=dary[2].substring(0,2);
   var _tary=dateString.split("T");
   var tary=_tary[1].split(":");
   var hh=tary[0];
   var mm=tary[1];
   var ss=tary[2].substring(0,2);
   var _rightNow=""+rightNow.getFullYear()+"/"+rightNow.getMonth()+"/"+rightNow.getDate()+" "+rightNow.getHours()+":"+rightNow.getMinutes()+":"+rightNow.getSeconds();
   var _then=""+year+"/"+(month-1)+"/"+day+" "+hh+":"+mm+":"+ss;
   var rightNow=new Date(_rightNow).getTime();
   var then=new Date(_then).getTime()+9*60*60*1000; //GMT9:00
}

var diff = rightNow - then;
var second = 1000,
   minute = second * 60,
   hour = minute * 60,
   day = hour * 24,
   week = day * 7;
if (isNaN(diff) || diff < 0) {
   return ""; // return blank string if unknown
}
if(diff < second * 2)            return "いまさっき";
if(diff < minute)               return Math.floor(diff/second)+"秒前";
if(diff < minute * 2)            return "約1分前";
if(diff < hour)                  return Math.floor(diff/minute)+"分前";
if(diff < hour * 2)               return "約1時間前";
if(diff < day)                  return  Math.floor(diff/hour)+"時間前";
if(diff > day && diff < day * 2)   return "きのう";
if(diff < day * 365){
   return Math.floor(diff/day)+"日前";
}else{
   return "1年以上前";
}
}
/* 3桁区切り */
function addFigure(str) {
var num = new String(str).replace(/,/g, "");
while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
return num;
}
function getList(xml){
 $('#load').fadeOut();
 var feed = xml.feed;
 $.each(feed.entry, function(i,item){
	var tmp=item.id.$t.split("video:");
	var vid=tmp[tmp.length-1];
	var s='';
	s+='<dt><a href="'+item.link[0].href+'"><img src="'+item.media$group.media$thumbnail[0].url+'" /></a></dt>';
	s+='<dd>';
	s+='<div class="title"><a href="'+item.link[0].href+'">'+item.title.$t+'</a></div>';
	s+='<p>';
	   s+='作成者：<a href="http://www.youtube.com/user/'+item.author[0].name.$t+'">'+item.author[0].name.$t+'</a>';
	s+='</p>';
	s+='</dd>';
	 $("#youtubeList").append('<dl class="video clearfix heightLine">'+s+'</dl>');
	 $(".video").fadeIn(1000);
 });
}