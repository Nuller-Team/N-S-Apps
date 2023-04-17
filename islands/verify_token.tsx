import { useState } from "preact/hooks";
import Title from "../components/title.tsx";

type VerifyTokenType = {
  token: string;
};

export default function VerifyToken(props: VerifyTokenType) {
  const [isVerify, setIsVerify] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState(
    "bg-pink-400 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-full flex items-center justify-center"
  );

  const fetchVerifyToken = async () => {
    setName("");
    const res = await fetch(`/api/verify_token?token=${props.token}`);
    res
      .json()
      .catch((e) => {
        setName("⛔️予期せぬエラーが発生しました⛔️");
        setColor(
          "bg-red-400 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-full flex items-center justify-center"
        );
        setIsVerify(true);
      })
      .then((data) => {
        if (data["status"] == "Error") {
          setName(data["text"]);
          setColor(
            "bg-red-400 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-full flex items-center justify-center"
          );
          setIsVerify(true);
        } else {
          setName(data["text"] + "はN/S高生です");
          setColor(
            "bg-green-400 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-full flex items-center justify-center"
          );
          setIsVerify(true);
        }
      });
  };

  return (
    <>
      <Title name="N/S Checker">
        <div class="bg-white shadow-md rounded-md p-8 w-full sm:w-[30rem]">
          <div class="mb-6">
            <div hidden={isVerify}>
              <button
                class="bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-full flex items-center justify-center"
                onClick={fetchVerifyToken}
              >
                <i class="mr-2"></i> N/S高生か確認する
              </button>
            </div>
            <div hidden={!isVerify}>
              <div class={color}>
                <i class="mr-2"></i> {name}
              </div>
            </div>
          </div>
        </div>
      </Title>
    </>
  );
}
