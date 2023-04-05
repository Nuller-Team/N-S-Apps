import { useState } from "preact/hooks";
import IconCheck from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/check.tsx";
import IconCopy from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/copy.tsx";

import Modal from "@/components/token/modal.tsx";

export default function TOKEN() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [copy, setCopy] = useState("");
  const [token, setToken] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fetchToken = async () => {
    console.log(name);
    if (name == "") {
      setError("⚠️ハンドルネームが空白です！⚠️");
      return;
    }
    setError("");
    const res = await fetch(`api/token?name=${name}`);
    res.json().catch((e) => {
      setError("⛔️予期せぬエラーが発生しました⛔️");
    }).then((data) => {
      if (data["status"] == "Error") {
        setError(data["text"]);
      } else {
        setError("");
        setToken(data["text"]);
        setCopy("");
        setIsOpen(true);
      }
    });
  };
  const token_cp = async () => {
    await globalThis.navigator.clipboard.writeText(token);
    setCopy("Copied!")
  };
  return (
    <>
      <div>
        <div class="p-1">
          <input
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={name}
            onChange={(e) => setName((e.target as HTMLInputElement).value)}
            placeholder="handle name"
          >
          </input>
        </div>
        <div class="p-0.5"></div>
        <button
          onClick={fetchToken}
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-16 flex items-start justify-center"
        >
          <p>作成</p>
        </button>
        <p class="text-red-400 font-bold">{error}</p>
      </div>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isNoBackdropClose={false}
        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
      >
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
              <IconCheck class="w-8 h-8" />
            </div>
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3
                class="text-base font-semibold leading-6 text-gray-900"
                id="modal-title"
              >
                確認用URLを発行しました
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {token}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
            onClick={() => {setIsOpen(false);}}
          >
            Close
          </button>
          <IconCopy class="w-8 h-8" onClick={token_cp}/>
          <h5>{copy}</h5>
        </div>
      </Modal>
    </>
  );
}
