import { State } from "@/routes/_middleware.ts";
import Head from "@/components/Head.tsx";
import { asset } from "$fresh/runtime.ts";
import Layout from "@/components/Layout.tsx";
import links from "@/data/campus-alert.json" assert { type: "json" };
import type { JSX } from "preact";
import type { RouteContext } from "$fresh/server.ts";

interface MenuType {
  name: string;
  municipalities: string;
  CLASS_AREA_CODE: string;
  OFFICES_AREA_CODE: string;
}

interface CampusAlert extends State {
  id: string;
  request: Request;
}

const transweather: { [key: string]: string } = {
  "02": "暴風雪警報",
  "03": "大雨警報",
  "04": "洪水警報",
  "05": "暴風警報",
  "06": "大雪警報",
  "07": "波浪警報",
  "08": "高潮警報",
  "10": "大雨注意報",
  "12": "大雪注意報",
  "13": "風雪注意報",
  "14": "雷注意報",
  "15": "強風注意報",
  "16": "波浪注意報",
  "17": "融雪注意報",
  "18": "洪水注意報",
  "19": "高潮注意報",
  "20": "濃霧注意報",
  "21": "乾燥注意報",
  "22": "なだれ注意報",
  "23": "低温注意報",
  "24": "霜注意報",
  "25": "着氷注意報",
  "26": "着雪注意報",
  "32": "暴風雪特別警報",
  "33": "大雨特別警報",
  "35": "暴風特別警報",
  "36": "大雪特別警報",
  "37": "波浪特別警報",
};

const TITLE =
  "N/S Campus Alert｜N/S高のキャンパスに警報が出ているかを簡単に確認";
const DESCRIPTION = `N/S高の全キャンパスの気象等による注意報,警報,特別警報が出ているかを確認することができます。
このツールを使用するにはGoogleアカウントでログインが必要です。`;

const CampusAlertJson: { [key: string]: MenuType } = links;

export default async function CampusAlert(
  req: Request,
  ctx: RouteContext<unknown, CampusAlert>
) {
  const ogImageUrl = new URL(asset("/ns-app/campus-alert.png"), ctx.url).href;
  const state = ctx.state;
  const id = ctx.params?.id;
  if (!state.user?.id) {
    return (
      <>
        <Head
          title={TITLE}
          description={DESCRIPTION}
          href={ctx.url.href}
          imageUrl={ogImageUrl}
        />
        <Layout state={state}>
          <section class="bg-white py-12">
            <div class="container mx-auto px-4">
              <div
                class={
                  "font-semibold mb-8 text-center py-20 md:py-36 space-y-2"
                }
              >
                <h1 class={"text-red-400 text-5xl md:text-7xl"}>
                  N/S Campus Alert
                </h1>
                <h1 class={"text-black font-bold text-lg md:text-xl"}>
                  N/S高のキャンパスに警報が出ているかを簡単に確認
                </h1>
              </div>
              <footer class={"flex justify-center py-10"}>
                <img src="/svg/campus-alert.svg" />
              </footer>
            </div>
            <div class="flex justify-center">
              <img
                class="p-2 rounded-lg shadow-lg w-auto sm:w-96"
                src={"/ns-app/campus-alert.png"}
              ></img>
            </div>
          </section>
        </Layout>
      </>
    );
  } else if (CampusAlertJson[id]?.name) {
    const AlertInfo = await getAlertInfo(id);
    return (
      <>
        <Head
          title={TITLE}
          description={DESCRIPTION}
          href={ctx.url.href}
          imageUrl={ogImageUrl}
        />
        <Layout state={state}>
            <div class="bg-gray-50 py-14 md:py-24">
              <div class="text-center mb-8 space-y-4">
                <h1 class="text-red-500 text-5xl md:text-7xl font-bold">
                  N/S Campus Alert
                </h1>
                <h2 class="text-black text-lg md:text-xl font-semibold">
                  N/S高のキャンパスに警報が出ているかを簡単に確認
                </h2>
              </div>
            </div>
            <div class="bg-gray-100 py-8">
              <div class="container mx-auto px-4">
                <div class="mb-8">
                  <div class="bg-white rounded-lg shadow-lg p-6 mb-4">
                    <div class="flex items-center mb-4">
                      <p class="font-bold text-gray-600 text-sm">
                        {AlertInfo.municipalities}
                      </p>
                    </div>
                    <div class="flex mb-4">
                      <p class="text-2xl font-bold text-gray-800">
                        {AlertInfo.name}キャンパス
                      </p>
                    </div>
                    <div class="space-y-2">
                      <AlertView
                        warning={AlertInfo.warning}
                        name={AlertInfo.name}
                        municipalities={AlertInfo.municipalities}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 py-40 md:py-52" />
        </Layout>
      </>
    );
  } else {
    return (
      <>
        <Head
          title={TITLE}
          description={DESCRIPTION}
          href={ctx.url.href}
          imageUrl={ogImageUrl}
        />
        <Layout state={state}>
          <section class="hero flex items-center justify-center bg-red-800 h-[40rem]">
            <div class="text-center text-white">
              <h1 class="text-5xl py-3 font-bold">404エラー</h1>
              <p class="text-lg leading-6">
                お探しのキャンパスは見つかりませんでした
              </p>
              <div class="py-8">
                <a
                  class="bg-white text-gray-700 py-2 px-3 text-lg hover:bg-gray-300 rounded-lg"
                  href="/campus-alert"
                >
                  トップに戻る
                </a>
              </div>
            </div>
          </section>
        </Layout>
      </>
    );
  }
}

