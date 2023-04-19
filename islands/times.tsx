import { useState, useEffect } from "preact/hooks";
import { State } from "../types/session.ts";
import {
  time as date,
} from "https://deno.land/x/time.ts@v2.0.1/mod.ts";

interface propsType {
  state: State;
}

function daysBetween(startDate: Date) {
  const today = date().tz("asia/Tokyo").t;
  const diff = today.getTime() - startDate.getTime();
  return diff;
}

function daysLeft(endDate: Date) {
  const today = date().tz("asia/Tokyo").t;
  const diff = endDate.getTime() - today.getTime();
  return diff;
}

export default function TIMES({ state }: propsType) {
  let Enrollment_date: Date;
  if (state.school == "N") {
    const Enrollment_year = 2000 + 15 + state.gen;
    Enrollment_date = date(`${Enrollment_year}-04-01 00:00`).tz("asia/Tokyo").t;
  } else {
    const Enrollment_year = 2000 + 20 + state.gen;
    Enrollment_date = date(`${Enrollment_year}-04-01 00:00`).tz("asia/Tokyo").t;
  }
  const [time, setTime] = useState(new Date(daysBetween(Enrollment_date)));

  useEffect(() => {
    const intervalID = setInterval(() => tick(), 1000);
    return () => clearInterval(intervalID);
  }, []);

  const tick = () => {
    setTime(new Date(daysBetween(Enrollment_date)));
  };

  /*const years = time.getUTCFullYear() - 1970;
  const months = time.getUTCMonth().toString().padStart(2, "0");
  const days = time.getUTCDate().toString().padStart(2, "0");
  const hours = time.getUTCHours().toString().padStart(2, "0");
  const minutes = time.getUTCMinutes().toString().padStart(2, "0");
  const seconds = time.getUTCSeconds().toString().padStart(2, "0");*/

  const times = Math.floor(time.getTime() / 1000);

  return (
    <>
      <div className="font-bold text-center text-xl md:text-2xl lg:text-3xl 2xl:text-4xl">
        あなたが{state.school}高に入ってから<br></br>
        <span className="text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl text-green-400 rounded-md">
          {times}
        </span>
        <br></br>
        秒が経過しています
      </div>
    </>
  );
}
