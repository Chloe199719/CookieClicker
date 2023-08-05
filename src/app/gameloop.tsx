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

  return (
    <div className="flex gap-7 justify-center items-center min-h-screen bg-black text-white ">
      <div className="flex justify-center items-center flex-col gap-4">
        <div>
          <div>Cookie {game.get_string_Number()}</div>
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
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col border border-cyan-500 p-5 rounded-xl">
          <div className="flex items-center gap-7">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <div>
                  AutoClicker Cursors: {game.autoClicker.getStructureAmount()}
                </div>
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
              <div className="flex flex-col gap-2">
                <div>
                  Auto Click Upgrade: {game.autoClicker.getStructureUpgrade()}{" "}
                </div>
                <button
                  className=" active:translate-y-1 hover:-translate-y-1 px-3 py-2 rounded-lg bg-pink-200"
                  onClick={() => {
                    if (
                      game.autoClicker.canBuyStructureUpgrade(
                        game.get_resources()
                      )
                    ) {
                      game.buyAutoClickerUpgrade();
                      setState((prevState) => !prevState);
                    }
                  }}
                >
                  Buy Upgrade cost :{" "}
                  {game.autoClicker.getStructureUpgradeCost()}
                </button>
              </div>
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
              <div className="flex flex-col gap-2">
                <div>
                  Grandma Upgrades: {game.grandma.getStructureUpgrade()}{" "}
                </div>
                <button
                  className=" active:translate-y-1 hover:-translate-y-1 px-3 py-2 rounded-lg bg-pink-300"
                  onClick={() => {
                    if (
                      game.grandma.canBuyStructureUpgrade(game.get_resources())
                    ) {
                      game.buyGrandmaUpgrade();
                      setState((prevState) => !prevState);
                    }
                  }}
                >
                  Buy Upgrade cost : {game.grandma.getStructureUpgradeCost()}
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
      </div>
    </div>
  );
}

export default Gameloop;
