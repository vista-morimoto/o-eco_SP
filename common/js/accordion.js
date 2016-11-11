$(document).ready(function(){
	$(".list").css("display" , "none");
	$(".title").click(function(){
		if($("+.list" , this).css("display") == "none"){
			$(".list").slideUp("fast");
			$("+.list" , this).slideDown("fast");
		}
		else{
			$("+.list" , this).slideUp("fast");
		}
	});
});