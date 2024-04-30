<?php

$MAX_RESULTS=7;

$result=array();
$allfiles = scandir('./');

if(!$_POST['query']){
	$result["status"]="error";
	$result["message"]="no search query";
}else{
	
	$query=strtolower($_POST['query']);
	$counter=0;
	$found=array();
	foreach ($allfiles as $file) {
		if($counter==$MAX_RESULTS){
			break;
		}
		if (strstr( strtolower($file), $query) && strstr( strtolower($file) , ".png")) {
			$found[]=$file;
			$counter+=1;
		}
	}
	$result["status"]="ok";
	$result["results"]=(count($found)==0) ? null : $found;
	
}


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS, PATCH, DELETE');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Authorization, Content-Type, x-xsrf-token, x_csrftoken, Cache-Control, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');
echo json_encode($result);

?>