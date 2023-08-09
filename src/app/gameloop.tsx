"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import Clicker, { Resource } from "./lib/Cliker2";
import { NumberFormatter } from "./lib/NumberFormater";
import { SaveType } from "./lib/ui";

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
    <div className="flex gap-7 justify-center items-center min-h-screen my-4  ">
      {" "}
      {/* bg-black text-white // Dev Dark Mode to Save my eyes*/}
      <div className="flex justify-center items-center flex-col gap-4">
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
      <div className="flex flex-col gap-3 max-h-screen">
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
                {upgrade.name}({upgrade.type}) Cost :{" "}
                {numbers.format(upgrade.cost.cookies)}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 overflow-y-auto">
          <div className="flex flex-col border border-cyan-500 p-5 rounded-xl">
            <div className="flex items-center gap-7">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <div>Cursors: {game.autoClicker.getStructureAmount()}</div>
                  {game.autoClicker.getStructureAmount() > 0 && (
                    <div>
                      Cursor CPS:{" "}
                      {numbers.format(game.autoClicker.getBuildingCPS())}
                    </div>
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
                    <div>
                      Grandmas CPS:{" "}
                      {numbers.format(game.grandma.getBuildingCPS())}
                    </div>
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
                    <div>
                      Farm CPS: {numbers.format(game.farm.getBuildingCPS())}
                    </div>
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
          <div className="flex flex-col border border-cyan-500 p-5 rounded-xl">
            <div className="flex items-center gap-7">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <div>Mines: {game.mine.getStructureAmount()}</div>
                  {game.mine.getStructureAmount() > 0 && (
                    <div>
                      Mine CPS: {numbers.format(game.mine.getBuildingCPS())}
                    </div>
                  )}
                  <button
                    className=" active:translate-y-1 hover:-translate-y-1 px-3 py-2 rounded-lg bg-pink-300"
                    onClick={() => {
                      if (game.mine.canBuyStructure(game.get_resources())) {
                        game.buyMine();
                        setState((prevState) => !prevState);
                      }
                    }}
                  >
                    Buy Mine cost: {game.mine.getStructureCostString()}
                  </button>
                </div>
              </div>
              <div>
                <Image src={`/mine.png`} alt="mine" width={200} height={300} />
              </div>
            </div>
          </div>
          <div className="flex flex-col border border-cyan-500 p-5 rounded-xl">
            <div className="flex items-center gap-7">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <div>Factorys: {game.factory.getStructureAmount()}</div>
                  {game.factory.getStructureAmount() > 0 && (
                    <div>
                      Factory CPS:{" "}
                      {numbers.format(game.factory.getBuildingCPS())}
                    </div>
                  )}
                  <button
                    className=" active:translate-y-1 hover:-translate-y-1 px-3 py-2 rounded-lg bg-pink-300"
                    onClick={() => {
                      if (game.factory.canBuyStructure(game.get_resources())) {
                        game.buyFactory();
                        setState((prevState) => !prevState);
                      }
                    }}
                  >
                    Buy Factory cost:{" "}
                    {numbers.format(game.factory.getStructureCost().cookies)}
                  </button>
                </div>
              </div>
              <div>
                <Image
                  src={`/factory.jpg`}
                  alt="factory"
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
                  <div>Banks: {game.bank.getStructureAmount()}</div>
                  {game.bank.getStructureAmount() > 0 && (
                    <div>
                      Banks CPS: {numbers.format(game.bank.getBuildingCPS())}
                    </div>
                  )}
                  <button
                    className=" active:translate-y-1 hover:-translate-y-1 px-3 py-2 rounded-lg bg-pink-300"
                    onClick={() => {
                      if (game.bank.canBuyStructure(game.get_resources())) {
                        game.buyBank();
                        setState((prevState) => !prevState);
                      }
                    }}
                  >
                    Buy Bank cost:{" "}
                    {numbers.format(game.bank.getStructureCost().cookies)}
                  </button>
                </div>
              </div>
              <div>
                <Image
                  className="w-48 "
                  src={`/bank.jpg`}
                  alt="bank"
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
                  <div>Temple: {game.temple.getStructureAmount()}</div>
                  {game.temple.getStructureAmount() > 0 && (
                    <div>
                      Temple CPS: {numbers.format(game.temple.getBuildingCPS())}
                    </div>
                  )}
                  <button
                    className=" active:translate-y-1 hover:-translate-y-1 px-3 py-2 rounded-lg bg-pink-300"
                    onClick={() => {
                      if (game.temple.canBuyStructure(game.get_resources())) {
                        game.buyBuilding("temple", 1);
                        setState((prevState) => !prevState);
                      }
                    }}
                  >
                    Buy Temple cost:{" "}
                    {numbers.format(game.temple.getStructureCost().cookies)}
                  </button>
                </div>
              </div>
              <div>
                <Image
                  className="w-48 "
                  src={`/temple.png`}
                  alt="temple"
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
                  <div>
                    Wizard Tower: {game.wizardTower.getStructureAmount()}
                  </div>
                  {game.wizardTower.getStructureAmount() > 0 && (
                    <div>
                      Wizard Tower CPS:{" "}
                      {numbers.format(game.wizardTower.getBuildingCPS())}
                    </div>
                  )}
                  <button
                    className=" active:translate-y-1 hover:-translate-y-1 px-3 py-2 rounded-lg bg-pink-300"
                    onClick={() => {
                      if (
                        game.wizardTower.canBuyStructure(game.get_resources())
                      ) {
                        game.buyBuilding("wizardTower", 1);
                        setState((prevState) => !prevState);
                      }
                    }}
                  >
                    Buy Wizard Tower cost:{" "}
                    {numbers.format(
                      game.wizardTower.getStructureCost().cookies
                    )}
                  </button>
                </div>
              </div>
              <div>
                <Image
                  className="w-48 "
                  src={`/wizardtower.png`}
                  alt="wizardTower"
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
                  <div>
                    Shipment Tower: {game.shipment.getStructureAmount()}
                  </div>
                  {game.shipment.getStructureAmount() > 0 && (
                    <div>
                      Shipment Tower CPS:{" "}
                      {numbers.format(game.shipment.getBuildingCPS())}
                    </div>
                  )}
                  <button
                    className=" active:translate-y-1 hover:-translate-y-1 px-3 py-2 rounded-lg bg-pink-300"
                    onClick={() => {
                      if (game.shipment.canBuyStructure(game.get_resources())) {
                        game.buyBuilding("shipment", 1);
                        setState((prevState) => !prevState);
                      }
                    }}
                  >
                    Buy Shipment Tower cost:{" "}
                    {numbers.format(game.shipment.getStructureCost().cookies)}
                  </button>
                </div>
              </div>
              <div>
                <Image
                  className="w-48 "
                  src={`/shipment.png`}
                  alt="shipment"
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
                  <div>
                    Alchemy Lab : {game.alchemyLab.getStructureAmount()}
                  </div>
                  {game.alchemyLab.getStructureAmount() > 0 && (
                    <div>
                      Alchemy Lab CPS:{" "}
                      {numbers.format(game.alchemyLab.getBuildingCPS())}
                    </div>
                  )}
                  <button
                    className=" active:translate-y-1 hover:-translate-y-1 px-3 py-2 rounded-lg bg-pink-300"
                    onClick={() => {
                      if (
                        game.alchemyLab.canBuyStructure(game.get_resources())
                      ) {
                        game.buyBuilding("alchemyLab", 1);
                        setState((prevState) => !prevState);
                      }
                    }}
                  >
                    Buy Alchemy Lab cost:{" "}
                    {numbers.format(game.alchemyLab.getStructureCost().cookies)}
                  </button>
                </div>
              </div>
              <div>
                <Image
                  className="w-48 "
                  src={`/alchemylab.png`}
                  alt="alchemyLab"
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
                  <div>Portal : {game.portal.getStructureAmount()}</div>
                  {game.portal.getStructureAmount() > 0 && (
                    <div>
                      Portal CPS: {numbers.format(game.portal.getBuildingCPS())}
                    </div>
                  )}
                  <button
                    className=" active:translate-y-1 hover:-translate-y-1 px-3 py-2 rounded-lg bg-pink-300"
                    onClick={() => {
                      if (game.portal.canBuyStructure(game.get_resources())) {
                        game.buyBuilding("portal", 1);
                        setState((prevState) => !prevState);
                      }
                    }}
                  >
                    Buy Portal cost:{" "}
                    {numbers.format(game.portal.getStructureCost().cookies)}
                  </button>
                </div>
              </div>
              <div>
                <Image
                  className="w-48 "
                  src={`/portal.jpeg`}
                  alt="Portal"
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
                  <div>
                    Time Machine : {game.timeMachine.getStructureAmount()}
                  </div>
                  {game.timeMachine.getStructureAmount() > 0 && (
                    <div>
                      Time Machine CPS:{" "}
                      {numbers.format(game.timeMachine.getBuildingCPS())}
                    </div>
                  )}
                  <button
                    className=" active:translate-y-1 hover:-translate-y-1 px-3 py-2 rounded-lg bg-pink-300"
                    onClick={() => {
                      if (
                        game.timeMachine.canBuyStructure(game.get_resources())
                      ) {
                        game.buyBuilding("timeMachine", 1);
                        setState((prevState) => !prevState);
                      }
                    }}
                  >
                    Buy Time Machine cost:{" "}
                    {numbers.format(
                      game.timeMachine.getStructureCost().cookies
                    )}
                  </button>
                </div>
              </div>
              <div>
                <Image
                  className="w-48 "
                  src={`/timemachine.png`}
                  alt="Time Machine"
                  width={200}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gameloop;
