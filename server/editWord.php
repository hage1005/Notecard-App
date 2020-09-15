<?php
header('content-type:text/html;charset=utf-8');
$servername = 'w.rdc.sae.sina.com.cn';
$loginusername = 'wlm3251jnj';
$password = 'wxkjzz5kx5wiziy452lix3lx30lyh4hix412xj0z';
$mysqli=new mysqli($servername,$loginusername,$password,'app_chikeshi','3306');

if($mysqli->connect_errno){
  die('CONNECT ERROR:'.$mysqli->connect_error);
}
$code=$_POST['code'];
$url="https://api.weixin.qq.com/sns/jscode2session?appid=wx75bcc4807354a89f&secret=399ad599f4a0305ca6f6692304fbd09f&js_code=$code&grant_type=authorization_code";
$res = file_get_contents($url); //获取文件内容或获取网络请求的内容
$result=json_decode($res);
$openid=$result->openid;
$openid = str_replace("-","_",$openid);
$plus="_";
$tableName=$_POST['tableName'];
$oldName=$_POST['oldName'];
$oldAnswer=$_POST['oldAnswer'];
$newName=$_POST['newName'];
$newAnswer=$_POST['newAnswer'];



$sql="UPDATE $tableName$plus$openid SET word='$newName',answer='$newAnswer' WHERE word='$oldName';" ;
$res=$mysqli->query($sql);

if($res)
  {
    echo $mysqli->affected_rows.' rows affected successfully';

  }
else{
    echo "ERROR ".$mysqli->errno.':'.$mysqli->error;
}




       // print_r(json_encode($rowss));
