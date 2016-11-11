var xmlUrl = [      //feedのURL, 表示させるID
    ["http://www.osaka-eco.ac.jp/contents/ecobiyori/feed","feed_ecobiyori"],
    ["http://www.osaka-eco.ac.jp/contents/animalnurse/feed","feed_animalnurse"],
    ["http://www.osaka-eco.ac.jp/contents/zookeeper/feed","feed_zookeeper"],
    ["http://www.osaka-eco.ac.jp/contents/happy/feed","feed_happy"],
    ["http://www.osaka-eco.ac.jp/contents/salon/feed","feed_salon"],
];
 
var setNum = 1;  //表示件数
google.load("feeds", "1");
 
function initialize() {
    for(var k = 0; k < xmlUrl.length; k++){
        feedAdd(xmlUrl[k][0],xmlUrl[k][1]);
    }
}
 
function feedAdd(rssUrl, rssID) {
    var feed = new google.feeds.Feed(rssUrl);
    var html = '';
    feed.setNumEntries(setNum);
    feed.load(function(result) {
        if (!result.error){
            for (var i = 0; i < setNum; i++) {
                var entry = result.feed.entries[i];
                var titleSnippet = entry.title;    //記事タイトル取得
				if (titleSnippet.length > 28) {
				title = titleSnippet.substr(0, 28) + '…';
				}else{
				title = entry.title;
				}
				var contentSnippet = entry.contentSnippet;
				text = contentSnippet.substr(0, 110) + '…';
                //日付を取得し年月日を整形
                var publishedDate = entry.publishedDate;
                var pubDD = new Date(publishedDate);
                yy = pubDD.getYear();if (yy < 2000) { yy += 1900; }
                mm = pubDD.getMonth() + 1;dd = pubDD.getDate();
                var pubDate = yy +'年'+ mm +'月'+ dd +'日';
                //画像　無ければno-img
				var noPhoto = ("<img  src='http://www.osaka-eco.ac.jp/blog/img/no-img.png' />");
				var entryImg = "";
				var imgCheck = entry.content.match(/(src="http:)[\S]+((\.jpg)|(\.JPG)|(\.jpeg)|(\.JPEG)|(\.png)|(\.PNG))/);
				if(imgCheck){
					entryImg += '<img ' + imgCheck[0] + '" >';
					} else {
						entryImg += noPhoto;
				}
 
                //html生成
                html += '<a class="blog-md-wrap" href="' + entry.link + '"><div class="blog-image">' + entryImg + '</div><dl class="blog-md"><dd class="date">' + pubDate + '</dd><dt class="title">'+title+'</dt><dd class="text">' + text + '</dd></dl></a>';
            }
            //フィードの出力
            var container = document.getElementById(rssID);
            container.innerHTML = html;
        }
    });
}
google.setOnLoadCallback(initialize);