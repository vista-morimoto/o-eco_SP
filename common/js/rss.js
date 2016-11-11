var xmlUrl = [      //feed��URL, �\��������ID
    ["http://www.osaka-eco.ac.jp/contents/ecobiyori/feed","feed_ecobiyori"],
    ["http://www.osaka-eco.ac.jp/contents/animalnurse/feed","feed_animalnurse"],
    ["http://www.osaka-eco.ac.jp/contents/zookeeper/feed","feed_zookeeper"],
    ["http://www.osaka-eco.ac.jp/contents/happy/feed","feed_happy"],
    ["http://www.osaka-eco.ac.jp/contents/salon/feed","feed_salon"],
];
 
var setNum = 1;  //�\������
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
                var titleSnippet = entry.title;    //�L���^�C�g���擾
				if (titleSnippet.length > 28) {
				title = titleSnippet.substr(0, 28) + '�c';
				}else{
				title = entry.title;
				}
				var contentSnippet = entry.contentSnippet;
				text = contentSnippet.substr(0, 110) + '�c';
                //���t���擾���N�����𐮌`
                var publishedDate = entry.publishedDate;
                var pubDD = new Date(publishedDate);
                yy = pubDD.getYear();if (yy < 2000) { yy += 1900; }
                mm = pubDD.getMonth() + 1;dd = pubDD.getDate();
                var pubDate = yy +'�N'+ mm +'��'+ dd +'��';
                //�摜�@�������no-img
				var noPhoto = ("<img  src='http://www.osaka-eco.ac.jp/blog/img/no-img.png' />");
				var entryImg = "";
				var imgCheck = entry.content.match(/(src="http:)[\S]+((\.jpg)|(\.JPG)|(\.jpeg)|(\.JPEG)|(\.png)|(\.PNG))/);
				if(imgCheck){
					entryImg += '<img ' + imgCheck[0] + '" >';
					} else {
						entryImg += noPhoto;
				}
 
                //html����
                html += '<a class="blog-md-wrap" href="' + entry.link + '"><div class="blog-image">' + entryImg + '</div><dl class="blog-md"><dd class="date">' + pubDate + '</dd><dt class="title">'+title+'</dt><dd class="text">' + text + '</dd></dl></a>';
            }
            //�t�B�[�h�̏o��
            var container = document.getElementById(rssID);
            container.innerHTML = html;
        }
    });
}
google.setOnLoadCallback(initialize);