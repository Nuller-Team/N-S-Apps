import { Handlers, PageProps } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";
import type { State } from "@/types/session.ts";

import { auth_url } from "@/utils/auth.ts";

export const handler: Handlers<any, State> = {
  GET(req, ctx) {
    if (!ctx.state.token) return ctx.render("default");
    return ctx.render(`${ctx.state.school}高等学校${ctx.state.gen}期生`);
  },
};

export default function Result(props: PageProps<string>) {
  if (props.data == "default") {
    const ogImageUrl = new URL(asset("/ns-app/result.png"), props.url).href;
    const TITLE = "N/S Result｜成績を素早く簡単に確認";
    const DESCRIPTION =
      `Chromeの拡張機能を用いてN/S高の成績を素早く簡単に確認することができます。
このツールを使用するにはGoogleアカウントでログインが必要です。`;
    return (
      <>
        <Head>
          <title>{TITLE}</title>
          <meta
            name="description"
            content={DESCRIPTION}
          />
          <meta property="og:title" content={TITLE} />
          <meta property="og:type" content="website" />
          <meta property="og:description" content={DESCRIPTION} />
          <meta property="og:url" content={props.url.href} />
          <meta property="og:image" content={ogImageUrl} />
        </Head>
        <>
          <Head>
            <title>N/S Result</title>
          </Head>
          <div class="bg-gray-100">
            <nav class="shadow-md">
              <div class="container px-4 mx-auto md:flex md:items-center">
                <div class="flex justify-between items-center">
                  <div class="text-2xl font-semibold text-gray-800  my-3">
                    N/S Result
                  </div>
                </div>
                <div class="hidden md:flex md:items-center">
                </div>
              </div>
            </nav>
            <hr>
            </hr>
            <section
              class="bg-white py-80 font-bold"
              style="background-image: url(result/back.png);"
            >
              <div class="container px-4 mx-auto text-center">
                <h1 class="text-4xl font-bold text-gray-800">
                  N・S高の成績を素早く確認
                </h1>
                <p class="mt-4 text-gray-800">
                  N/S
                  Resultは、N高の成績を簡単かつスピーディーに確認できるアプリです。
                </p>
                <div class="mt-8">
                  <a
                    href={auth_url}
                    class="px-6 py-3 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                  >
                    ログインしてダウンロード
                  </a>
                </div>
              </div>
            </section>

            <section id="features" class="bg-gray-100 py-10">
              <div class="container px-4 mx-auto">
                <h2 class="text-3xl font-semibold text-gray-800 text-center mb-8">
                  特徴
                </h2>
                <div class="flex flex-wrap -mx-4">
                  <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
                    <div class="bg-white rounded-lg shadow-md p-6">
                      <h3 class="text-xl font-semibold text-gray-800 mb-2">
                        ✅簡単な成績確認！
                      </h3>
                      <p class="text-gray-600">
                        N/S
                        Resultを使えば、N高の成績をブラウザ上部のメニューからワンタップで確認できます。
                      </p>
                    </div>
                  </div>
                  <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
                    <div class="bg-white rounded-lg shadow-md p-6">
                      <h3 class="text-xl font-semibold text-gray-800 mb-2">
                        🎨シンプルなデザイン！
                      </h3>
                      <p class="text-gray-600">
                        N/S
                        Resultのデザインはシンプルで使いやすく、スッキリとした画面で成績を確認できます。
                      </p>
                    </div>
                  </div>
                  <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
                    <div class="bg-white rounded-lg shadow-md p-6">
                      <h3 class="text-xl font-semibold text-gray-800 mb-2">
                        🔒プライバシー重視！
                      </h3>
                      <p class="text-gray-600">
                        N/S
                        「Result」は、N/S高のマイページのデザインを変更するための機能です。開発者は、ユーザーの情報を取得することはありません。
                      </p>
                    </div>
                  </div>
                  <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
                    <div class="bg-white rounded-lg shadow-md p-6">
                      <h3 class="text-xl font-semibold text-gray-800 mb-2">
                        💻パソコンで成績確認！
                      </h3>
                      <p class="text-gray-600">
                        Chrome拡張機能技術を使用して、PCで成績確認ができます。Macでも簡単にチェックできます。
                      </p>
                    </div>
                  </div>
                  <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
                    <div class="bg-white rounded-lg shadow-md p-6">
                      <h3 class="text-xl font-semibold text-gray-800 mb-2">
                        🌍完全無料のオープンソースアプリ！
                      </h3>
                      <p class="text-gray-600">
                        オープンソースで公開しているアプリのため、安全性が保証されています。またHTMLとJavascriptだけで作成しています。学習にお使いください。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section id="features" class="bg-gray-100 py-60">
              <div class="container px-4 mx-auto">
                <h2 class="text-3xl font-semibold text-gray-800 text-center mb-8">
                  学生開発チームNullerとは？
                </h2>
                <div class="flex flex-wrap -mx-4">
                  <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
                    <div class="bg-white rounded-lg shadow-md p-6">
                      <h3 class="text-xl font-semibold text-gray-800 mb-2">
                        ✅N/S高在校生・卒業生で構成されたチーム
                      </h3>
                      <a
                        href="https://nuller.net/"
                        class="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-white text-center justify-center flex items-center "
                      >
                        詳しく
                      </a>
                    </div>
                  </div>
                  <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
                    <div class="bg-white rounded-lg shadow-md p-6">
                      <h3 class="text-xl font-semibold text-gray-800 mb-2">
                        ✅Nullerは技術の向上を目的として活動
                      </h3>
                      <a
                        href="https://nuller.net/contact"
                        class="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-white text-center justify-center flex items-center "
                      >
                        応募する
                      </a>
                    </div>
                  </div>
                  <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
                    <div class="bg-white rounded-lg shadow-md p-6">
                      <h3 class="text-xl font-semibold text-gray-800 mb-2">
                        ✅様々なアプリを公開
                      </h3>
                      <a
                        href="https://app.nuller.net/"
                        class="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-white text-center justify-center flex items-center "
                      >
                        見てみる
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="bg-blue-600 py-12">
              <div class="container mx-auto px-4">
                <div class="max-w-md mx-auto text-center text-white">
                  <h2 class="text-2xl font-semibold mb-4">
                    今すぐN/S Resultをダウンロード！
                  </h2>
                  <p class="text-lg mb-8">
                    N高の成績を簡単・素早く確認しましょう！
                  </p>
                  <p class="text-lg mb-8 text-center">Chrome 対応</p>
                  <div class="flex justify-center">
                    <a
                      href="#"
                      class="bg-white text-blue-600 hover:bg-blue-700 font-semibold py-3 px-6 rounded-full mr-4"
                    >
                      ダウンロード
                    </a>
                  </div>
                </div>
              </div>
            </section>
            <section id="features" class="bg-gray-100 py-60">
              <div class="container px-4 mx-auto">
                <h2 class="text-3xl font-semibold text-gray-800 text-center mb-8">
                  ダウンロード手順
                </h2>
                <h2 class="text-2xl font-semibold text-gray-800 mb-8">
                  Chromeのみ対応
                </h2>
                <div class="flex flex-wrap -mx-4">
                  <div class="w-full md:w-1/2 lg:w-1/2 px-4 mb-6">
                    <div class="bg-white rounded-lg shadow-md p-6">
                      <h3 class="text-xl font-semibold text-gray-800 mb-2">
                        ✅ダウンロードリンクを開き、「Chromeに追加」を選択します。
                      </h3>
                      <p>
                        このページの「ダウンロード」ボタンにリンクが記載されています。Googleアカウントログインが必要です。
                      </p>
                      <img src="result/Chrome1.png"></img>
                    </div>
                  </div>
                  <div class="w-full md:w-1/2 lg:w-1/2 px-4 mb-6">
                    <div class="bg-white rounded-lg shadow-md p-6">
                      <h3 class="text-xl font-semibold text-gray-800 mb-2">
                        ✅拡張機能を追加を選択
                      </h3>
                      <p>これを行うことによりインストールが完了します。</p>
                      <img src="result/Chrome2.png"></img>
                    </div>
                  </div>
                  <div class="w-full md:w-1/2 lg:w-1/2 px-4 mb-6">
                    <div class="bg-white rounded-lg shadow-md p-6">
                      <h3 class="text-xl font-semibold text-gray-800 mb-2">
                        ✅成績を素早く確認できるようにします。
                      </h3>
                      <p>パズルボタンから「N/SResult」をピン留めします。</p>
                      <img src="result/Chrome3.png"></img>
                    </div>
                  </div>
                  <div class="w-full md:w-1/2 lg:w-1/2 px-4 mb-6">
                    <div class="bg-white rounded-lg shadow-md p-6">
                      <h3 class="text-xl font-semibold text-gray-800 mb-2">
                        ✅完了！成績を素早く確認できます！
                      </h3>
                      <p>
                        成績を確認する際は、N/SResultのアイコンをクリックして、所属校がN高かS高を選びます。
                      </p>
                      <img src="result/Chrome4.png"></img>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <footer class="text-gray-800 py-8">
              <div class="bg-gray-100 container mx-auto">
                <div class="flex flex-wrap">
                  <div class="w-full md:w-1/4 lg:w-1/4 px-4 mb-4 md:mb-0">
                    <h2 class="text-lg font-semibold mb-4">Links</h2>
                    <ul>
                      <li>
                        <a
                          href="https://twitter.com/Nuller_jp"
                          class="block mb-2"
                        >
                          Twitter
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://github.com/Nuller-Team"
                          class="block mb-2"
                        >
                          Github
                        </a>
                      </li>
                      <li>
                        <a href="https://nuller.net/" class="block mb-2">
                          nuller.net
                        </a>
                      </li>
                      <li>
                        <a href="https://nuller.net/contact" class="block mb-2">
                          お問い合わせ
                        </a>
                      </li>
                      <li>
                        <a href="https://nuller.net/privacy" class="block mb-2">
                          プライバシーポリシー
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="container mx-auto justify-center text-center flex items-center">
                <div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-4 md:mb-0">
                  <p class="text-sm">© Nuller All rights reserved.</p>
                </div>
              </div>
            </footer>
            <style>
            </style>
          </div>
        </>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>N/S Result</title>
        </Head>
        <div class="bg-gray-100">
          <nav class="shadow-md">
            <div class="container px-4 mx-auto md:flex md:items-center">
              <div class="flex justify-between items-center">
                <div class="text-2xl font-semibold text-gray-800  my-3">
                  N/S Result
                </div>
              </div>
              <div class="hidden md:flex md:items-center">
              </div>
            </div>
          </nav>
          <hr>
          </hr>
          <section
            class="bg-white py-80 font-bold"
            style="background-image: url(result/back.png);"
          >
            <div class="container px-4 mx-auto text-center">
              <h1 class="text-4xl font-bold text-gray-800">
                N・S高の成績を素早く確認
              </h1>
              <p class="mt-4 text-gray-800">
                N/S
                Resultは、N高の成績を簡単かつスピーディーに確認できるアプリです。
              </p>
              <div class="mt-8">
                <a
                  href="https://chrome.google.com/webstore/detail/ns-result/bpcfecdbikofccaldngncmhhiemjoakg?hl=ja&authuser=0"
                  class="px-6 py-3 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                >
                  ダウンロード
                </a>
              </div>
            </div>
          </section>

          <section id="features" class="bg-gray-100 py-10">
            <div class="container px-4 mx-auto">
              <h2 class="text-3xl font-semibold text-gray-800 text-center mb-8">
                特徴
              </h2>
              <div class="flex flex-wrap -mx-4">
                <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
                  <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">
                      ✅簡単な成績確認！
                    </h3>
                    <p class="text-gray-600">
                      N/S
                      Resultを使えば、N高の成績をブラウザ上部のメニューからワンタップで確認できます。
                    </p>
                  </div>
                </div>
                <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
                  <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">
                      🎨シンプルなデザイン！
                    </h3>
                    <p class="text-gray-600">
                      N/S
                      Resultのデザインはシンプルで使いやすく、スッキリとした画面で成績を確認できます。
                    </p>
                  </div>
                </div>
                <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
                  <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">
                      🔒プライバシー重視！
                    </h3>
                    <p class="text-gray-600">
                      N/S
                      「Result」は、N/S高のマイページのデザインを変更するための機能です。開発者は、ユーザーの情報を取得することはありません。
                    </p>
                  </div>
                </div>
                <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
                  <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">
                      💻パソコンで成績確認！
                    </h3>
                    <p class="text-gray-600">
                      Chrome拡張機能技術を使用して、PCで成績確認ができます。Macでも簡単にチェックできます。
                    </p>
                  </div>
                </div>
                <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
                  <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">
                      🌍完全無料のオープンソースアプリ！
                    </h3>
                    <p class="text-gray-600">
                      オープンソースで公開しているアプリのため、安全性が保証されています。またHTMLとJavascriptだけで作成しています。学習にお使いください。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="features" class="bg-gray-100 py-60">
            <div class="container px-4 mx-auto">
              <h2 class="text-3xl font-semibold text-gray-800 text-center mb-8">
                学生開発チームNullerとは？
              </h2>
              <div class="flex flex-wrap -mx-4">
                <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
                  <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">
                      ✅N/S高在校生・卒業生で構成されたチーム
                    </h3>
                    <a
                      href="https://nuller.net/"
                      class="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-white text-center justify-center flex items-center "
                    >
                      詳しく
                    </a>
                  </div>
                </div>
                <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
                  <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">
                      ✅Nullerは技術の向上を目的として活動
                    </h3>
                    <a
                      href="https://nuller.net/contact"
                      class="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-white text-center justify-center flex items-center "
                    >
                      応募する
                    </a>
                  </div>
                </div>
                <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
                  <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">
                      ✅様々なアプリを公開
                    </h3>
                    <a
                      href="https://app.nuller.net/"
                      class="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-white text-center justify-center flex items-center "
                    >
                      見てみる
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="bg-blue-600 py-12">
            <div class="container mx-auto px-4">
              <div class="max-w-md mx-auto text-center text-white">
                <h2 class="text-2xl font-semibold mb-4">
                  今すぐN/S Resultをダウンロード！
                </h2>
                <p class="text-lg mb-8">
                  N高の成績を簡単・素早く確認しましょう！
                </p>
                <p class="text-lg mb-8 text-center">Chrome 対応</p>
                <div class="flex justify-center">
                  <a
                    href="https://chrome.google.com/webstore/detail/ns-result/bpcfecdbikofccaldngncmhhiemjoakg?hl=ja&authuser=0"
                    class="bg-white text-blue-600 hover:bg-blue-700 font-semibold py-3 px-6 rounded-full mr-4"
                  >
                    ダウンロード
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section id="features" class="bg-gray-100 py-60">
            <div class="container px-4 mx-auto">
              <h2 class="text-3xl font-semibold text-gray-800 text-center mb-8">
                ダウンロード手順
              </h2>
              <h2 class="text-2xl font-semibold text-gray-800 mb-8">
                Chromeのみ対応
              </h2>
              <div class="flex flex-wrap -mx-4">
                <div class="w-full md:w-1/2 lg:w-1/2 px-4 mb-6">
                  <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">
                      ✅ダウンロードリンクを開き、「Chromeに追加」を選択します。
                    </h3>
                    <p>
                      このページの「ダウンロード」ボタンにリンクが記載されています。Googleアカウントログインが必要です。
                    </p>
                    <img src="result/Chrome1.png"></img>
                  </div>
                </div>
                <div class="w-full md:w-1/2 lg:w-1/2 px-4 mb-6">
                  <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">
                      ✅拡張機能を追加を選択
                    </h3>
                    <p>これを行うことによりインストールが完了します。</p>
                    <img src="result/Chrome2.png"></img>
                  </div>
                </div>
                <div class="w-full md:w-1/2 lg:w-1/2 px-4 mb-6">
                  <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">
                      ✅成績を素早く確認できるようにします。
                    </h3>
                    <p>パズルボタンから「N/SResult」をピン留めします。</p>
                    <img src="result/Chrome3.png"></img>
                  </div>
                </div>
                <div class="w-full md:w-1/2 lg:w-1/2 px-4 mb-6">
                  <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">
                      ✅完了！成績を素早く確認できます！
                    </h3>
                    <p>
                      成績を確認する際は、N/SResultのアイコンをクリックして、所属校がN高かS高を選びます。
                    </p>
                    <img src="result/Chrome4.png"></img>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer class="text-gray-800 py-8">
            <div class="bg-gray-100 container mx-auto">
              <div class="flex flex-wrap">
                <div class="w-full md:w-1/4 lg:w-1/4 px-4 mb-4 md:mb-0">
                  <h2 class="text-lg font-semibold mb-4">Links</h2>
                  <ul>
                    <li>
                      <a
                        href="https://twitter.com/Nuller_jp"
                        class="block mb-2"
                      >
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/Nuller-Team"
                        class="block mb-2"
                      >
                        Github
                      </a>
                    </li>
                    <li>
                      <a href="https://nuller.net/" class="block mb-2">
                        nuller.net
                      </a>
                    </li>
                    <li>
                      <a href="https://nuller.net/contact" class="block mb-2">
                        お問い合わせ
                      </a>
                    </li>
                    <li>
                      <a href="https://nuller.net/privacy" class="block mb-2">
                        プライバシーポリシー
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="container mx-auto justify-center text-center flex items-center">
              <div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-4 md:mb-0">
                <p class="text-sm">© Nuller All rights reserved.</p>
              </div>
            </div>
          </footer>
          <style>
          </style>
        </div>
      </>
    );
  }
}
