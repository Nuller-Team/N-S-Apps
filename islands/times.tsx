import { useState, useEffect } from "preact/hooks";
import { h } from "preact";
import { State } from "../types/session.ts";
import { time as date } from "https://deno.land/x/time.ts@v2.0.1/mod.ts";

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
  const [haveUsed, setHaveUsed] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [error, setError] = useState("");
  const [EnrollmentDate, setEnrollmentDate] = useState<Date>(
    date().tz("asia/Tokyo").t
  );
  useEffect(() => {
    if (state.admission_month) {
      if (state.admission_month == "4") setSelectedOption(options[0]);
      if (state.admission_month == "7") setSelectedOption(options[1]);
      if (state.admission_month == "10") setSelectedOption(options[2]);
      if (state.admission_month == "1") setSelectedOption(options[3]);
      setHaveUsed(true);
    }
  }, []);

  useEffect(() => {
    let Enrollment_year = 2000 + 20 + state.gen;
    if (state.school == "N") {
      Enrollment_year = 2000 + 15 + state.gen;
    }
    if (selectedOption.value == 4) {
      setEnrollmentDate(
        date(`${Enrollment_year}-04-01 00:00`).tz("asia/Tokyo").t
      );
    } else if (selectedOption.value == 7)
      setEnrollmentDate(
        date(`${Enrollment_year}-07-01 00:00`).tz("asia/Tokyo").t
      );
    else if (selectedOption.value == 10)
      setEnrollmentDate(
        date(`${Enrollment_year}-10-01 00:00`).tz("asia/Tokyo").t
      );
    else if (selectedOption.value == 1)
      setEnrollmentDate(
        date(`${Enrollment_year + 1}-01-01 00:00`).tz("asia/Tokyo").t
      );
  }, [selectedOption.value]);
  useEffect(() => {
    const intervalID = setInterval(() => tick(), 1000);
    return () => clearInterval(intervalID);
  }, [selectedOption.value, haveUsed]);

  const [time, setTime] = useState(new Date(daysBetween(EnrollmentDate)));
  const tick = () => {
    setTime(new Date(daysBetween(EnrollmentDate)));
  };

  const handleChange = (
    event: h.JSX.TargetedEvent<HTMLSelectElement, Event>
  ) => {
    const selectedValue = parseInt(event.currentTarget.value);
    setSelectedOption(
      options.find((option) => option.value === selectedValue)!
    );
  };

  const decision_admission_month = async () => {
    setError("");
    const res = await fetch(
      `/api/admission_month?month=${selectedOption.value}`
    );
    console.log(selectedOption.value);
    res
      .json()
      .catch((e) => {
        setError("⛔️予期せぬエラーが発生しました⛔️");
      })
      .then((data) => {
        if (data["status"] == "Error") {
          setError(data["text"]);
        } else {
          setHaveUsed(true);
        }
      });
  };

  function daysBetween(startDate: Date) {
    const today = date().tz("asia/Tokyo").t;
    const diff = today.getTime() - startDate.getTime();
    return diff;
  }

  return (
    <>
      <div hidden={!haveUsed}>
        <div className="font-bold text-center text-xl md:text-2xl lg:text-3xl 2xl:text-4xl">
          あなたが{state.school}高に入ってから<br></br>
          <a
            className="text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl text-green-400"
            onClick={() => {
              setHaveUsed(false);
            }}
          >
            {Math.floor(time.getTime() / 1000)}
          </a>
          <br></br>
          秒が経過しています
        </div>
      </div>
      <div hidden={haveUsed}>
        <div class="flex flex-col items-center justify-center h-screen w-screen bg-gray-100">
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
          <div class="p-2"></div>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring w-16 flex items-start justify-center"
            onClick={decision_admission_month}
          >
            決定
          </button>
          <p class="text-red-400 font-bold">{error}</p>
        </div>
      </div>
    </>
  );
}
