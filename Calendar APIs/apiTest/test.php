<?php
include_once('davical/inc/caldav-client-v2.php');
$cal_url = 'https://p01-caldav.icloud.com:443/162356142/principal/';
$cal_user = 'dan.meehan17@gmail.com';
$cal_pass = 'Stolen_ph0ne';
$cdc = new CalDAVClient($cal_url, $cal_user, $cal_pass);

$details = $cdc->GetCalendarDetails();
print_r($details);
?>