<?php
if ($_SERVER['REMOTE_ADDR'] === '127.0.0.1' || $_SERVER['REMOTE_ADDR'] === '::1') {
    if (isset($_POST['id']) && isset($_POST['nickname'])) {
        $id = $_POST['id'];
        $nickname = $_POST['nickname'];
        $data = $id . ',' . $nickname . PHP_EOL;
        file_put_contents('id.txt', $data, FILE_APPEND);
        echo '保存しました';
    } else {
        echo 'エラーが発生しました';
    }
} else {
    echo 'アクセス権限がありません';
}
?>