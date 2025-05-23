import { useEffect, useState } from "preact/hooks";
import { DateTime, datetime, diffInMillisec } from "ptera";
import { h } from "preact";
import { State } from "@/routes/_middleware.ts";

interface propsType {
  state: State;
}

const options = [
  { value: 4, label: "4月生" },
  { value: 7, label: "7月生" },
  { value: 10, label: "10月生" },
  { value: 1, label: "1月生" },
];

export default function TIMES({ state }: propsType) {
  const scData = state.user?.school!;
  const [haveUsed, setHaveUsed] = useState<boolean>(false);
  const [GraduationDate, setGraduationDate] = useState<DateTime>(() => {
    if (scData.admission_month) {
      let Graduation_year = 2000 + 20 + scData.gen + 3;
      if (scData.name == "N") {
        Graduation_year = 2000 + 15 + scData.gen + 3;
      }
      setHaveUsed(true);
      if (scData.admission_month == "4") {
        return datetime(`${Graduation_year}-04-01 00:00`).toZonedTime(
          "asia/Tokyo",
        );
      }
      if (scData.admission_month == "7") {
        return datetime(`${Graduation_year}-07-01 00:00`).toZonedTime(
          "asia/Tokyo",
        );
      }
      if (scData.admission_month == "10") {
        return datetime(`${Graduation_year}-10-01 00:00`).toZonedTime(
          "asia/Tokyo",
        );
      }
      if (scData.admission_month == "1") {
        return datetime(`${Graduation_year + 1}-01-01 00:00`).toZonedTime(
          "asia/Tokyo",
        );
      }
    }
    return datetime().toZonedTime("asia/Tokyo");
  });
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [time, setTime] = useState(
    diffInMillisec(GraduationDate, datetime().toZonedTime("asia/Tokyo")),
  );

  useEffect(() => {
    const intervalID = setInterval(() => tick(), 1000);
    return () => clearInterval(intervalID);
  }, [GraduationDate]);

  const tick = () => {
    const today = datetime().toZonedTime("asia/Tokyo");
    const times = diffInMillisec(GraduationDate, today);
    setTime(times);
  };

  const handleChange = (
    event: h.JSX.TargetedEvent<HTMLSelectElement, Event>,
  ) => {
    const selectedValue = parseInt(event.currentTarget.value);
    setSelectedOption(
      options.find((option) => option.value === selectedValue)!,
    );
  };

  const decision_admission_month = () => {
    let Graduation_year = 2000 + 20 + scData.gen + 3;
    if (scData.name == "N") {
      Graduation_year = 2000 + 15 + scData.gen + 3;
    }
    if (selectedOption.value == 4) {
      setGraduationDate(
        datetime(`${Graduation_year}-04-01 00:00`).toZonedTime("asia/Tokyo"),
      );
    }
    if (selectedOption.value == 7) {
      setGraduationDate(
        datetime(`${Graduation_year}-07-01 00:00`).toZonedTime("asia/Tokyo"),
      );
    }
    if (selectedOption.value == 10) {
      setGraduationDate(
        datetime(`${Graduation_year}-10-01 00:00`).toZonedTime("asia/Tokyo"),
      );
    }
    if (selectedOption.value == 1) {
      setGraduationDate(
        datetime(`${Graduation_year + 1}-01-01 00:00`).toZonedTime(
          "asia/Tokyo",
        ),
      );
    }
    setHaveUsed(true);
  };

  return (
    <>
      <div hidden={!haveUsed}>
        <div className="font-bold text-center text-xl md:text-2xl lg:text-3xl 2xl:text-4xl">
          あなたが{scData.name}高を卒業するまで<br />
          <a
            className="text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl text-blue-400"
            onClick={() => {
              setHaveUsed(false);
            }}
          >
            {Math.floor(time / 1000)}
          </a>
          <br />
          秒が残っています
        </div>
      </div>
      <div hidden={haveUsed} class="w-full">
        <div class="flex flex-col items-center justify-center h-screen  bg-gray-100">
          <label
            for="dropdown"
            class="text-xl md:text-2xl lg:text-3xl font-bold mb-2 py-2"
          >
            何月生か選択
          </label>
          <select
            id="dropdown"
            name="dropdown"
            value={selectedOption.value}
            onChange={handleChange}
            class="rounded-lg px-10 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
          <div class="p-2" />
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-16 flex items-start justify-center"
            onClick={decision_admission_month}
          >
            決定
          </button>
        </div>
      </div>
    </>
  );
}
