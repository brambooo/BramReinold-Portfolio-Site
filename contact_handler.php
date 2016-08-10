<?php
/**
 * Created by PhpStorm.
 * User: Bram
 * Date: 10-8-2016
 * Time: 11:41
 */

echo "<pre>" . print_r($_POST, true) . "</pre>";

// Validate form fields
if(!empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['message'])) {

    echo 'test';

    // Get all form input values
    $name           = htmlentities($_POST['name']);
    $email          = htmlentities($_POST['email']);
    if(!empty($_POST['phone'])) {
        $phone          = htmlentities($_POST['phone']);
    } else {
        $phone = "niet ingevuld";
    }
    $message        = htmlentities($_POST['message']);

    // Send a simple mail to bram_reinold@hotmail.com when someone submit the form with above inputs
    // Param 1 =  receiver(s) of the email
    // Param 2 = subject
    // Param 3 = message

    // Setup mail
    $header = "From: {$email}";
    $message = "{$name}, heeft het volgende bericht gestuurd: \n {$message}\n\n Contactgegevens: \n naam: {$name} \n email: {$email} \n tel: {$phone}.";
    $to         = "info@bramreinold.nl";
    $subject    = "Bramreinold.nl - nieuw contactformulier bericht!";

    // Send message to receiver
    $mailStatus = mail($to, $subject, $message, $header);

}

