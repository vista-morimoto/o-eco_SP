/*
======== table of content. =================================

Name: twiline for jQuery
Versiton: 1.4
Description: search and load Twitter feeds and show as line.
Update: 2011/03/28-
Author: Japan Electronic Industrial Arts Co.Ltd.
        http://www.jeia.co.jp/
Using: using jQuery under the GPL license.
Lisence: Released under the GPL and Commercial Licenses.
         When use this under the Commercial License,
         please pay 1,000 yen or follow us.
Twitter: http://twitter.com/jeia3

============================================================
*/

(function($) {
	
	var twiline = function( _$target, _opts) {
		
		// search mode ( 'keyword'/'user' )
		this.mode = ( typeof(_opts[ 'mode' ]) != 'undefined' ) ? _opts[ 'mode' ] : 'keyword';
		
		// search string ( keyword/user account )
		this.search = ( typeof(_opts[ 'search' ]) != 'undefined' ) ? _opts[ 'search' ] : '';
		
		// max load number ( default = 10 )
		this.max = ( typeof(_opts[ 'max' ]) != 'undefined' ) ? _opts[ 'max' ] : 10;
		
		// font size ( px )( default = 12 )
		this.fontsize = ( typeof(_opts[ 'fontsize' ]) != 'undefined' ) ? _opts[ 'fontsize' ] : 12;
		
		// scroll speed ( px )( default = 10 )
		this.speed = ( typeof(_opts[ 'speed' ]) != 'undefined' ) ? _opts[ 'speed' ] : 5;
		
		// show twit time ( 'default'/'before'/'hidden' )
		this.time = ( typeof(_opts[ 'time' ]) != 'undefined' ) ? _opts[ 'time' ] : 'default';
		
		// icon ( selector )
		this.icon = ( typeof(_opts[ 'icon' ]) != 'undefined' ) ? _opts[ 'icon' ] : '';
		
		// link ( selector ... only <a> tag )
		this.link = ( typeof(_opts[ 'link' ]) != 'undefined' ) ? _opts[ 'link' ] : '';
		
		// elements
		this.$target = _$target;
		this.$scroll = null;
		this.now = null;
		this.que = [];
		this.key = 0;
		
		this.lineStyle = {
			'display': 'block',
			'margin': '0px',
			'padding': '0px',
			'position': 'absolute',
			'whiteSpace': 'nowrap',
			'textAlign': 'left',
			'fontSize': this.fontsize + 'px',
			'lineHeight': (this.fontsize + 2) + 'px'
		};
		
		this.init();
		
		return this;
	};
	
	twiline.prototype.twitterURL = 'http://twitter.com/1/';
	twiline.prototype.userStart = 'statuses/user_timeline/';
	twiline.prototype.userEnd = '.json';
	twiline.prototype.parmaStart = '/status/';
	twiline.prototype.searchURL = 'http://search.twitter.com/search.json?result_type=mixed';
	twiline.prototype.frameSpan = 120; // msec
	
	/**
	 * init
	 */
	twiline.prototype.init = function() {
		
		this.$target.css({
			'overflow': 'hidden'
		});
		
		if ( this.$target.css( 'position' ) != 'absolute' ) {
			this.$target.css({
				'position': 'relative'
			});
		}
		
		if ( ! this.$target.height() || this.$target.css('height') == 'auto' ) {
			this.$target.css({
				'height': (this.fontsize + 2) + 'px'
			});
		}
		
		this.request();
	};
	
	/**
	 * request
	 */
	twiline.prototype.request = function() {
		
		var html = '<p class="loading">読み込み中...</p>';
		this.$target.html( html ).
		find( '.loading' ).css( this.lineStyle );
		
		var url = '';
		var data = {};
		
		if ( this.mode == 'user' ) {
			url = [ this.twitterURL, this.userStart, this.search, this.userEnd ].join('');
			data[ 'count' ] = this.max;
		}
		else if ( this.mode == 'keyword' ) {
			url = this.searchURL;
			data[ 'q' ] = this.search;
			data[ 'rpp' ] = this.max;
		}
		
		var o = this;
		
		$.ajax({
			'type': 'GET',
			'url': url,
			'dataType': 'jsonp',
			'cache': false,
			'data': data,
			'success': function( _d ) {
				o.onSuccess( _d );
			},
			'error': function( _d1, _d2, _d3 ) {
				o.onError( _d1, _d2, _d3 );
			}
		});
	};
	
	/**
	 * onSuccess
	 */
	twiline.prototype.onSuccess = function( _d ) {
		
		this.now = new Date();
		
		var list = '';
		
		if ( this.mode == 'user' ) {
			list = _d;
		}
		else if ( this.mode == 'keyword' ) {
			list = _d[ 'results' ];
		}
		
		for ( var i = 0; list[i]; i ++ ) {
			
			var data = {
				'id': list[i][ 'id_str' ],
				'created_at': list[i][ 'created_at' ],
				'text': list[i][ 'text' ],
				'user': '',
				'image': ''
			};
			
			if ( this.mode == 'user' ) {
				data[ 'user' ] = list[i][ 'user' ][ 'screen_name' ];
				data[ 'image' ] = list[i][ 'user' ][ 'profile_image_url' ];
			}
			else if ( this.mode == 'keyword' ) {
				data[ 'user' ] = list[i][ 'from_user' ];
				data[ 'image' ] = list[i][ 'profile_image_url' ];
			}
			
			this.que.push( data );
		}
		
		if ( this.que.length > 0 ) {
			this.showNext();
		}
		else {
			var html = 'つぶやきが見つかりませんでした。';
			this.$target.html( html ).
			find( '.error' ).css( this.lineStyle );
		}
	};
	
	/**
	 * onError
	 */
	twiline.prototype.onError = function( _XMLHttpRequest, _textStatus, _errorThrown ) {
		var html = '<p class="error">TwitterAPIに接続できませんでした。</p>';
		this.$target.html( html ).
		find( '.error' ).css( this.lineStyle );
	};
	
	/**
	 * showNext
	 */
	twiline.prototype.showNext = function() {
		
		// show line
		var html = this.getLine( this.que[ this.key ] );
		
		this.$target.html( html ).
		find( '.twi' ).css( this.lineStyle ).
		find( 'a' ).css({
			'textDecoration': 'none'
		});
		
		this.$scroll = this.$target.find( '.twi' ).eq(0);
		this.$scroll.css({
			'left': this.$target.width() + 'px',
			'top': '0px'
		});
		
		this.floatLine();
		
		// show icon
		if ( this.icon != '' ) {
			this.showIcon( this.que[ this.key ] );
		}
		
		// change link
		if ( this.link != '' ) {
			this.changeLink( this.que[ this.key ] );
		}
		
		// update
		this.key ++;
		
		if ( this.key >= this.que.length ) {
			this.key = 0;
		}
	};
	
	/**
	 * getLine
	 */
	twiline.prototype.getLine = function( _d ) {
		
		var text = _d[ 'text' ];
		var href = this.twitterURL + _d[ 'user' ] + this.parmaStart + _d[ 'id' ];
		var time = '';
		
		switch ( this.time ) {
			case 'default':
				time = this.getTimeText( _d[ 'created_at' ] ) + ' ';
			break;
			
			case 'before':
				time = this.getbeforeTimeText( _d[ 'created_at' ] ) + ' ';
			break;
			
			case 'hidden':
				time = '';
			break;
			
			default:
			break;
		}
		
		var line = [
			'<p class="twi">',
			'<span class="time">',time,'</span>',
			'<a href="',href,'" target="_blank" title="つぶやきを見る">',text,'</a>',
			'</p>'
		].join('');
		
		return line;
	};
	
	/**
	 * getTimeText
	 */
	twiline.prototype.getTimeText = function( _time ) {
		
		var time = '';
		var createdTime = this.str2Date( _time );
		createdTime.setTime( createdTime.getTime() - this.now.getTimezoneOffset() * 60 * 1000 );
		
		time = [
			createdTime.getFullYear(), '/',
			('00' + (createdTime.getMonth()+1)).slice(-2), '/',
			('00' + createdTime.getDate()).slice(-2), ' ',
			('00' + createdTime.getHours()).slice(-2), ':',
			('00' + createdTime.getMinutes().toString()).slice(-2)
		].join('');
		
		return time;
	};
	
	/**
	 * getbeforeTimeText
	 */
	twiline.prototype.getbeforeTimeText = function( _time ) {
		
		var time = '';
		var createdTime = this.str2Date( _time );
		createdTime.setTime( createdTime.getTime() - this.now.getTimezoneOffset() * 60 * 1000 );
		
		var span = this.now - createdTime;
		
		time = Math.floor( span / 1000 );
		
		if ( time < 60 ) {
			return time + '秒前';
		}
		
		time = Math.floor( time / 60 );
		
		if ( time < 60 ) {
			return time + '分前';
		}
		
		time = Math.floor( time / 60 );
		
		if ( time < 24 ) {
			return time + '時間前';
		}
		
		time = Math.floor( time / 24 );
		
		if ( time < 30 ) {
			return time + '日前';
		}
		
		if ( time < 365 ) {
			return Math.floor( time / 30 ) + 'ヶ月前';
		}
		
		return Math.floor( time / 365 ) + '年前';
	};
	
	/**
	 * str2Date
	 */
	twiline.prototype.str2Date = function( _str ) {
		var dateStr = '';
		var dateArray = _str.split( ' ' );
		
		if ( this.mode == 'user' ) {
			// fotmat: Sun Jan 01 00:00:00 +0000 2010
			dateStr = [
				dateArray[1], ' ',
				dateArray[2], ', ',
				dateArray[5], ' ',
				dateArray[3]
			].join('');
		}
		else if ( this.mode == 'keyword' ) {
			// format: Sun, 01 Jan 2010 00:00:00 +0000
			dateStr = [
				dateArray[2], ' ',
				dateArray[1], ', ',
				dateArray[3], ' ',
				dateArray[4]
			].join('');
		}
		
		return new Date( dateStr );
	};
	
	/**
	 * floatLine
	 */
	twiline.prototype.floatLine = function() {
		
		var o = this;
		var x = this.$scroll.offset().left - this.$target.offset().left;
		
		if ( this.$scroll.width() + x > 0 ) {
			this.$scroll.css({
				'left': ( x - this.speed ) + 'px'
			});
			
			setTimeout( function(){ o.floatLine(); }, this.frameSpan );
		}
		else {
			this.showNext();
		}
	};
	
	/**
	 * showIcon
	 */
	twiline.prototype.showIcon = function( _d ) {
		
		var $icon = $( this.icon ).eq(0);
		var href = this.twitterURL + _d[ 'user' ];
		
		if ( $icon.length > 0 && _d[ 'image' ] ) {
			$icon.html( [
				'<a href="',href,'" target="_blank" title="',_d[ 'user' ],'">',
				'<img src="',_d[ 'image' ],'" alt="',_d[ 'user' ],'" />',
				'</a>'
			].join('') ).
			find( 'a' ).css({
				'margin': '0px',
				'padding': '0px'
			}).
			find( 'img' ).css({
				'border': '0px'
			}).hide().
			unbind().bind( 'load', function( _e ) {
				var max = $icon.width();
				
				if ( $icon.height() > 0 && $icon.height() < max ) {
					max = $icon.height();
				}
				if ( max < $(this).width() ) {
					$(this).width( max ).height( max );
				}
				
				$(this).fadeIn();
			});
		}
	};
	
	/**
	 * changeLink
	 */
	twiline.prototype.changeLink = function( _d ) {
		
		var $link = $( this.link );
		var href = this.twitterURL + _d[ 'user' ];
		
		if ( $link.length > 0 ) {
			$link.
			attr( 'href', href ).
			attr( 'title', _d[ 'user' ] + 'をフォローする' );
		}
	};
	
	/**
	 * extend to jQuery
	 */
	$.fn.extend({
		twiline: function(_opts) {
			return new twiline( this, _opts );
		}
	});
	
})(jQuery);
