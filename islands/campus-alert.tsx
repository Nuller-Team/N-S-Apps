import { useEffect, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { asset } from "$fresh/runtime.ts";

interface MenuType {
  name: string;
  municipalities: string;
  CLASS_AREA_CODE: string;
  OFFICES_AREA_CODE: string;
}

interface HomeType {
  links: { [key: string]: MenuType };
  href: URL;
}

interface MenuWithKey extends MenuType {
  key: string;
}

export default function Home({ links, href }: HomeType): JSX.Element {
  const [searchMenu, setSearchMenu] = useState("");
  const [menu, setMenu] = useState<MenuWithKey[]>(
    Object.entries(links).map(([key, value]) => ({ ...value, key })),
  );

  useEffect(() => {
    if (searchMenu === "") {
      setMenu(Object.entries(links).map(([key, value]) => ({ ...value, key })));
    } else {
      const regex = new RegExp(searchMenu, "i");
      const filteredLinks = Object.entries(links)
        .map(([key, value]) => ({ ...value, key }))
        .filter(
          (menu) => regex.test(menu.name) || regex.test(menu.municipalities),
        );
      setMenu(filteredLinks);
    }
  }, [searchMenu, links]);

  return (
    <>
      <div class="bg-gray-100">
        <div class="container mx-auto px-4 py-8">
          <div class="m-3">
            <input
              type="text"
              id="search"
              placeholder="キャンパス名や市区町村名から検索"
              class="bg-transparent outline-none rounded-full bg-white p-2 border-2 border-gray-500 w-full"
              value={searchMenu}
              onInput={(e) =>
                setSearchMenu((e.target as HTMLInputElement).value)}
            />
          </div>
          <div>
            {menu.map((menuItem) => (
              <a
                href={new URL(asset(`campus-alert/${menuItem.key}`), href).href}
              >
                <div
                  key={menuItem.key}
                  class="bg-white rounded-lg shadow-lg p-4 mb-4"
                >
                  <div class="flex items-center mb-2">
                    <p class="font-bold text-gray-600 text-sm">
                      {menuItem.municipalities}
                    </p>
                  </div>
                  <div class="flex items-center mb-2">
                    <div class="text-2xl font-bold">
                      <p class={"underline"}>{menuItem.name}キャンパス</p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
