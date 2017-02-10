<?php
	$smaller = "not a tag < 5";
	echo "<pre>".strip_tags($smaller)."</pre>";    // -> not a tag < 5
	echo "<pre>".filter_var( $smaller, FILTER_SANITIZE_STRING)."</pre>"; // -> not a tag
	echo "<pre>".filter_var( $smaller, FILTER_SANITIZE_FULL_SPECIAL_CHARS)."</pre>"; // -> not a tag < 5
?>