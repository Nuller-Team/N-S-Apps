import { useState } from "preact/hooks";

interface CounterProps {
  start: number;
}

export default function TOKEN() {
  const fetchToken = async ()=> {
    await fetch(`api/token`);
  }
  return (
    <div>
      <button onClick={fetchToken} class="bg-green-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-full flex items-center justify-center"></button>
    </div>
  );
}