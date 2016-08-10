<?php
/**
 * Created by PhpStorm.
 * User: Bram
 * Date: 10-8-2016
 * Time: 11:41
 */

echo "<pre>" . print_r($_POST, true) . "</pre>";

// Get all form input values
$name           = htmlentities(['name']);
$email          = htmlentities($_POST['email']);
$phone          = htmlentities($_POST['phone']);        // optional
$message        = htmlentities($_POST['message']);

// Send a simple mail to bram_reinold@hotmail.com when someone submit the form with above inputs
// Param 1 =  receiver(s) of the email
// Param 2 = subject
// Param 3 = message

// Setup mail
$header = "From: {$email}";

// Validate if phone is filled in
if(empty($phone)) {
    $phone = "niet ingevuld";
}
$message = "{$message}\n\n Contactgegevens: \n email: {$email} \n tel: {$phone}.";
// Use wordwrap if lines are longes than 70 chars (lines cannot be longer than that)

$to         = "info@bramreinold.nl";
$subject    = "Bramreinold.nl - nieuw contactformulier bericht!";

//    // Send message to receiver
$mailStatus = mail($to, $subject, $message, $header);
//$mailStatus = mail($to, "test", "bericht test");

// Validate if mail is sent
if($mailStatus) {
    return true;
} else {
    return false;
}


//exit();

// Validate if submit button is clicked.
if(isset($_POST['submit'])) {


   // $status = mail('bram_reinold@hotmail.com', "test", "bericht1");
    //echo $status;
}