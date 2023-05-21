import { useEffect, useState } from "preact/hooks";
import Modal from "@/components/modal.tsx";
import { State } from "@/routes/_middleware.ts";
import { JSX } from "preact/jsx-runtime";
import Cookie from "https://esm.sh/js-cookie@3.0.5";

interface MenuType {
  hira: string;
  name: string;
  municipalities: string;
  CLASS_AREA_CODE: string;
  OFFICES_AREA_CODE: string;
}

interface HomeType {
  state: State;
  links: MenuType[];
}

interface FavoriteCampusDataType {
  name: string;
  municipalities: string;
  warning: JSX.Element[] | "無し";
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

function AlertView(props: FavoriteCampusDataType): JSX.Element {
  if (props.warning == "無し") {
    return (
      <p class="text-white font-bold bg-gray-500 inline-block p-1 rounded-lg text-sm">
        発表警報・注意報は無し
      </p>
    );
  }
  return <>{props.warning.map((data) => data)}</>;
}

export default function Home({ links }: HomeType) {
  const [searchMenu, setSearchMenu] = useState("");
  const [menu, setMenu] = useState(links);

  useEffect(() => {
    if (searchMenu === "") {
      setMenu(links);
    } else {
      const regex = new RegExp(searchMenu, "i");
      const filteredLinks = links.filter((menu) => regex.test(menu.name));
      setMenu(filteredLinks);
    }
  }, [searchMenu, links]);

  const [favoriteCampus, setFavoriteCampus] = useState<MenuType[]>(() => {
    const cookie_data = Cookie.get("favoriteCampus");
    if (!cookie_data) {
      return [];
    }
    let favoriteCampus_by_cookie: MenuType[] = [];
    for (const data in cookie_data.split(",")) {
      if (
        !cookie_data.split(",")[data] ||
        favoriteCampus_by_cookie.length > 3
      ) {
        break;
      }
      const filtered = menu.find(
        (element) => element.name == cookie_data.split(",")[data]
      )!;
      favoriteCampus_by_cookie.push(filtered);
    }
    return favoriteCampus_by_cookie;
  });
  const [alertData, setAlertData] = useState<FavoriteCampusDataType[]>([]);

  useEffect(() => {
    (async () => {
      let cookie = "";
      let NewFavoriteCampusData: FavoriteCampusDataType[] = [];
      for (let i = 0; i < favoriteCampus.length; i++) {
        cookie += favoriteCampus[i].name + ",";
        const res = await fetch(
          `https://www.jma.go.jp/bosai/warning/data/warning/${favoriteCampus[i]["OFFICES_AREA_CODE"]}.json`
        );
        res.json().then((resData) => {
          for (
            let j = 0;
            j < (resData["areaTypes"][1]["areas"] as unknown[]).length;
            j++
          ) {
            if (
              resData["areaTypes"][1]["areas"][j]["code"] ==
              favoriteCampus[i]["CLASS_AREA_CODE"]
            ) {
              const warningsData =
                resData["areaTypes"][1]["areas"][j]["warnings"];
              let warning_data: JSX.Element[] = [];
              for (let k = 0; k < (warningsData as unknown[]).length; k++) {
                const warning = warningsData[k];
                if (
                  warning["status"] == "解除" ||
                  warning["status"] == "発表警報・注意報はなし"
                ) {
                  break;
                } else {
                  if (transweather[warning["code"]].endsWith("特別警報")) {
                    warning_data.push(
                      <p class="text-white bg-purple-500 inline-block p-1 rounded-lg text-sm">
                        {transweather[warning["code"]]}
                      </p>
                    );
                  } else if (transweather[warning["code"]].endsWith("警報")) {
                    warning_data.push(
                      <p class="text-white bg-red-500 inline-block p-1 rounded-lg text-sm">
                        {transweather[warning["code"]]}
                      </p>
                    );
                  } else {
                    warning_data.push(
                      <p class="text-white bg-yellow-500 inline-block p-1 rounded-lg text-sm">
                        {transweather[warning["code"]]}
                      </p>
                    );
                  }
                }
              }
              if (!warning_data[0]) {
                NewFavoriteCampusData.push({
                  name: favoriteCampus[i]["name"],
                  municipalities: favoriteCampus[i]["municipalities"],
                  warning: "無し",
                });
              } else {
                NewFavoriteCampusData.push({
                  name: favoriteCampus[i]["name"],
                  municipalities: favoriteCampus[i]["municipalities"],
                  warning: warning_data,
                });
              }
              break;
            }
          }
        });
      }
      Cookie.set("favoriteCampus", cookie);
      setAlertData(NewFavoriteCampusData);
    })();
  }, [favoriteCampus]);

  useEffect(() => {
    const filtered = links.filter((link) => {
      let flag = true;
      for (let i = 0; i < alertData.length; i++) {
        if (alertData[i].name == link.name) flag = false;
      }
      return flag;
    });
    setMenu(filtered);
  }, [alertData]);

  const deleteFavoriteCampus = (name: string) => {
    const filtered = favoriteCampus.filter((menu) => menu.name != name);
    setFavoriteCampus(filtered);
  };

  return (
    <>
      <div class="bg-gray-100">
        <div class="container mx-auto px-4 py-8">
          <div class="mb-8">
            <h2 class="text-xl font-bold my-3">📌マイキャンパス</h2>
            <div>
              {alertData.map((data) => (
                <div class="bg-white rounded-lg shadow-lg p-4 mb-4">
                  <div class="flex items-center mb-2">
                    <p class="font-bold text-gray-600 text-sm">{data.municipalities}</p>
                  </div>
                  <div class="flex mb-2">
                    <p class="text-2xl font-bold">{data.name}キャンパス</p>
                  </div>
                  <div class="mb-2">
                    <AlertView
                      warning={data.warning}
                      name={data.name}
                      municipalities={data.municipalities}
                    ></AlertView>
                  </div>
                  <div class="text-right">
                    <button
                      class="bg-red-500 text-white rounded-full w-6 h-6 hover:bg-red-600 duration-500"
                      onClick={() => {
                        deleteFavoriteCampus(data.name);
                      }}
                    >
                      ー
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div class="my-3">
              <h2 class="text-xl font-bold my-3">🗾キャンパス一覧</h2>

              <p class="font-bold text-gray-600 text-sm">
                <span class="bg-green-500 text-white rounded-full w-7 h-7 mx-1">
                  ＋
                </span>
                からマイキャンパスに登録をすることにより、登録したキャンパスの気象警報を3つまで見ることが出来ます。
              </p>
            </div>
            <div class="m-3">
              <input
                type="text"
                id="search"
                placeholder="キャンパス名や市区町村名から検索"
                class="bg-transparent outline-none rounded-full bg-white p-2 border-2 border-gray-500 w-full"
                value={searchMenu}
                onChange={(e) => {
                  setSearchMenu((e.target as HTMLInputElement).value);
                }}
              />
            </div>
            <div>
              {menu.map((menuItem) => (
                <div class="bg-white rounded-lg shadow-lg p-4 mb-4">
                  <div class="flex items-center mb-2">
                    <p class="font-bold text-gray-600 text-sm">{menuItem.municipalities}</p>
                  </div>
                  <div class="flex items-center mb-2">
                    <div class="text-2xl font-bold">
                      {menuItem.name}キャンパス
                    </div>
                  </div>
                  <div class="text-right">
                    <button
                      class="bg-green-500 text-white rounded-full w-6 h-6 hover:bg-green-600 duration-500"
                      onClick={() => {
                        if (favoriteCampus.length == 3) {
                          return;
                        } else {
                          setFavoriteCampus([...favoriteCampus, menuItem]);
                        }
                      }}
                    >
                      ＋
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
