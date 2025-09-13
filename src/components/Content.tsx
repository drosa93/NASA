import { useState } from "react";
import ButtonUsage from "./Button";

interface NasaData {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: "image" | "video";
  title: string;
  url: string;
}

const Content = () => {
  const [date, setDate] = useState<string>("");
  const [data, setData] = useState<NasaData | null>(null);

  const today = new Date()
  const milliseconds = Number(today.getTime())
  const chosenDate = new Date(date)
  const chosenDateMilli = Number(chosenDate.getTime())

  const warning = milliseconds < chosenDateMilli && (<p className="flex justify-center text-lg text-red-500 m-2">Please Select a date from the past</p>)

  const getFetch = async () => {
    try {
      const url = `https://api.nasa.gov/planetary/apod?api_key=1LUwIRcAlbjUSdQM9Belc5vOhNR3lOsqEJZH2rWX&date=${date}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch NASA data");
      const json: NasaData = await res.json();
      setData(json);
    } catch (err) {
      console.error("error", err);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="flex justify-center text-2xl font-semibold text-[#ffffff] m-4">
        Picture of the day
      </h2>
      <div className={`p-4`}>
        <div className="flex justify-center">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border bg-white p-2 mr-2"
          />
          <ButtonUsage text={"get Nasa Data"} onclick={getFetch} />
        </div>
          {warning}
        {data && (
          <div className=" mt-4">
            {data.media_type === "image" ? (
              <div className="max-w-full h-auto">
                <img
                  src={data.hdurl}
                  alt={data.title}
                  className="max-w-full rounded"
                />
              </div>
            ) : (
              <iframe
                src={data.url}
                title="nasa-video"
                className="w-full h-96 rounded"
              ></iframe>
            )}
            <h2 className="flex justify-center text-xl font-semibold text-[#fe0000] m-4">
              {data.title}
            </h2>
            <h3 className="mt-2 font-semibold text-[#ffffff]">
              {data.explanation}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
