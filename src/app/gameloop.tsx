"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import Clicker, { Resource } from "./lib/Cliker";

function Gameloop() {
  const [state, setState] = useState(0);
  const [clickMultiplier, setClickMultiplier] = useState(1);
  const [cookiesPerSecond, setCookiesPerSecond] = useState(1);
  const [grandmas, setGrandmas] = useState(0);
  const [grandmaCPS, setGrandmaCPS] = useState(5);
  const baseGrandmaPrice = 100;
  const baseGrandmaCPSPrice = 100;
  const baseMultiplierPrice = 100;
  const baseCPSPrice = 100;
  const game = useMemo(() => new Clicker(), []);
  useEffect(() => {
    const timer = setInterval(() => {
      game.increaseResource(game.getPassiveResourceGeneration());
      setState(
        (prevState) =>
          prevState + (cookiesPerSecond + grandmas * grandmaCPS) / 5
      );
    }, 1000);

    // This will clear Timer on unmount
    return () => {
      clearInterval(timer);
    };
  }, [cookiesPerSecond, grandmaCPS, grandmas, game]);

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
            setState((prevState) => prevState + 1);
          }}
        >
          <Image src={`/cookie.jpg`} alt="cookie" width={200} height={200} />
        </button>
      </div>
      <div className="flex flex-col">
        <div>Click Multiplier :{clickMultiplier}</div>

        <button
          onClick={() => {
            if (state >= baseMultiplierPrice * clickMultiplier) {
              setState(
                (prevState) => prevState - baseMultiplierPrice * clickMultiplier
              );
              setClickMultiplier((prevState) => prevState + 1);
            }
          }}
        >
          Buy Click Modifier get 2x more cookies per click :{" "}
          {baseMultiplierPrice * clickMultiplier}
        </button>
        <button
          onClick={() => {
            if (state >= baseCPSPrice * cookiesPerSecond) {
              setState(
                (prevState) => prevState - baseCPSPrice * cookiesPerSecond
              );
              setCookiesPerSecond((prevState) => prevState * 2);
            }
          }}
        >
          Double Cookie Per Second Price : {baseCPSPrice * cookiesPerSecond}
        </button>
        <div>
          <button
            onClick={() => {
              if (
                state >=
                baseGrandmaPrice * (grandmas !== 0 ? grandmas + 1 : 1)
              ) {
                setState(
                  (prevState) =>
                    prevState -
                    baseGrandmaPrice * (grandmas !== 0 ? grandmas + 1 : 1)
                );
                setGrandmas((prevState) => prevState + 1);
              }
            }}
          >
            Buy Grandma Price:{" "}
            {baseGrandmaPrice * (grandmas !== 0 ? grandmas + 1 : 1)}
          </button>
          <div>Grandmas : {grandmas}</div>
          <div>Grandma CPS : {grandmaCPS}</div>
          <button
            onClick={() => {
              if (state >= baseGrandmaCPSPrice * (grandmaCPS / 5)) {
                setState(
                  (prevState) =>
                    prevState - baseGrandmaCPSPrice * (grandmaCPS / 5)
                );
                setGrandmaCPS((prevState) => prevState * 2);
              }
            }}
          >
            Double Grandma CPS Price: {(grandmaCPS / 5) * baseGrandmaCPSPrice}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gameloop;
