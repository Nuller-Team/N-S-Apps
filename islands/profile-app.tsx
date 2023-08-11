import { useState, useRef } from "preact/hooks";
import { JSX } from "preact";

interface ProfileType {
    name: string,
    grade: string,
    course: string,
    birthday: string,
    age: string,
    gender: string,
    broadtype: string,
    sns: string,
    hobby: string,
    special: string,
    freespace: string,
    color: string,
    fontColor: string,
}

export default function PROFILE() {
    const [profile, setProfile] = useState<ProfileType>({
        name: "",
        grade: "",
        course: "",
        birthday: "",
        age: "",
        gender: "",
        broadtype: "",
        sns: "",
        hobby: "",
        special: "",
        freespace: "",
        color: "",
        fontColor: "#C7B299",
    });

    const [backgroundImage, setBackgroundImage] = useState<string>("apps/profile/image/moka.png");
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
                    <img src={imageURL} alt="Generated Profile" class="w-[40vh] h-[40vh] mx-auto my-4" />
                    <p>長押し or 右クリックで保存できます。</p>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="w-full bg-sky-500 text-white py-2 rounded-full hover:bg-sky-600 transition duration-300 font-bold"
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

        const canvas = canvasRef.current;

        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.clearRect(0, 0, 1600, 1600);
                const iconImage = iconImageRef.current;
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    if (iconImage) {
                        const iconSize = 300;
                        const iconX = 62;
                        const iconY = 55;
                        ctx.save();
                        ctx.beginPath();
                        ctx.arc(iconX + iconSize / 2, iconY + iconSize / 2, iconSize / 2, 0, Math.PI * 2);
                        ctx.clip();
                        ctx.drawImage(iconImage, iconX, iconY, iconSize, iconSize);
                        ctx.restore();
                    }
                    const textLines = profile.freespace.split('\n');
                    const lineHeight = 60;
                    const startY = 1220;
                    ctx.font = "600 60px Yu Gothic";
                    ctx.fillStyle = profile.fontColor;
                    
                    ctx.fillText(profile.name, 600, 170);
                    ctx.fillText(profile.grade, 600, 320);
                    ctx.fillText(profile.course, 1150, 320);
                    ctx.fillText(profile.birthday, 320, 585);
                    ctx.fillText(profile.age, 780, 585);
                    ctx.fillText(profile.gender, 1180, 585);
                    ctx.fillText(profile.broadtype, 200, 780);
                    ctx.font = "600 50px Yu Gothic";
                    ctx.fillText(profile.sns, 700, 780);
                    ctx.font = "600 40px Yu Gothic";
                    ctx.fillText(profile.hobby, 200, 990);
                    ctx.fillText(profile.special, 900, 990);
                    textLines.forEach((line, index) => {
                        const y = startY + index * lineHeight;
                        ctx.fillText(line, 200, y);
                    });
                    const dataURL = canvas.toDataURL();
                    setGeneratedImageUrl(dataURL);
                    openModal(dataURL);
                };
                img.src = backgroundImage;
            }
        }
    };

    return (
        <div class="flex items-center justify-center">
            <div className="w-[80vh]  min-h-screen m-4">
                <canvas
                    ref={canvasRef}
                    className="hidden"
                    width="1600" height="1600"
                />
                <div class="bg-white px-20 py-10 rounded shadow-md">
                    <div class="mb-4 flex justify-center">

                    </div>
                    <div class="mb-4">
                        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">🙅名前</label>
                        <input
                            type="text"
                            class="w-full border border-gray-300 px-3 py-2 rounded"
                            value={profile.name}
                            onChange={(e) => handleProfileChange("name", (e.target as HTMLInputElement).value)}
                        />
                        <hr class="my-3"></hr>
                    </div>

                    <div class="mb-4">
                        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">🖼️アイコン</label>
                        <input
                            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-500 file:text-white     hover:file:bg-sky-600"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = (e.target as HTMLInputElement)?.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                        setUploadedIcon(event.target?.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                        {uploadedIcon && (
                            <img
                                ref={iconImageRef}
                                src={uploadedIcon}
                                alt="アイコン"
                                class="m-4"
                                style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                            />
                        )}
                    </div>
                    <hr class="my-3"></hr>
                    <div class="mb-4">
                        <label for="grade" class="block text-sm font-medium text-gray-700 mb-1">🎒学年</label>
                        <input
                            type="text"
                            class="w-full border border-gray-300 px-3 py-2 rounded"
                            value={profile.grade}
                            onChange={(e) => handleProfileChange("grade", (e.target as HTMLInputElement).value)}
                        />
                    </div>
                    <div class="mb-4">
                        <label for="course" class="block text-sm font-medium text-gray-700 mb-1">🏫コース</label>
                        <input
                            type="text"
                            class="w-full border border-gray-300 px-3 py-2 rounded"
                            value={profile.course}
                            onChange={(e) => handleProfileChange("course", (e.target as HTMLInputElement).value)}
                        />
                    </div>
                    <hr class="my-3"></hr>
                    <div class="mb-4">
                        <label for="birthday" class="block text-sm font-medium text-gray-700 mb-1">🎂誕生日</label>
                        <input
                            type="text"
                            class="w-full border border-gray-300 px-3 py-2 rounded"
                            value={profile.birthday}
                            onChange={(e) => handleProfileChange("birthday", (e.target as HTMLInputElement).value)}
                        />
                    </div>
                    <div class="mb-4">
                        <label for="age" class="block text-sm font-medium text-gray-700 mb-1">🔢年齢</label>
                        <input
                            type="text"
                            class="w-full border border-gray-300 px-3 py-2 rounded"
                            value={profile.age}
                            onChange={(e) => handleProfileChange("age", (e.target as HTMLInputElement).value)}
                        />
                    </div>
                    <hr class="my-3"></hr>
                    <div class="mb-4">
                        <label for="gender" class="block text-sm font-medium text-gray-700 mb-1">❓性別</label>
                        <input
                            type="text"
                            class="w-full border border-gray-300 px-3 py-2 rounded"
                            value={profile.gender}
                            onChange={(e) => handleProfileChange("gender", (e.target as HTMLInputElement).value)}
                        />
                    </div>
                    <div class="mb-4">
                        <label for="broadtype" class="block text-sm font-medium text-gray-700 mb-1">🩸血液型</label>
                        <input
                            type="text"
                            class="w-full border border-gray-300 px-3 py-2 rounded"
                            value={profile.broadtype}
                            onChange={(e) => handleProfileChange("broadtype", (e.target as HTMLInputElement).value)}
                        />
                    </div>
                    <hr class="my-3"></hr>
                    <div class="mb-4">
                        <label for="sns" class="block text-sm font-medium text-gray-700 mb-1">🌎SNS</label>
                        <input
                            type="text"
                            class="w-full border border-gray-300 px-3 py-2 rounded"
                            value={profile.sns}
                            onChange={(e) => handleProfileChange("sns", (e.target as HTMLInputElement).value)}
                        />
                    </div>
                    <hr class="my-3"></hr>
                    <div class="mb-4">
                        <label for="hobby" class="block text-sm font-medium text-gray-700 mb-1">✨趣味</label>
                        <input
                            type="text"
                            class="w-full border border-gray-300 px-3 py-2 rounded"
                            value={profile.hobby}
                            onChange={(e) => handleProfileChange("hobby", (e.target as HTMLInputElement).value)}
                        />
                    </div>
                    <div class="mb-4">
                        <label for="SNS" class="block text-sm font-medium text-gray-700 mb-1">👍特技</label>
                        <input
                            type="text"
                            class="w-full border border-gray-300 px-3 py-2 rounded"
                            value={profile.special}
                            onChange={(e) => handleProfileChange("special", (e.target as HTMLInputElement).value)}
                        />
                    </div>
                    <hr class="my-3"></hr>
                    <div class="mb-4">
                        <label for="SNS" class="block text-sm font-medium text-gray-700 mb-1">📖自由欄</label>
                        <textarea
                            type="text"
                            class="w-full border border-gray-300 px-3 py-2 rounded"
                            value={profile.freespace}
                            onChange={(e) => handleProfileChange("freespace", (e.target as HTMLInputElement).value)}
                        />
                    </div>
                    <hr class="my-3"></hr>
                    <label for="gender" class="block text-sm font-medium text-gray-700 mb-1">🎨背景</label>
                    <select
                        value={backgroundImage}
                        onChange={(e) => setBackgroundImage((e.target as HTMLSelectElement).value)}
                        class="data-te-select-init border border-gray-300 w-full h-10 mb-3 rounded-md"
                    >
                        <option value="">背景を選択</option>
                        <option value="apps/profile/image/moka.png">シンプル-モカ</option>
                        <option value="apps/profile/image/darkblue.png">シンプル-ダークブルー</option>
                        <option value="apps/profile/image/salmonpink.png">シンプル-サーモンピンク</option>
                        <option value="apps/profile/image/light-gray.png">シンプル-ライトグレー</option>
                        <option value="apps/profile/image/orange.png">シンプル-オレンジ</option>
                        <option value="apps/profile/image/black.png">シンプル-ブラック</option>
                        <option value="apps/profile/image/dark.png">シンプル-ダーク</option>
                    </select>
                    <label for="gender" class="block text-sm font-medium text-gray-700 mb-1">🎨フォントカラー</label>
                    <select
                        value={profile.fontColor}
                        onChange={(e) => handleProfileChange("fontColor", (e.target as HTMLSelectElement).value)}
                        class="data-te-select-init  border border-gray-300 w-full h-10 mb-3 rounded-md"
                    >
                        <option value="#C7B299">モカ</option>
                        <option value="#1B1464">ダークブルー</option>
                        <option value="#FF837C">サーモンピンク</option>
                        <option value="#808080">グレー</option>
                        <option value="#FBB03B">オレンジ</option>
                        <option value="#000000">ブラック</option>
                    </select>
                    <button
                        onClick={handleGenerateImage}
                        class="w-full bg-sky-500 text-white py-2 rounded-full hover:bg-sky-600 transition duration-300 font-bold"
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