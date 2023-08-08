import { useState, useRef } from "preact/hooks";
import { JSX } from "preact";

interface ProfileType {
    name: string,
    age: string,
    grade: string,
    gender: string,
    sns: string,
    freespace: string,
    hobby: string,
    color: string,
    fontColor: string,
}

export default function PROFILE() {
    const [profile, setProfile] = useState<ProfileType>({
        name: "",
        age: "",
        grade: "",
        gender: "",
        sns: "",
        freespace: "",
        hobby: "",
        color: "",
        fontColor: "#000",
    });

    const [backgroundImage, setBackgroundImage] = useState<string>("");
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
    const [uploadedIcon, setUploadedIcon] = useState<string>("");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const iconImageRef = useRef<HTMLImageElement>(null);
    const handleProfileChange = (key: keyof ProfileType, value: string) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            [key]: value,
        }));
    };
    const openModal = (imageURL: string) => {
        const content = (
            <div className="flex justify-center items-center">
                <div className="bg-white p-4 rounded shadow-md">
                    <img src={imageURL} alt="Generated Profile" className="w-60 h-60 mx-auto my-4" />
                    <p>長押し or 右クリックで保存しよう！</p>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    >
                        閉じる
                    </button>
                </div>
            </div>
        );
        setModalContent(content);
        setIsModalOpen(true);
    };

    const handleGenerateImage = () => {
        if (!backgroundImage) {
            alert("背景画像を選択してください。");
            return;
        }

        const canvas = canvasRef.current;

        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.clearRect(0, 0, 1600, 1600);
                const iconImage = iconImageRef.current;
                console.log(iconImage)
                const img = new Image();
                console.log(img)
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    if (iconImage) {
                        const iconSize = 420;
                        const iconX = 1040;
                        const iconY = 132;
                        ctx.save();
                        ctx.beginPath();
                        ctx.arc(iconX + iconSize / 2, iconY + iconSize / 2, iconSize / 2, 0, Math.PI * 2);
                        ctx.clip();
                        ctx.drawImage(iconImage, iconX, iconY, iconSize, iconSize);
                        ctx.restore();
                    }
                    ctx.font = "80px Yu Gothic";
                    ctx.fillStyle = profile.fontColor;
                    ctx.fillText(profile.name, 360, 400);
                    ctx.fillText(profile.age, 260, 540);
                    ctx.fillText(profile.grade, 360, 680);
                    ctx.fillText(profile.gender, 360, 840);
                    ctx.fillText(profile.sns, 1080, 800);
                    ctx.fillText(profile.hobby, 160, 1080);
                    ctx.fillText(profile.freespace, 160, 1400);
                    const dataURL = canvas.toDataURL();
                    setGeneratedImageUrl(dataURL);
                    openModal(dataURL);
                };
                img.src = backgroundImage;
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <canvas
                ref={canvasRef}
                className="border-2 border-black hidden"
                width="1600" height="1600"
            />
            <div class="bg-white p-8 rounded shadow-md">
                <h1 class="text-2xl font-semibold mb-4">N/S Profile</h1>
                <div class="mb-4 flex justify-center">

                </div>
                <div class="w-full">
                    <div class="mb-4">
                        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">名前</label>
                        <input
                            type="text"
                            class="w-full border border-gray-300 px-3 py-2 rounded"
                            value={profile.name}
                            onChange={(e) => handleProfileChange("name", (e.target as HTMLInputElement).value)}
                        />
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                    setUploadedIcon(event.target.result as string);
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                    {uploadedIcon && (
                        <img
                            ref={iconImageRef}
                            src={uploadedIcon}
                            alt="Uploaded Icon"
                            style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                        />
                    )}
                    <div class="mb-4">
                        <label for="age" class="block text-sm font-medium text-gray-700 mb-1">年齢</label>
                        <input
                            type="text"
                            class="w-full border border-gray-300 px-3 py-2 rounded"
                            value={profile.age}
                            onChange={(e) => handleProfileChange("age", (e.target as HTMLInputElement).value)}
                        />
                    </div>
                    <div class="mb-4">
                        <label for="grade" class="block text-sm font-medium text-gray-700 mb-1">学年</label>
                        <input
                            type="text"
                            class="w-full border border-gray-300 px-3 py-2 rounded"
                            value={profile.grade}
                            onChange={(e) => handleProfileChange("grade", (e.target as HTMLInputElement).value)}
                        />
                    </div>
                    <div class="mb-4">
                        <label for="gender" class="block text-sm font-medium text-gray-700 mb-1">性別</label>
                        <input
                            type="text"
                            class="w-full border border-gray-300 px-3 py-2 rounded"
                            value={profile.gender}
                            onChange={(e) => handleProfileChange("gender", (e.target as HTMLInputElement).value)}
                        />
                    </div>
                    <div class="mb-4">
                        <label for="SNS" class="block text-sm font-medium text-gray-700 mb-1">趣味</label>
                        <textarea
                            type="text"
                            class="w-full border border-gray-300 px-3 py-2 rounded"
                            value={profile.hobby}
                            onChange={(e) => handleProfileChange("hobby", (e.target as HTMLInputElement).value)}
                        />
                    </div>
                    <div class="mb-4">
                        <label for="SNS" class="block text-sm font-medium text-gray-700 mb-1">自由欄</label>
                        <textarea
                            type="text"
                            class="w-full border border-gray-300 px-3 py-2 rounded"
                            value={profile.freespace}
                            onChange={(e) => handleProfileChange("freespace", (e.target as HTMLInputElement).value)}
                        />
                    </div>
                    <label for="gender" class="block text-sm font-medium text-gray-700 mb-1">背景</label>
                    <select
                        value={backgroundImage}
                        onChange={(e) => setBackgroundImage((e.target as HTMLSelectElement).value)}
                        class="data-te-select-init border-2 border-gray-700 w-full h-10 mb-3"
                    >
                        <option value="">背景を選択</option>
                        <option value="apps/profile/image/darkblue.png">シンプル-ダークブルー</option>
                        <option value="apps/profile/image/moka.png">シンプル-モカ</option>
                        <option value="apps/profile/image/pink.png">シンプル-ピンク</option>
                        <option value="apps/profile/image/pop_yellow.png">シンプル-ポップイエロー</option>
                    </select>
                    <label for="gender" class="block text-sm font-medium text-gray-700 mb-1">フォントカラー</label>
                    <select
                        value={profile.fontColor}
                        onChange={(e) => handleProfileChange("fontColor", (e.target as HTMLSelectElement).value)}
                        class="data-te-select-init border-2 border-gray-700 w-full h-10 mb-3"
                    >
                        <option value="">テキストカラーを選択</option>
                        <option value="#FF69B4">ピンク</option>
                        <option value="#8B4513">モカ</option>
                        <option value="#A52A2A">ブラウン</option>
                        <option value="#0000FF">ブルー</option>
                        <option value="#000000">黒</option>
                        <option value="#FFFFFF">ホワイト</option>
                        <option value="#008000">緑</option>
                        <option value="#808080">グレー</option>
                    </select>
                    <button
                        onClick={handleGenerateImage}
                        class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                        画像を生成
                    </button>
                </div>

                {isModalOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        {modalContent}
                    </div>
                )}
            </div>
        </div>
    );
}
