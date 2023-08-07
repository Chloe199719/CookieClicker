"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import Clicker, { Resource } from "./lib/Cliker2";

function Gameloop() {
  const [state, setState] = useState(false);

  const game = useMemo(() => new Clicker(), []);
  useEffect(() => {
    const timer = setInterval(() => {
      game.increaseResource(game.getPassiveResourceGeneration());
      setState((prevState) => !prevState);
    }, 1000);

    // This will clear Timer on unmount
    return () => {
      clearInterval(timer);
    };
  }, [game]);
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     console.log("saving");
  //     localStorage.setItem("save", JSON.stringify(game.SaveGame()));
  //   }, 1000 * 60);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // });

  return (
    <div className="flex gap-7 justify-center items-center min-h-screen bg-black text-white ">
      <div className="flex justify-center items-center flex-col gap-4">
        <div>
          <div className="flex flex-col">
            Cookie {game.get_string_Number()} | Total CPS:{" "}
            {game.getPassiveResourceGeneration().cookies.toFixed(2)}
            <button
              className="p2 px-3 bg-red-400 "
              onClick={() => {
                game.increaseResource({ cookies: 100 });
                setState((prevState) => !prevState);
              }}
            >
              Add 100 (dev Only){" "}
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
          </div>
        </div>
        <button
          className=" active:translate-y-1"
          onClick={() => {
            game.increaseResource(game.getClickResourceGeneration());
            setState((prevState) => !prevState);
          }}
        >
          <Image src={`/cookie.jpg`} alt="cookie" width={200} height={200} />
        </button>
        <div>
          Cookies Per Click{" "}
          {game.getClickResourceGeneration().cookies.toFixed(2)}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col border border-cyan-500 p-5 rounded-xl">
          <h2 className="text-center">Upgrades </h2>
          {game.getPossibleUpgradeList().map((upgrade) => {
            return (
              <button
                onClick={() => {
                  if (game.canBuyStructureUpgrade(upgrade.id, upgrade.type)) {
                    game.buyStructureUpgrade(upgrade.id, upgrade.type);
                    setState((prevState) => !prevState);
                  }
                }}
                key={upgrade.id}
              >
                {upgrade.name}({upgrade.type}) Cost : {upgrade.cost.cookies}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col border border-cyan-500 p-5 rounded-xl">
          <div className="flex items-center gap-7">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <div>Cursors: {game.autoClicker.getStructureAmount()}</div>
                {game.autoClicker.getStructureAmount() > 0 && (
                  <div>Cursor CPS: {game.autoClicker.getBuildingCPS()}</div>
                )}
                <button
                  className=" active:translate-y-1 hover:-translate-y-1 px-3 py-2 rounded-lg bg-pink-200"
                  onClick={() => {
                    if (
                      game.autoClicker.canBuyStructure(game.get_resources())
                    ) {
                      game.buyAutoClicker();
                      setState((prevState) => !prevState);
                    }
                  }}
                >
                  Buy Cursor cost: {game.autoClicker.getStructureCostString()}
                </button>
              </div>
              <div className="flex flex-col gap-2"></div>
            </div>
            <div>
              <Image
                src={`/cursor.png`}
                alt="grandma"
                width={200}
                height={300}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col border border-cyan-500 p-5 rounded-xl">
          <div className="flex items-center gap-7">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <div>Grandmas: {game.grandma.getStructureAmount()}</div>
                {game.grandma.getStructureAmount() > 0 && (
                  <div>Grandmas CPS: {game.grandma.getBuildingCPS()}</div>
                )}
                <button
                  className=" active:translate-y-1 hover:-translate-y-1 px-3 py-2 rounded-lg bg-pink-300"
                  onClick={() => {
                    if (game.grandma.canBuyStructure(game.get_resources())) {
                      game.buyGrandma();
                      setState((prevState) => !prevState);
                    }
                  }}
                >
                  Buy Grandma cost: {game.grandma.getStructureCostString()}
                </button>
              </div>
            </div>
            <div>
              <Image
                src={`/grandma.jpg`}
                alt="grandma"
                width={200}
                height={300}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col border border-cyan-500 p-5 rounded-xl">
          <div className="flex items-center gap-7">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <div>Farms: {game.farm.getStructureAmount()}</div>
                {game.farm.getStructureAmount() > 0 && (
                  <div>Farm CPS: {game.farm.getBuildingCPS()}</div>
                )}
                <button
                  className=" active:translate-y-1 hover:-translate-y-1 px-3 py-2 rounded-lg bg-pink-300"
                  onClick={() => {
                    if (game.farm.canBuyStructure(game.get_resources())) {
                      game.buyFarm();
                      setState((prevState) => !prevState);
                    }
                  }}
                >
                  Buy Farm cost: {game.farm.getStructureCostString()}
                </button>
              </div>
            </div>
            <div>
              <Image src={`/farm.jpg`} alt="farm" width={200} height={300} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gameloop;
