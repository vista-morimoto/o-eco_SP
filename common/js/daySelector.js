$(function() {
	//セレクターキャッシュ
	var HtmlBody = $("html,body");
	var eventcash = $("#EventWrapper");
	var oneeventcash = $("#EventWrapper div.OneEvent");
	var searchDays = $("#SearchDay li");

	// すべて見るボタンは一旦非表示
	$(".LookAll",eventcash).hide();
	
	//Specialアイコンの表示
	$(".Special").append("<img src='img/icoSpecial.png' alt='スペシャルメニュー' class='icoSpecial' />");

	// 種類から選ぶ
	$("div#SearchBox .searchCat").click(function() {
		var dispCategory = $(this).attr("data-id");
		var dispCategoryS = "." + dispCategory;
		
			if ($.browser.msie && $.browser.version < 9){ 
				//IE8以下
					$("div.OneEvent").hide();
					$("h3",eventcash).hide();
					
					$("div.OneEvent").filter("." + dispCategory).show();
					$("h3",dispCategoryS).show();
					
					$("h3",oneeventcash).hide();
					$(".LookAll",eventcash).show();
				}else{
				//それ以外
					//$("#EventWrapper > div").fadeOut("slow");
					//$(dispCategoryS).fadeIn("slow");
					$("div.OneEvent").fadeOut("slow");
					$("h3",eventcash).fadeOut("slow");

					$("div.OneEvent").filter("." + dispCategory).fadeIn("slow");
					$("h3",dispCategoryS).show();
					
					$("h3",oneeventcash).hide();
					$(".LookAll",eventcash).show();
				}		
		
		
		HtmlBody.animate({ scrollTop: $(eventcash).offset().top }, 'slow','swing');		 
		$("#SelectTit").html("<strong>"+$(this).attr("title")+"</strong>のイベントを表示しています");
		$("#SelectTit").fadeIn("slow");
	});	
	
	//クリック時の背景色
	$("div#SearchBox #btnTrimmer").click(function(){
		$("#SelectTit").css("background-color","#FFB039");
	});		
	$("div#SearchBox #btnNurse").click(function(){
		$("#SelectTit").css("background-color","#FE7C97");
	});		
	$("div#SearchBox #btnTrainer").click(function(){
		$("#SelectTit").css("background-color","#6EB8DB");
	});//			
	
	//全部見る
	$(".LookAll",eventcash).click(function(){
		if ($.browser.msie && $.browser.version < 9){ 
			//IE8以下
			oneeventcash.show();
			$("h3",oneeventcash).hide();
			$("#EventWrapper > div > h3").show(); 
		  }else{
			//それ以外
			oneeventcash.fadeIn("slow");
			$("h3",oneeventcash).fadeOut("slow");
			$("#EventWrapper > div > h3").fadeIn("slow");
			
			}		
		$(".LookAll",eventcash).hide();
		$("#SelectTit").fadeOut("slow");		
		HtmlBody.animate({ scrollTop: $(eventcash).offset().top }, 'slow','swing');		 
	});//	

	// フィルターされたコンテンツへの直接アクセス
	var url = document.URL;
	if (url.indexOf("#") != -1) {
		var anotation = url.substr(url.indexOf("#") + 1);
		if (anotation.indexOf("/") == -1) {
		// 日付ではない場合
			$("div#SearchBox .searchCat[data-id='" + anotation + "']").trigger("click");
		} else {
		// 日付の場合
			$("div#SearchDay li[data-id='" + anotation + "']").trigger("click");
		}
	}

});