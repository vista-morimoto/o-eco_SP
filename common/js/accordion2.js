$(document).ready(function() {
	$(".accordion dt").hover(function(){
		$(this).css("cursor","pointer"); 
	},function(){
		$(this).css("cursor","default"); 
		});
	$(".accordion dd").css("display","none");
	$(".accordion dt").click(function(){
		$(this).next().slideToggle("fast");
		});
});