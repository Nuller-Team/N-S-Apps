type AlertProps = {
    message: string;
    link: string;
  };
export default function Alert({ message, link }: AlertProps) {
    return (
      <div
        class={` bg-red-700 text-white`}
      >
        <div class="m-auto flex md:flex-row flex-col gap-x-4 gap-y-2 justify-center items-center p-2">
          <div>{message}</div>
          <a
            class="hover:text-red-700 hover:bg-white py-1 px-4 border-white border-2 rounded-[3px] transition"
            href={link}
          >
           詳細はこちら
          </a>
        </div>
      </div>
    );
  }