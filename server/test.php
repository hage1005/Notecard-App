<?php
header('content-type:text/html;charset=utf-8');
$servername = 'w.rdc.sae.sina.com.cn';
$loginusername = 'wlm3251jnj';
$password = 'wxkjzz5kx5wiziy452lix3lx30lyh4hix412xj0z';
$mysqli=new mysqli($servername,$loginusername,$password,'app_chikeshi','3306');
$temp=$_GET['username'];
$temp2=$_GET['password'];

if($mysqli->connect_errno){
  die('CONNECT ERROR:'.$mysqli->connect_error);
}
$code=$_POST['code'];

$url="https://api.weixin.qq.com/sns/jscode2session?appid=wx23927a1c67b30540&secret=e30fcbc5ba661b4fd74c7bc7aeebdb3b&js_code=0228lmzZ1GMSW017b0BZ1vfizZ18lmzj&grant_type=authorization_code";
$res = file_get_contents($url); //获取文件内容或获取网络请求的内容
$result = json_decode($res);
echo "$result";
