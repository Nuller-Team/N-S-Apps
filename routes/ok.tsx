export default function Index() {
  return (
    <>
      <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">N/S CAPTCHA</h1>
        <div class="bg-white shadow-md rounded-md p-8 w-full sm:w-[30rem]">
          <div class="mb-6">
            <p
              class="bg-green-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-full flex items-center justify-center"
            >
              <i class="mr-2"></i> あなたはN/S高生です
            </p>
          </div>
          <p class="text-sm text-gray-500 text-center">
            <p class="mr-3">あなたの情報：</p>
          </p>
        </div>
      </div>
    </>
  );
}
