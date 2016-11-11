(function($){
	google.load('feeds', '1');
	function init(){
		/* settings */
		var feedURL   = 'http://www.osaka-eco.ac.jp/contents/ecobiyori/feed/?post_type=emergency';
		var container = document.getElementById('emergencyContents');
		var tags = {
			wrapper: 'dl',
			title  : 'dt',
			text   : 'dd'
		}
		/* end settings */

		var stamp = Math.floor( new Date().getTime() / 1000 );
		    feedURL = feedURL + '&stamp=' + stamp; //stampはキャッシュ対策 ※ココログの場合は&を?に変える。
		var feed = new google.feeds.Feed(feedURL);
		var fragment = document.createDocumentFragment();
		var containerWrapper = document.createElement(tags['wrapper']);
		containerWrapper.className = 'emergencyList';

		feed.setNumEntries(1);  //表示させる記事数はここで調整
		feed.load(displayFeed);

		function displayFeed(result){
			if(result.feed.entries.length === 0){
				$(container).remove();
				return false;
			}
			if(!result.error){
				var i;
				var len = result.feed.entries.length;
				var entry,title;

				/* feedの中身を拾う */
				for(i = 0; i < len; i = (i+1)|0){
					entry = result.feed.entries[i];
					title = entry.title;
					content = entry.content;
					contents = createElements(title, content, fragment);
				}
				containerWrapper.appendChild(fragment);
				container.appendChild(containerWrapper);
			}
			/* dl.emergencyListの中身をつくる関数 */
			function createElements(title, content, fragment){
				var titleTag = document.createElement(tags['title']);
				var textTag  = document.createElement(tags['text']);
				titleTag.className = 'emergencyList_title';
				textTag.className  = 'emergencyList_text';
				titleTag.innerHTML = title;
				textTag.innerHTML  = content;
				fragment.appendChild(titleTag);
				fragment.appendChild(textTag);
				return fragment;
			}
		}
	}
	google.setOnLoadCallback(init);
}).call(this, jQuery);