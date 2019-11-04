<?php
$params = $_POST;
$file_name = "../configs/levels.json";
$file_data = str_replace('\"','"',(string) $params['file_data']);

// errorId : 0 = all is ok
// errorId : 2 = not data in params

if (isset($params['file_data'])) {
	$savefile = fopen($file_name, "w") or die("Unable to open file!");
	fwrite($savefile, $file_data);
	fclose($savefile);
	echo json_encode(array('errorId'=>'0'));
} else {
	//echo json_encode(array('errorId'=>'2'));
	echo json_encode($params);
}
?>