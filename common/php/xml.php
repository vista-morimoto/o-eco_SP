<?php
//$_POST['url'] = '';
	if (isset($_POST["url"])) {
		$url = $_POST["url"];
		try {
			$xml = simplexml_load_file($url,'SimpleXMLElement',LIBXML_NOCDATA);
			$contents = array(
				'feed' => array(
					'title' => (string)$xml->channel->title,
					'entries' => array()
				)
			);
			$i = 0;
			foreach ($xml->channel->item as $item) {
				$contents['feed']['entries'][$i] = array(
					'title'          => (string)$item->title,
					'publishedDate'  => (string)$item->pubDate,
					'category'       => (string)$item->category,
					'link'           => (string)$item->link,
					'content'        => (string)$item->children('content',true)->encoded,
					'contentSnippet' => (string)strip_tags($item->children('content',true)->encoded)
				);
				$i++;
			}
			echo json_encode($contents);
		} catch(Exception $e){
		}
	}
