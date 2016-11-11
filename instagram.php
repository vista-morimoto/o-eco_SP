<?php

//大阪ECO動物海洋専門学校 @osaka_eco
//User ID: 2201667588

//POSTリクエストの場合のみ受付
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    //アクセストークン
    $access_token = "2201667588.df785ae.4777b371b6c44f64a01012f1bbbcdc18";
	//ユーザーID
	$user_id ="2201667588";
   //表示件数
	$count ="9";

    //JSONデータを取得して出力
    //echo @file_get_contents("https://api.instagram.com/v1/users/self/media/recent/?access_token={$access_token}");
    echo @file_get_contents("https://api.instagram.com/v1/users/{$user_id}/media/recent/?access_token={$access_token}&count={$count}");
    //終了
    exit;
}
?>
