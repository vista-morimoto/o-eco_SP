(function($){
	"use strict";
  $(function(){
    /* -----------------------------------------------------------------------
    ## 無限スクロール ########################################################
    ----------------------------------------------------------------------- */
    $('.DogPhotos, .AnimalPhotos').infinitescroll({
      navSelector  : ".navigation",
      nextSelector : ".navigation a",
      itemSelector : "li",
      loading: {
        img: '//osaka-eco.ac.jp/campus/img/loading.gif',
        msgText: ''
      },
      appendCallback: true,
      maxPage: $('.navigation li').size() + 1
    }, function(li, opt){
      //最終ページを読み込んだらボタンを非表示に。
      if(opt.maxPage === opt.state.currPage) $('.infinitBtn').hide();
    });

    //スクロールでの実行を止めて、ボタンをクリックでコンテンツを読み込む。
    $('.DogPhotos, .AnimalPhotos').infinitescroll('unbind');
    $('.infinitBtn').bind('click', function(e){
      e.preventDefault();
      $('.DogPhotos, .AnimalPhotos').infinitescroll('retrieve');
    });

  });
}).call(this, jQuery);