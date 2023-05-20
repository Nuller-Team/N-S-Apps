import { PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";
import { State } from "@/routes/_middleware.ts";
import Head from "@/components/Head.tsx";
import Layout from "@/components/Layout.tsx";
import { Handlers } from "@/utils/handler.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render({ ...ctx.state });
  },
};

export default function Terms(props: PageProps<State>) {
  const ogImageUrl = new URL(asset("/ns-app/apps.png"), props.url).href;
  return (
    <>
      <Head title={"利用規約"} href={props.url.href} imageUrl={ogImageUrl} />
      <Layout state={props.data}>
        <div class="bg-gray-100">
          <div class="container mx-auto py-8">
            <h1 class="text-3xl font-bold mb-8">利用規約</h1>

            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold my-5">はじめに</h2>
              <p>
                この利用規約（以下、「本規約」といいます）は、開発チーム「Nuller」（以下、「当チーム」といいます）が提供するアプリの利用条件を定めるものです。
              </p>
              <p>
                本アプリを利用する場合は、以下の利用規約に同意したものとみなします。
              </p>

              <h2 class="text-2xl font-bold my-5">第1条（定義）</h2>
              <p>本規約において使用する用語の定義は、以下の通りです。</p>
              <ol class="list-decimal mt-4 ml-8">
                <li>
                  「本アプリ」とは、当チームが開発し、提供するアプリのことをいいます。
                </li>
                <li>
                  「利用者」とは、本アプリを利用する全てのユーザーのことをいいます。
                </li>
                <li>
                  「登録情報」とは、利用者が本アプリに登録する情報のことをいいます。
                </li>
                <li>
                  「サービス」とは、本アプリによって提供される全てのサービスのことをいいます。
                </li>
              </ol>

              <h2 class="text-2xl font-bold my-5">第2条（利用登録）</h2>
              <p>
                本アプリを利用するためには、利用者は本規約に同意し、当チームが指定する方法により利用登録を完了する必要があります。
              </p>
              <p>
                利用登録の際に登録する情報は、正確かつ正当なものであることが条件となります。
              </p>
              <p>
                利用登録が完了した時点で、利用者は本規約に同意したことになります。
              </p>

              <h2 class="text-2xl font-bold my-5">第3条（禁止事項）</h2>
              <p>利用者は、以下の行為を行ってはなりません。</p>
              <ol class="list-decimal mt-4 ml-8">
                <li>法令または公序良俗に違反する行為</li>
                <li>
                  当チーム、他の利用者、その他の第三者の権利を侵害する行為
                </li>
                <li>虚偽の情報を提供する行為</li>
                <li>
                  当チームの許可なく、本アプリを改変、解析、リバースエンジニアリングする行為
                </li>
                <li>その他、当チームが不適当と判断する行為</li>
              </ol>
              <p>
                利用者は、本アプリを利用するにあたり、自己の責任において行動することとします。
              </p>

              <h2 class="text-2xl font-bold my-5">
                第4条（サービスの変更・中断）
              </h2>
              <p>
                当チームは、本アプリの運営に必要な場合には、事前の通知なくして本アプリの内容や仕様を変更することができます。
              </p>
              <p>
                また、当チームは、本アプリの運営に必要な場合には、事前の通知なくして本アプリの提供を中断することができます。
              </p>
              <p>
                利用者は、本アプリの変更や中断に関して、当チームに対して一切の請求やクレームを行わないことに同意するものとします。
              </p>

              <h2 class="text-2xl font-bold my-5">第5条（免責事項）</h2>
              <p>
                当チームは、本アプリの利用によって生じたいかなる損害についても一切の責任を負いません。
              </p>
              <p>
                また、当チームは、本アプリにおいて提供される情報やサービスの正確性、有用性、適合性、完全性、信頼性、安全性について、いかなる保証も行わないことに同意するものとします。
              </p>

              <h2 class="text-2xl font-bold my-5">第6条（知的財産権）</h2>
              <p>
                本アプリ及び本アプリに関連する全ての知的財産権は、当チームまたは当チームにライセンスを許諾した第三者に帰属します。
              </p>
              <p>
                利用者は、本アプリを利用することによって、当チームまたは当チームにライセンスを許諾した第三者の知的財産権を侵害しないことに同意するものとします。
              </p>

              <h2 class="text-2xl font-bold my-5">第7条（利用規約の変更）</h2>
              <p>当チームは、必要に応じて、本規約を変更することができます。</p>
              <p>
                利用者には、本アプリ内での掲示または当チームのウェブサイトに掲載することにより、変更後の利用規約を周知するものとします。
              </p>
              <p>
                利用者は、本規約の変更後に本アプリを利用する場合、変更後の利用規約に同意したものとみなされます。
              </p>

              <h2 class="text-2xl font-bold my-5">
                第8条（準拠法・管轄裁判所）
              </h2>
              <p>本規約の準拠法は日本法とします。</p>
              <p>
                本規約に関する一切の紛争については、当チームの所在地を管轄する裁判所を専属的な管轄裁判所とします。
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
