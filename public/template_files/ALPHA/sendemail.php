

<?php  


//whether ip is from share internet
if (!empty($_SERVER['HTTP_CLIENT_IP']))   
  {$ip_address = $_SERVER['HTTP_CLIENT_IP'];}
//whether ip is from proxy
elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))  
 {
	 $ip_address = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
  $ip_address = trim($ip_address[0]);
  
  }
//whether ip is from remote address
else
  {$ip_address = $_SERVER['REMOTE_ADDR'];}
// echo $ip_address;

//IP ADDRESS END

//DON'T CHANGE THIS CODE (Data Get From LP)
$URL = urlencode( $_SERVER['HTTP_REFERER'] );
$camp_id = "EU-ITBP-".$_POST["camp_id"];
$firstname = $_POST["firstname"];

$temp = implode(",", $_POST["data"]);
$temp = $firstname.','.$temp;
$pattern = '/[a-z0-9_\-\+\.]+@[a-z0-9\-]+\.([a-z]{2,4})(?:\.[a-z]{2})?/i';
preg_match_all($pattern, $temp, $matches);
$email = array_shift($matches[0]);
//DON'T CHANGE THIS CODE END

$ENDURL = "##BASE_URL####LINK_NAME##-thankyou.html";

$subject = '##EMAIL_SUBJECT_LINE##';

$bodyD = "<table>
				
				 <tr><td>Dear&nbsp;<b>$firstname,<b></td></tr>
				 <tr><td>&nbsp;</td></tr>
				  <tr><td>Thank you for registering for content provided by ##SPONSOR_NAME##. Please share it with your colleagues (no registration required).</td></tr>
				 <tr><td>&nbsp;</td></tr>
				 <tr><td>&nbsp;</td></tr>
				 <tr><td>
				 <a href='##ASSET_URL##'><img src='##THUMBNAIL_URL##' width='40%'></a>
				 </td></tr>
				 <tr><td>&nbsp;</td></tr>
				
				 
				 
				 <tr><td>You can learn more by visiting  <a href='https://##SPONSOR_LINK##/'>##SPONSOR_LINK##</a>.</td></tr>
				 <tr><td>&nbsp;</td></tr>
				 
				 <tr><td>
					<a href='https://##SPONSOR_LINK##/'><img src='##LOGO_URL##' width='20%' alt='##SPONSOR_NAME##'></a></a>
				</td></tr>
				 <tr><td>&nbsp;</td></tr>
				 <tr><td>&nbsp;</td></tr>
				 
				 <tr><td>Sincerely,</td></tr>
				 <tr><td>The IT Business Plus Fulfillment Team </td></tr>

				 
				 </table>"; 


	$arrContextOptions=array(
      "ssl"=>array(
            "verify_peer"=>false,
            "verify_peer_name"=>false,
        ),
	); 

	
	$data=array();
	$data["email"]=$email;
	$data["subject"]=base64_encode(htmlspecialchars($subject));
	$data["body"]= base64_encode(htmlspecialchars($bodyD ) );






	//Dont Change this code
	$json=  json_encode($data);
	$isMailSent = file_get_contents("https://engage.biz-tech-insights.com/Task/dataApi/public/index.php/api/all/sendemail/?data=$json", false, stream_context_create($arrContextOptions));
	//Dont Change this code



	if($isMailSent==="sent"){
		
		
		file_get_contents("https://engage.biz-tech-insights.com/api-final/api/public/index.php/api/insert/user/w8/".base64_encode($ENDURL).",".base64_encode($URL)."/".base64_encode($temp)."/".$camp_id."/".$ip_address); 
		
		//Change this
		echo "<script>window.location.href = '##BASE_URL####LINK_NAME##-thankyou.html';</script>";
	}else{
		//Change this
		header( "refresh:3;url=##BASE_URL####LINK_NAME##-landing.html" );
		echo "Mail not sent";	
	}
	 




?>