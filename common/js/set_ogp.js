(function(){
	function appendMetaInfo (_type, _value){
		metatags = document.getElementsByTagName("meta");
		if(metatags.length > 0){
			for (i = 0; i < metatags.length; i++){
				if( _type == metatags[i].getAttribute("property") ){
					metatags[i].content=_value;
					return true;
				} else if( _type == metatags[i].getAttribute("name") ) {
					metatags[i].content=_value;
					return true;
				}
			}
		}
		var headerObj = document.getElementsByTagName("meta")[0];
		var head = document.getElementsByTagName("head")[0];
		var metaObj=document.createElement('meta');
		if(_type.indexOf('twitter') != -1){
			metaObj.setAttribute('name', _type);
		} else {
			metaObj.setAttribute('property', _type);
		}
		metaObj.content=_value;
		head.appendChild(metaObj);
	}

	function getDescription(){
		var head = document.getElementsByTagName('head')[0];
		var metas = head.getElementsByTagName('meta');
		var metaLength = metas.length;
		var name;
		var description = 'ドッグ、動物、海洋、環境、フラワーの総合専門学校。ペットトリマー、動物看護師、アニマルセラピー、ドッグカフェ、ペットファッション、動物園飼育、水族館スタッフ、ドルフィントレーナー、野生動物、海洋生物、ブライダルフラワー、フローリストなど様々な職業を目指す専門学校。';
		for(var i = 0; i < metaLength; i++){
			name = metas[i].getAttribute('name');
			if(!!name && name.toLowerCase() === 'description'){
				description = metas[i].getAttribute('content');
				break;
			}
		}
		return description;
	}

appendMetaInfo( "twitter:description", getDescription());
appendMetaInfo( "og:title", document.title );
appendMetaInfo( "og:description", getDescription());
appendMetaInfo( "og:type", "article" );
//appendMetaInfo( "og:image", "imageURL" );
appendMetaInfo( "og:url", window.location);
})();