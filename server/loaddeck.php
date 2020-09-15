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
$nickName=$_POST['nickName'];
if(code){
$url="https://api.weixin.qq.com/sns/jscode2session?appid=wx75bcc4807354a89f&secret=399ad599f4a0305ca6f6692304fbd09f&js_code=$code&grant_type=authorization_code";
$res = file_get_contents($url); //获取文件内容或获取网络请求的内容
$result=json_decode($res);
$openid=$result->openid;
$openid = str_replace("-","_",$openid);


for ($x = 1; $x < 30; $x++) {
    //echo "The number is: $x <br>";

$sql="Select Table$x from users WHERE openid='$openid' AND Table$x is not null" ;
$res=$mysqli->query($sql);
if($res){
    while($row=$res->fetch_assoc()){
    $rows[]=$row["Table$x"];
  }
}
else{
    echo "ERROR ".$mysqli->errno.':'.$mysqli->error;
}
}
        print_r(json_encode($rows));

}
