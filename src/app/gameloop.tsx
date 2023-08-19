"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import Clicker, { Resource } from "./lib/Cliker2";
import { NumberFormatter } from "./lib/NumberFormater";
import { SaveType } from "./lib/ui";
import { GiArrowCursor } from "react-icons/gi";
import Upgrade from "@/components/upgrade";
import Buildings from "@/components/buildings";
import Options from "@/components/Options";
import { Toaster } from "react-hot-toast";
import Achievements from "@/components/Achivements";
function Gameloop() {
  const [state, setState] = useState(false);
  let game = useMemo(() => new Clicker(), []);
  useEffect(() => {
    const timer = setInterval(() => {
      game.increaseResource();
      setState((prevState) => !prevState);
    }, 200);

    // This will clear Timer on unmount
    return () => {
      clearInterval(timer);
    };
  }, [game]);
  useEffect(() => {
    const timer = setInterval(() => {
      localStorage.setItem("save", JSON.stringify(game.SaveGame()));
    }, 1000 * 60 * 5);

    return () => {
      clearInterval(timer);
    };
  }, [game]);
  useEffect(() => {
    let x = JSON.parse(localStorage.getItem("save")!) as SaveType | null;
    if (!x?.antimatterCondenser) {
      return;
    }
    game.LoadGame(x);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const numbers = NumberFormatter;
  return (
    <div className="grid grid-cols-8 flex-1 justify-center items-center">
      {" "}
      {/* bg-black text-white // Dev Dark Mode to Save my eyes*/}
      <div className="flex flex-col col-span-6 h-full">
        <div className="flex gap-4 p-4 bg-red-400 justify-between">
          <div>
            <h2 className="text-lg">
              {" "}
              Cookie {numbers.format(game.get_resources().cookies)} | Total CPS:{" "}
              {numbers.format(game.getPassiveResourceGeneration())} | Cookies
              Per Click : {numbers.format(game.getClickResourceGeneration())}
            </h2>
          </div>
          <div className="flex gap-4">
            <Achievements game={game} />
            <div className="text-lg">Statistics</div>
            <Options game={game} setState={setState} />
          </div>
        </div>
        <div className="flex  flex-1 justify-center items-center flex-col gap-4 relative">
          <Image
            className="absolute z-0 h-full w-full blur-sm"
            src={`/background.jpg`}
            width={2000}
            height={2000}
            alt="background"
          />
          <button
            className=" hover:scale-105 active:translate-y-1 z-10"
            onClick={() => {
              game.increaseResourceClick({
                cookies: game.getClickResourceGeneration(),
              });
              setState((prevState) => !prevState);
            }}
          >
            <Image
              className=" drop-shadow-2xl contrast-100"
              src={`/cookie.png`}
              alt="cookie"
              width={500}
              height={500}
            />
          </button>
        </div>
        <Toaster />
      </div>
      <div
        className=" flex flex-col col-span-2 overflow-y-auto mr-1"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <h2 className="text-center bg-zinc-700 text-white py-4  text-xl">
          Upgrades{" "}
        </h2>
        <Upgrade game={game} setState={setState} />
        <Buildings game={game} setState={setState} />
      </div>
    </div>
  );
}

export default Gameloop;
