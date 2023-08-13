"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import Clicker, { Resource } from "./lib/Cliker2";
import { NumberFormatter } from "./lib/NumberFormater";
import { SaveType } from "./lib/ui";
import { GiArrowCursor } from "react-icons/gi";
import Upgrade from "@/components/upgrade";
import Buildings from "@/components/buildings";
function Gameloop() {
  const [state, setState] = useState(false);

  let game = useMemo(() => new Clicker(), []);
  useEffect(() => {
    const timer = setInterval(() => {
      game.increaseResource({
        cookies: game.getPassiveResourceGeneration() / 5,
      });
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
    if (!x?.timeMachine) {
      return;
    }
    game.LoadGame(x);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const numbers = NumberFormatter;
  return (
    <div className="grid grid-cols-8 flex-1 gap-7 justify-center items-center">
      {" "}
      {/* bg-black text-white // Dev Dark Mode to Save my eyes*/}
      <div className="flex justify-center items-center flex-col gap-4 col-span-6">
        <div>
          <div className="flex flex-col">
            Cookie {numbers.format(game.get_resources().cookies)} | Total CPS:{" "}
            {numbers.format(game.getPassiveResourceGeneration())}
            <div>
              Life Time Cookies Baked:{" "}
              {numbers.format(game.get_lifeTimeCookies().cookies)}
            </div>
            <button
              className="p2 px-3 bg-red-400 "
              onClick={() => {
                game.increaseResource({ cookies: 100 });
                setState((prevState) => !prevState);
              }}
            >
              Add 100 (dev Only)
            </button>{" "}
            <button
              className="p2 px-3 bg-red-400 "
              onClick={() => {
                game.increaseResource({ cookies: 1000 });
                setState((prevState) => !prevState);
              }}
            >
              Add 1000 (dev Only){" "}
            </button>
            <button
              className="p2 px-3 bg-red-400 "
              onClick={() => {
                game.increaseResource({ cookies: 10000 });
                setState((prevState) => !prevState);
              }}
            >
              Add 10000 (dev Only){" "}
            </button>
            <button
              className="p2 px-3 bg-red-400 "
              onClick={() => {
                game.increaseResource({ cookies: 100000 });
                setState((prevState) => !prevState);
              }}
            >
              Add 100000 (dev Only){" "}
            </button>
            <button
              className="p2 px-3 bg-red-400 "
              onClick={() => {
                game.increaseResource({ cookies: 1000000 });
                setState((prevState) => !prevState);
              }}
            >
              Add 1000000 (dev Only){" "}
            </button>
            <button
              className="p2 px-3 bg-red-400 "
              onClick={() => {
                game.increaseResource({ cookies: 100000000 });
                setState((prevState) => !prevState);
              }}
            >
              Add 100000000 (dev Only){" "}
            </button>
            <button
              className="p2 px-3 bg-red-400 "
              onClick={() => {
                game.increaseResource({ cookies: 100000000000000 });
                setState((prevState) => !prevState);
              }}
            >
              Add 100000000000000 (dev Only){" "}
            </button>
            <button
              onClick={() => {
                localStorage.setItem("save", JSON.stringify(game.SaveGame()));
              }}
            >
              Save (unstable)
            </button>
            <button
              onClick={() => {
                let x = JSON.parse(localStorage.getItem("save")!);
                game.LoadGame(x);
              }}
            >
              Load (unstable)
            </button>
            <button
              onClick={() => {
                game.resetGame();
              }}
            >
              Reset game
            </button>
          </div>
        </div>
        <button
          className=" active:translate-y-1"
          onClick={() => {
            game.increaseResourceClick(game.getClickResourceGeneration());
            setState((prevState) => !prevState);
          }}
        >
          <Image src={`/cookie.png`} alt="cookie" width={200} height={200} />
        </button>
        <div>
          Cookies Per Click{" "}
          {game.getClickResourceGeneration().cookies.toFixed(2)}
        </div>
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
