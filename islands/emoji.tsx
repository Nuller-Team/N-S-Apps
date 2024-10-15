import { useRef, useState } from "preact/hooks";
import { JSX } from "preact";

interface EmojiData {
  text: string;
  fontColor: string;
}

export default function EmojiGenerator() {
  const [emojiData, setEmojiData] = useState<EmojiData>({
    text: "",
    fontColor: "#FF0000",
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(false);

  const handleTextChange = (value: string) => {
    setEmojiData((prevData) => ({
      ...prevData,
      text: value,
    }));
    setIsWarningVisible(false);
  };

  const handleFontColorChange = (value: string) => {
    setEmojiData((prevData) => ({
      ...prevData,
      fontColor: value,
    }));
  };

  const handleGenerateEmoji = () => {
    const lines = emojiData.text.split("\n");
    if (lines.length > 2) {
      setIsWarningVisible(true);
      return;
    }

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, 128, 128);
      if (ctx) {
        ctx.clearRect(0, 0, 128, 128);
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        ctx.fillStyle = emojiData.fontColor;

        const maxFontSize = 128;
        const lineHeight = 50;
        let fontSize = maxFontSize;

        if (lines.length > 1) {
          fontSize = Math.min(maxFontSize, (128 - 20) / lines.length);
        }

        for (let i = 0; i < lines.length; i++) {
          ctx.font = `bold ${fontSize}px Arial`;
          if (lines.length === 1) {
            ctx.fillText(lines[i], 64, 48 + i * lineHeight + fontSize / 2, 120);
          } else {
            ctx.fillText(lines[i], 64, 32 + i * lineHeight + fontSize / 2, 120);
          }
        }

        const dataURL = canvas.toDataURL();
        openModal(dataURL);
      }
    }
  };

  const openModal = (imageURL: string) => {
    const modalContent = (
      <div className="flex justify-center items-center">
        <div className="bg-white p-4 rounded shadow-md">
          <img
            src={imageURL}
            alt="Generated Emoji"
            className="w-[40vh] h-[40vh] mx-auto my-4"
          />
          <p>長押し or 右クリックで保存できます。</p>
          <button
            onClick={() => setIsModalOpen(false)}
            className="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-800 transition duration-300 font-bold"
          >
            閉じる
          </button>
        </div>
      </div>
    );

    setModalContent(modalContent);
    setIsModalOpen(true);
  };

  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  return (
    <div className="flex items-center justify-center">
      <div className="w-[80vh] min-h-screen m-4">
        <canvas ref={canvasRef} class="hidden" width="128" height="128" />
        <div className="bg-white px-20 py-10 rounded shadow-md">
          <div className="mb-4">
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              絵文字にしたい文字を入力
            </label>
            <textarea
              className="w-full border border-gray-300 px-3 py-2 rounded"
              value={emojiData.text}
              onChange={(e) =>
                handleTextChange((e.target as HTMLInputElement).value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="fontColor"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              フォントカラーを選択
            </label>
            <select
              value={emojiData.fontColor}
              onChange={(e) =>
                handleFontColorChange((e.target as HTMLInputElement).value)}
              className="border border-gray-300 w-full h-10 mb-3 rounded-md"
            >
              <option value="#FF0000">赤</option>
              <option value="#8AC75A">緑</option>
              <option value="#ffa34d">オレンジ</option>
              <option value="#c194f6">紫</option>
              <option value="#C7B299">モカ</option>
              <option value="#1B1464">ダークブルー</option>
              <option value="#FF837C">サーモンピンク</option>
              <option value="#808080">グレー</option>
              <option value="#000000">ブラック</option>
              <option value="#f89992">パステルピンク</option>
              <option value="#0ac4ff">スカイブルー</option>
            </select>
          </div>
          <button
            onClick={handleGenerateEmoji}
            className="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-800 transition duration-300 font-bold"
          >
            絵文字を生成
          </button>
        </div>
        {isWarningVisible && (
          <div className="text-red-500 mt-2">
            2行以上のテキストは生成できません。
          </div>
        )}
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
            {modalContent}
          </div>
        )}
      </div>
    </div>
  );
}
