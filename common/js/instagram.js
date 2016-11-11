// JavaScript Document
(function($) {
$(function(){

			"use strict";
		var $container = $("#insta");
		var html = "";
	
		$.ajax({
			url: "instagram.php",//PHPファイルのURL
			type:"POST",
			dataType: "json"
		}).done(function(data){
			//通信成功時の処理
			$.each(data.data,function(i,item){
				var imgurl = item.images.low_resolution.url; //低解像度の画像のURLを取得
				var link = item.link; //リンクを取得
				//html += "<li class='instali'><a href='" + link + "' target='_blank'><img src='" + imgurl + "'></a></li>";
							html += "<li class='list list_insta list_insta_0'><a href='" + link + "' target='_blank'><img src='" + imgurl + "'></a></li>";
							//console.log(item); //取得できるデータ　確認用
			});
					
		}).fail(function(){
			//通信失敗時の処理
			html = "<p>画像を取得できません。</p>";
		}).always(function(){
			//通信完了時の処理
			$container.html(html);
					//var instaw = $("#insta li").width(); liの横幅取得
					//$('.instali').css("height", instaw + "px"); liの横幅を縦幅に代入
		});
			
   
});
})(jQuery);
