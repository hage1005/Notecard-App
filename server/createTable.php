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
if(code){
$url="https://api.weixin.qq.com/sns/jscode2session?appid=wx75bcc4807354a89f&secret=399ad599f4a0305ca6f6692304fbd09f&js_code=$code&grant_type=authorization_code";
$res = file_get_contents($url); //获取文件内容或获取网络请求的内容
$result=json_decode($res);
$openid=$result->openid;
 $openid = str_replace("-","_",$openid);

$tableName=$_POST['tableName'];
$plus="_";
 $nickName=$_POST['nickName'];
$sql="Select id from users WHERE openid='$openid';" ;
$res=$mysqli->query($sql);
if($res){
    $row=$res->fetch_assoc();
	if($row["id"]==""){
      echo "不存在";
        $sql="INSERT INTO users(openid,nickName) VALUES('$openid','$nickName');";
          $res=$mysqli->query($sql);
          if($res){
          echo $mysqli->affected_rows.' rows updated successfully';
        }
          else{
              echo "ERROR ".$mysqli->errno.':'.$mysqli->error;
        }
    }
    else{
      echo "存在";
    }
    echo $row["id"];

}
else{
    echo "ERROR ".$mysqli->errno.':'.$mysqli->error;
}
for ($x = 1; $x < 30; $x++)
  {
        //echo "The number is: $x <br>";

    $sql="Select Table$x from users WHERE openid='$openid';" ;
    $res=$mysqli->query($sql);

    if($res){
        $row=$res->fetch_assoc();
          if($row["Table$x"]==null){
            print_r($x);
            $sql="Update users set Table$x='$tableName' WHERE openid='$openid';" ;
            $res=$mysqli->query($sql);
              break;
          }
        $rows[]=$row["Table$x"];

    }
    else{
        echo "ERROR ".$mysqli->errno.':'.$mysqli->error;
    }
  }
$sql=<<<EOF
      CREATE TABLE IF NOT EXISTS $tableName$plus$openid(
        id TINYINT UNSIGNED AUTO_INCREMENT KEY,
        word VARCHAR(100) NOT NULL,
        answer VARCHAR(100) NOT NULL
      );
EOF;
  $res=$mysqli->query($sql);
  if($res){
    echo 'congrulation, you created the table';
  }
  else{
    echo 'ERROR '.$mysqli->errno.':'.$mysqli->error;
  }

}
else{
    echo "ERROR ".$mysqli->errno.':'.$mysqli->error;
}
       // print_r(json_encode($rowss));
