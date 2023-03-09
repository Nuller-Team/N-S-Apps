<?php
$id = $_POST['id'];

// id.txtからIDとニックネームを取得
$file = 'id.txt';
$searchfor = $id . ',';
$nickname = '存在しません';
if(file_exists($file)) {
  $contents = file_get_contents($file);
  $pattern = preg_quote($searchfor, '/');
  $pattern = "/^.*$pattern.*\$/m";
  if(preg_match_all($pattern, $contents, $matches)) {
    $nickname = trim(explode(',', $matches[0][0])[1]);
    // id.txtから削除
    $contents = str_replace($matches[0][0], "", $contents);
    $contents = preg_replace("/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/", "\n", $contents);
    file_put_contents($file, $contents);
  }
}

// 結果を返す
echo $nickname;
?>