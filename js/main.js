// Firebase Authenticationの初期化
var config = {
    apiKey: "AIzaSyCJtn9C_6ohETUJ5XO-FU_KiKcljQHs9qQ",
    authDomain: "student-checker-20230307.firebaseapp.com",
    projectId: "student-checker-20230307",
    storageBucket: "student-checker-20230307.appspot.com",
    messagingSenderId: "319085054224",
    appId: "1:319085054224:web:6e06415e5c365683fc3d95"
};
firebase.initializeApp(config);

function copyUrl() {


    // テキストボックスの内容を選択する
    urlInput.select();

    // コピーする
    document.execCommand('copy');
}
function submitForm(emails) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // ユーザーがログインしている場合
            if (user.email.endsWith('@nnn.ed.jp')) {
                console.log(emails)
                var code = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < 10; i++) {
                    code += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                console.log(code)
                var id = code;
                var nickname = document.getElementById("nickname").value;
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        alert(this.responseText);
                    }
                };
                xmlhttp.open("POST", "shield/post.php", true);
                xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlhttp.send("id=" + id + "&nickname=" + nickname);
                document.getElementById('id').innerHTML = "ID：" + code;
                document.getElementById("button").remove()
                document.getElementById('shares').style.display = "block";
                // 現在のURLを取得する
                const baseUrl = window.location.href.split('?')[0];

                // URLを生成する
                const url = `${baseUrl}?id=${id}`;

                // URLをテキストボックスに表示する
                const urlInput = document.getElementById('urlInput');
                urlInput.value = url;
            }
        } else {
            // ユーザーがログアウトしている場合
            alert("N/S高生だと判定できませんでした。")
        }
    });
}

// ログイン処理
function login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // Googleアカウントからメールアドレスを取得
        var email = result.user.email;
        // メールアドレスのドメインが@nnn.ed.jpの場合、承認済みと表示
        if (email.endsWith('@nnn.ed.jp')) {
            var num = email.slice(-20, -10);
            var th = email.slice(-20, -18);
            var school = email.slice(-18, -17).toUpperCase();
            //N高かS高生であることを判定
            if (school === "N") {
                //N高の場合
                th = th - 15;
                console.log("N高生です。")
            }
            if (school === "S") {
                //S高の場合
                th = th - 20;
                console.log("S高生です。")
            }
            var date = new Date;
            var new_th = date.getFullYear();
            var new_th = new_th.toString().slice(-2);
            var graduates = school + "高等学校" + th + "期生";
            var new_student = new_th - email.slice(-20, -18);

            //デバック用
            //console.log("学籍番号：" + num)
            //console.log("期生：" + th)
            //console.log("学校：" + school + "高等学校")
            //console.log("入学年度：" + new_student)


            //新入生かどうかを判定
            if (new_student === 0) {
                document.getElementById('new_student').innerHTML = "あなたは新入生です。";
            }
            //情報表示（判定結果）
            document.getElementById('message').style.display = "block";
            document.getElementById('my-profile').style.display = "block";
            document.getElementById('share').style.display = "block";
            document.getElementById('icon').innerHTML = "verified";
            document.getElementById("icon").style.color = "hsl(141, 53%, 53%)"
            document.getElementById('verify').innerHTML = "あなたはN/S高生です。";
            document.getElementById('verify').style.color = "hsl(141, 53%, 53%)"
            document.getElementById('school').innerHTML = graduates;
            document.getElementById("button").setAttribute('onclick', 'submitForm(email)');
            //チェックを有効にするプログラム
            let check = document.getElementById('check');
            check.checked = true;
            check.disabled = false;

        } else {
            //情報表示（判定結果）
            document.getElementById('message').style.display = "block";
            document.getElementById('icon').style.color = "hsl(348, 100%, 61%)";
            document.getElementById('icon').innerHTML = "error";
            document.getElementById('verify').innerHTML = "学園アカウントでは無い！";
            document.getElementById('verify').style.color = "hsl(348, 100%, 61%)";
            //情報表示（判定結果）
            //ログインしたメールアドレスを表示
            document.getElementById('email').textContent = "あなたのメールアドレス：" + email;
        }

    }).catch(function (error) {
        // エラー処理
        console.error(error);
    });
}