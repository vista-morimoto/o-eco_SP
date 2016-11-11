(function(){
	var ua = navigator.userAgent.toUpperCase();
	if(
		!(ua.indexOf('IPHONE') != -1 || (ua.indexOf('ANDROID') != -1 && ua.indexOf('MOBILE') != -1))
		){
		location.href = 'http://www.osaka-eco.ac.jp/';
	}
}());