interface AlertData {
  name: string;
  municipalities: string;
  warning: JSX.Element[] | "無し";
}

function AlertView(props: AlertData): JSX.Element {
  if (props.warning == "無し") {
    return (
      <p class="text-white font-bold bg-gray-500 inline-block p-1 rounded-lg text-sm">
        発表警報・注意報は無し
      </p>
    );
  }
  return <>{props.warning.map((data) => data)}</>;
}

async function getAlertInfo(id: string): Promise<AlertData> {
  const CampusInfo = CampusAlertJson[id];
  const res = await (
    await fetch(
      `https://www.jma.go.jp/bosai/warning/data/warning/${CampusInfo["OFFICES_AREA_CODE"]}.json`
    )
  ).json();
  let warningsData = [];
  for (let i = 0; i < (res["areaTypes"][1]["areas"] as unknown[]).length; i++) {
    if (
      res["areaTypes"][1]["areas"][i]["code"] == CampusInfo["CLASS_AREA_CODE"]
    ) {
      warningsData = res["areaTypes"][1]["areas"][i]["warnings"];
      break;
    }
  }
  let warningDataElement: JSX.Element[] = [];
  for (let i = 0; i < (warningsData as unknown[]).length; i++) {
    const warning = warningsData[i];
    if (
      warning["status"] == "解除" ||
      warning["status"] == "発表警報・注意報はなし"
    ) {
      break;
    } else {
      if (transweather[warning["code"]].endsWith("特別警報")) {
        warningDataElement.push(
          <p class="text-white bg-purple-500 inline-block p-1 rounded-lg text-sm">
            {transweather[warning["code"]]}
          </p>
        );
      } else if (transweather[warning["code"]].endsWith("警報")) {
        warningDataElement.push(
          <p class="text-white bg-red-500 inline-block p-1 rounded-lg text-sm">
            {transweather[warning["code"]]}
          </p>
        );
      } else {
        warningDataElement.push(
          <p class="text-white bg-yellow-500 inline-block p-1 rounded-lg text-sm">
            {transweather[warning["code"]]}
          </p>
        );
      }
    }
  }
  if (!warningDataElement[0]) {
    return {
      name: CampusInfo["name"],
      municipalities: CampusInfo["municipalities"],
      warning: "無し",
    };
  } else {
    return {
      name: CampusInfo["name"],
      municipalities: CampusInfo["municipalities"],
      warning: warningDataElement,
    };
  }
}
