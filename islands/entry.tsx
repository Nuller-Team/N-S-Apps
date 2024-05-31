import { useState } from "preact/hooks";
import Modal from "@/components/modal.tsx";
import IconCheck from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/check.tsx";
import { State } from "@/routes/_middleware.ts";

interface propsType {
  state: State
}

export default function EntryForm(props: propsType) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const submitEvent = () => {
    setIsOpen(true);
  };
  return (
    <>
      <div>
        <form
          action="https://docs.google.com/forms/d/e/1FAIpQLScnUX3UeRMucvcmXl_4IaAR_cn-zBpG2Oan6sTvD2vMEBBF6w/formResponse"
          method="POST"
          target="hidden_iframe"
          onSubmit={submitEvent}
        >
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="name">
              お名前
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:(cursor-not-allowed)"
              id="name"
              disabled={true}
              type="text"
              name="entry.1813499992"
              value={props.state.user?.name}
              required
            >
            </input>
          </div>
          <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="entry.1813499992"
              value={props.state.user?.name}
              required
              hidden={true}
            ></input>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="email">
              メールアドレス
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:(cursor-not-allowed)"
              id="email"
              type="email"
              disabled={true}
              value={props.state.user?.email}
              name="entry.559509131"
              required
            >
            </input>
          </div>
          <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:(cursor-not-allowed)"
              id="email"
              type="email"
              disabled={false}
              value={props.state.user?.email}
              name="entry.559509131"
              required
              hidden={true}
            >
            </input>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="github">
              Discord
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="discord"
              type="text"
              name="entry.444286507"
              placeholder="example#1234"
              required
            >
            </input>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="github">
              GitHub(ある場合)
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="github"
              type="text"
              placeholder="https://github.com/..."
              name="entry.2001454305"
            >
            </input>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="X">
              X(ある場合)
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="x"
              type="text"
              placeholder="https://x.com/..."
              name="entry.2069824763"
            >
            </input>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="message">
              スキル・実績
            </label>
            <textarea
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="開発以外のことでも構いません。ない場合は「特になし」と入力してください"
              name="entry.934917006"
            >
            </textarea>
          </div>
          <div class="flex items-center justify-between">
            <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            value={"送信する"}
            ></input>
          </div>
        </form>
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
                Nullerに応募しました
              </h3>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}
