// JavaScript Document
$(function() {
	
	function lowerAndroid(n) {
	var bo = false;
	var ua = navigator.userAgent.toLowerCase();
	var version = ua.substr(ua.indexOf('android')+8, 3);
	if(ua.indexOf("android")) if(parseFloat(version) < n) bo = true;
	return bo;
	}
	
	var siteMenu = $("#hd_links li:first-child");		
	
	if(lowerAndroid(2.3)){
	//Android 2.3以下の場合実行;
	//alert("ようこそ！");

	$(siteMenu).css("display", "none");

	}
});
