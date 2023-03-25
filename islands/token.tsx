import { useState } from "preact/hooks";

export default function TOKEN() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fetchToken = async () => {
    console.log(name);
    if (name == "") {
      setError("⚠️ハンドルネームが空白です！⚠️");
      setSuccess("");
      return;
    }
    setError("");
    const res = await fetch(`api/token?name=${name}`);
    res.json().catch((e) => {
      setError("⛔️予期せぬエラーが発生しました⛔️");
      setSuccess("");
    }).then((data) => {
      if (data["status"] == "Error") {
        setError(data["text"]);
      } else {
        setError("");
        setSuccess(`✅確認用URLを発行しました✅
\n${data["text"]}`);
      }
    });
  };
  return (
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
      <p class="text-green-400 font-bold">{success}</p>
    </div>
  );
}
