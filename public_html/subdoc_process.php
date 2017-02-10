<?php
switch($_POST['mode']){
	case 'subdoc':		
	if(empty($_POST['userID']) || trim($_POST['userID'])=="" || $_POST['data']['capConf']) exit;
	break;
}

$mysqli = new mysqli("localhost", "venchuer2_user", "venchuerFullS1te", "venchuer2_site");
if ($mysqli->connect_errno) echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;

$_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_SPECIAL_CHARS);
$data_min = arraymin($_POST['data']);

$sql = 'INSERT INTO form_submissions (client_id, form_name, field_name, data) VALUES (?,?,?,?)';
if($stmt = $mysqli->prepare($sql)){
	//	i=int, d=double, s=string, b=blob;
	foreach($data_min as $field_name => $data) {
		$stmt->bind_param("isss", $_POST['userID'], $_POST['mode'], $field_name, $data);
		$stmt->execute();
//		$result = $stmt->get_result();
	}
//	return ($stmt->errno) ? 0 : 1;
	$stmt->close();		
}else{
	echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
}
$mysqli->close();

header("Location:./thank_you_submission");

function arraymin($array) {
	//this function strips out any fields that have blank values and flattens the array.
	$arraymin = array();
	foreach($array as $key=>$value) {
	if($value !="") {
		$arraymin[$key] = $value;
		}
	}
	return $arraymin;
}

?>