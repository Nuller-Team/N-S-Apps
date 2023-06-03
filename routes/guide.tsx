import { Head } from "$fresh/runtime.ts";

export default function Home() {
    return (
        <>
            <body class="bg-gray-100">
                <div class="flex flex-wrap justify-center">
                    <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 space-y-4">
                    <h1 class="text-2xl font-bold">N/S Apps for mobile インストール方法</h1>
                        <p class="text-2xl m-2">iPhone（Safari）の場合</p>
                        <div class="bg-white rounded-lg shadow-md flex p-10 justify-beetween items-center">
                            <img class="w-10 h-10" src="guide/share.png" alt="Share Icon"></img>
                            <div class="p-4">
                                <p>シェアボタンをタップします。</p>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-md flex p-10 justify-beetween items-center">
                            <img class="w-10 h-10" src="guide/plus.png" alt="Plus Icon"></img>
                            <div class="p-4">
                                <p>上にスワイプして、「ホーム画面に追加」をタップし、「追加」をタップします。</p>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-md flex p-10 justify-beetween items-center">
                            <img class="w-10" src="icon/512.png" alt="N/S Apps Icon"></img>
                            <div class="p-4">
                                <p>N/S Appsを起動します。</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-center">
                    <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 p-4 space-y-4">
                        <p class="text-2xl m-2">Android（Chrome）の場合</p>
                        <div class="bg-white rounded-lg shadow-md flex p-10 justify-beetween items-center">
                            <img class="w-10 h-10" src="guide/3.png" alt="3point Icon"></img>
                            <div class="p-4">
                                <p>3点リーダーをタップします。</p>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-md flex p-10 justify-beetween items-center">
                            <img class="w-10 h-10" src="guide/in.png" alt="install Icon"></img>
                            <div class="p-4">
                                <p>「アプリをインストール」をタップします。</p>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-md flex p-10 justify-beetween items-center">
                            <img class="w-10" src="icon/512.png" alt="N/S Apps Icon"></img>
                            <div class="p-4">
                                <p>N/S Appsを「インストール」します。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </>
    );
}
