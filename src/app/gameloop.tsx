"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import Clicker, { Resource } from "./lib/Cliker";

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
    <div className="flex gap-7 justify-center items-center min-h-screen bg-gray-700 text-slate-50">
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
      <div className="flex flex-col">
        <div>Click Multiplier (INOP) : 1</div>
        <div>
          <div>Grandmas: {game.grandma.getGrandmaAmount()}</div>
          <button
            onClick={() => {
              if (game.grandma.canBuyGrandma(game.get_resources())) {
                game.buyGrandma();
                setState((prevState) => !prevState);
              }
            }}
          >
            Buy Grandma cost: {game.grandma.getGrandmaCostString()}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gameloop;
