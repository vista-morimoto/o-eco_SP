/* �Đ����X�g ID*/
var PLAYLIST_ID="PLRl1aQqhyuwxCLsRVflo02zjJ54P0g3MA";

/* �J���L�[ */
var APIKEY="AIzaSyAdWWMU1MpNBiBHHWztGjztwClcnFaniUE";

/* �ő�\���� */
var max_num=9;

var pageToken="",s="";
var allcnt=0,j=0,totalResults=0,resultsPerPage=0,total=0;
var content_cnt=0;

/* GoogleAPI���[�h��ɌĂяo����� */
window.onJSClientLoad = function() {
   gapi.client.setApiKey(APIKEY);
   gapi.client.load('youtube', 'v3', makeRequest);
};
var requestOptions = {
   playlistId:PLAYLIST_ID,
   part:"id, snippet, contentDetails, status"
};
   
/* API���N�G�X�g */
function makeRequest(){
   if(pageToken){
      requestOptions.pageToken=pageToken;
   }
   var request=gapi.client.request({
      mine:"",
      path:"/youtube/v3/playlistItems",
      params:requestOptions
   });
   request.execute(function(resp) {
      if(resp.error){
         $("#message").html(resp.error.message);
      }else{
         output(resp,pageToken);
      }
   });
}

/* HTML�o�� */
function output(resp,pageTokenFLG){
   pageToken=resp.nextPageToken;
   if(pageTokenFLG==""){
      var pageInfo=resp.pageInfo;
      resultsPerPage=resp.pageInfo.resultsPerPage; /* API���X�|���X�Ɋ܂܂�錋�ʂ̐� */
      totalResults=resp.pageInfo.totalResults; /* ���ʃZ�b�g���̌��ʂ̍��v�� */
      total=Math.floor(totalResults/resultsPerPage);
      if(totalResults<=resultsPerPage){
         total=1;
      }else if(totalResults%resultsPerPage!=0){
         total++;
      }
   }
   itemOutput(resp.items);
   allcnt++;
   if(allcnt<total){
      makeRequest();
   }
   else{
      $("#youtubeList").append(s);
   }
}
function itemOutput(items){
   $.each(items, function(i, item){
      j=(allcnt*resultsPerPage)+i+1;
      var status=item.status;
      var privacy_status=status.privacyStatus;
      /* contentDetails */
      if(item.contentDetails && content_cnt<max_num){
         if(privacy_status=="public"){
            var contentDetails=item.contentDetails;
            s+='<div class="video_s">';
            s+=(contentDetails.videoId)?'<iframe src="//www.youtube.com/embed/'+contentDetails.videoId+'?rel=0" frameborder="0" allowfullscreen></iframe>':'';
            s+='</div>';
            content_cnt++;
         }
      }
      else {
         return false;
      }
   });
}
