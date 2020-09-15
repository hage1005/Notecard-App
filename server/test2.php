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
$url="https://api.weixin.qq.com/sns/jscode2session?appid=wx23927a1c67b30540&secret=e30fcbc5ba661b4fd74c7bc7aeebdb3b&js_code=$code&grant_type=authorization_code";
$res = file_get_contents($url); //获取文件内容或获取网络请求的内容
$result=json_decode($res);
$openid="od_yt4h_KBdN8DtP6YxXoVr5w8W0";
$plus="_";
$tableName="a";

for ($x = 1; $x < 30; $x++) {
    //echo "The number is: $x <br>";

$sql="Select Table$x from users WHERE openid='$openid';" ;
$res=$mysqli->query($sql);

if($res){
    $row=$res->fetch_assoc();
      if($row["Table$x"]==$tableName){
        print_r($x);
        $sql="Update users set Table$x=null WHERE openid='$openid';" ;
        $res=$mysqli->query($sql);
          break;
      }

}
else{
    echo "ERROR ".$mysqli->errno.':'.$mysqli->error;
}
}
$sql="DROP Table IF EXISTS $tableName$plus$openid;" ;
$res=$mysqli->query($sql);
if($res){
  echo "you dropped the table";
}
else{
  echo "ERROR ".$mysqli->errno.':'.$mysqli->error;
}



       // print_r(json_encode($rowss));
