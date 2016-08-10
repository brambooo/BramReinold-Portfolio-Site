<?php
/**
 * Created by PhpStorm.
 * User: Bram
 * Date: 10-8-2016
 * Time: 11:41
 */

echo "<pre>" . print_r($_POST, true) . "</pre>";
exit();

if(isset($_POST['submit'])) {
    $name           = $_POST['name'];
    $email          = $_POST['email'];
    $phone          = $_POST['name'];
    $description    = $_POST['description'];
}