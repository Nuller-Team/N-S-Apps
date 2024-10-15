import { useEffect, useState } from "preact/hooks";

interface MenuType {
  tag: string;
  name: string;
  links: string;
  emoji: string;
}

interface SaizencodeTypes {
  links: MenuType[];
}

export default function PAGES({ links }: SaizencodeTypes) {
  const [searchMenu, setSearchMenu] = useState("");
  const [menu, setMenu] = useState(links);
  useEffect(() => {
    if (searchMenu === "") {
      setMenu(links);
    } else {
      const regex = new RegExp(searchMenu, "i");
      const filteredLinks = links.filter(
        (menu) =>
          regex.test(menu.name) ||
          regex.test(menu.emoji) ||
          regex.test(menu.tag) ||
          regex.test(menu.links),
      );
      setMenu(filteredLinks);
    }
  }, [searchMenu, links]);

  return (
    <div class="container mx-auto px-4 py-8">
      <div class="flex m-4">
        <div class="relative w-full">
          <label>✅以下の欄から検索できます：</label>
          <input
            type="text"
            id="search"
            placeholder="部分一致で検索可能です。"
            value={searchMenu}
            onChange={(e) =>
              setSearchMenu((e.target as HTMLInputElement).value)}
            class="border-2 border-gray-400 rounded-full py-2 px-4 block w-full appearance-none leading-normal focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-2">
        {menu.map((menuItem) => (
          <div
            key={menuItem.name}
            class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4"
          >
            <a href={menuItem.links}>
              <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                <div class="px-3 py-4 h-100">
                  <h3 class="text-lg font-medium text-gray-800 mb-2 truncate">
                    {menuItem.name}
                  </h3>
                  <div class="text-sm text-gray-600 mb-4 truncate">
                    {menuItem.tag}
                  </div>
                  <div class="bg-amber-100 h-full text-blue-700 text-center py-20 text-5xl rounded-lg aspect-video justify-center flex">
                    {menuItem.emoji}
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
