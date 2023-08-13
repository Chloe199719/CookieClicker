import Clicker from "@/app/lib/Cliker2";
import { NumberFormatter } from "@/app/lib/NumberFormater";
import Image from "next/image";
import { useState } from "react";
import { FaCookie } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
type Props = {
  game: Clicker;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};
function Buildings({ game, setState }: Props) {
  const [buyAmount, setBuyAmount] = useState(1);
  const numbers = NumberFormatter;
  return (
    <div className="flex flex-col text-black/50 ">
      <div className="flex gap-5 justify-evenly p-1 items-center  text-white">
        <div>
          <p className="hover:text-neutral-50 hover:font-bold">Buy</p>
          <p className="hover:text-neutral-50 hover:font-bold">Sell</p>
        </div>
        <p
          onClick={() => {
            setBuyAmount(1);
          }}
          className="hover:text-neutral-50 hover:font-bold"
        >
          1
        </p>
        <p
          onClick={() => {
            setBuyAmount(10);
          }}
          className="hover:text-neutral-50 hover:font-bold"
        >
          10
        </p>
        <p
          onClick={() => {
            setBuyAmount(100);
          }}
          className="hover:text-neutral-50 hover:font-bold"
        >
          100
        </p>
      </div>

      <HoverCard>
        <HoverCardTrigger>
          <div
            onClick={() => {
              if (game.canBuyBuilding("cursor", buyAmount)) {
                game.buyBuilding("cursor", buyAmount);
                setState((prevState) => !prevState);
              }
            }}
            className="flex flex-col border hover:-translate-y-1 active:scale-95 relative h-22"
          >
            <Image
              className=" absolute w-full h-20 "
              src={`/test4.jpg`}
              alt="grandma"
              width={200}
              height={300}
            />
            <div className="z-10  grid grid-cols-4 items-center  h-20">
              <div className="h-20 flex items-center px-3 gap-3">
                <Image
                  src={`/cursor.png`}
                  alt="grandma"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-20 pt-2 col-span-2">
                <h2 className="text-2xl font-bold uppercase "> Cursor</h2>
                <p className="flex gap-2 items-center">
                  x{buyAmount}
                  <FaCookie className="w-4 h-4 text-yellow-500" />
                  <span
                    className={`${
                      game.canBuyBuilding("cursor", buyAmount)
                        ? "text-green-600"
                        : "text-red-400"
                    } font-bold`}
                  >
                    {numbers.format(
                      game.autoClicker.getStructureCost(buyAmount).cookies
                    )}
                  </span>
                </p>
              </div>
              <div className="justify-self-end  text-4xl pr-8 font-bold">
                {" "}
                {game.autoClicker.getStructureAmount()}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <div>
            Cursor CPS: {numbers.format(game.autoClicker.getBuildingCPS())}
          </div>
        </HoverCardContent>
      </HoverCard>

      <Image
        className="w-full h-3 "
        src={`/stuff.jpg`}
        alt="grandma"
        width={200}
        height={30}
      />
      <HoverCard>
        <HoverCardTrigger>
          {" "}
          <div
            onClick={() => {
              if (game.canBuyBuilding("grandma", buyAmount)) {
                game.buyBuilding("grandma", buyAmount);
                setState((prevState) => !prevState);
              }
            }}
            className="flex flex-col border hover:-translate-y-1 active:scale-95 relative h-22"
          >
            <Image
              className=" absolute w-full h-20 "
              src={`/test4.jpg`}
              alt="grandma"
              width={200}
              height={300}
            />
            <div className="z-10  grid grid-cols-4 items-center  h-20">
              <div className="h-20 flex items-center px-3 gap-3">
                <Image
                  className="rounded-full"
                  src={`/grandma.jpg`}
                  alt="grandma"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-20 pt-2 col-span-2">
                <h2 className="text-2xl font-bold uppercase ">Grandma</h2>
                <p className="flex gap-2 items-center">
                  x{buyAmount}
                  <FaCookie className="w-4 h-4 text-yellow-500" />
                  <span
                    className={`${
                      game.canBuyBuilding("grandma", buyAmount)
                        ? "text-green-600"
                        : "text-red-400"
                    } font-bold`}
                  >
                    {numbers.format(
                      game.grandma.getStructureCost(buyAmount).cookies
                    )}
                  </span>
                </p>
              </div>
              <div className="justify-self-end  text-4xl pr-8 font-bold">
                {" "}
                {game.grandma.getStructureAmount()}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          Grandma CPS: {numbers.format(game.grandma.getBuildingCPS())}
        </HoverCardContent>
      </HoverCard>

      <Image
        className="w-full h-3 "
        src={`/stuff.jpg`}
        alt="grandma"
        width={200}
        height={30}
      />
      <HoverCard>
        <HoverCardTrigger>
          {" "}
          <div
            onClick={() => {
              if (game.canBuyBuilding("farm", buyAmount)) {
                game.buyBuilding("farm", buyAmount);
                setState((prevState) => !prevState);
              }
            }}
            className="flex flex-col border hover:-translate-y-1 active:scale-95 relative h-22"
          >
            <Image
              className=" absolute w-full h-20 "
              src={`/test4.jpg`}
              alt="grandma"
              width={200}
              height={300}
            />
            <div className="z-10  grid grid-cols-4 items-center  h-20">
              <div className="h-20 flex items-center px-3 gap-3">
                <Image
                  className="rounded-full"
                  src={`/farm.jpg`}
                  alt="farm"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-20 pt-2 col-span-2">
                <h2 className="text-2xl font-bold uppercase ">Farms</h2>
                <p className="flex gap-2 items-center">
                  x{buyAmount}
                  <FaCookie className="w-4 h-4 text-yellow-500" />
                  <span
                    className={`${
                      game.canBuyBuilding("farm", buyAmount)
                        ? "text-green-600"
                        : "text-red-400"
                    } font-bold`}
                  >
                    {numbers.format(
                      game.farm.getStructureCost(buyAmount).cookies
                    )}
                  </span>
                </p>
              </div>
              <div className="justify-self-end  text-4xl pr-8 font-bold">
                {" "}
                {game.farm.getStructureAmount()}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          Farms CPS: {numbers.format(game.farm.getBuildingCPS())}
        </HoverCardContent>
      </HoverCard>
      <Image
        className="w-full h-3 "
        src={`/stuff.jpg`}
        alt="grandma"
        width={200}
        height={30}
      />
      <HoverCard>
        <HoverCardTrigger>
          {" "}
          <div
            onClick={() => {
              if (game.canBuyBuilding("mine", buyAmount)) {
                game.buyBuilding("mine", buyAmount);
                setState((prevState) => !prevState);
              }
            }}
            className="flex flex-col border hover:-translate-y-1 active:scale-95 relative h-22"
          >
            <Image
              className=" absolute w-full h-20 "
              src={`/test4.jpg`}
              alt="grandma"
              width={200}
              height={300}
            />
            <div className="z-10  grid grid-cols-4 items-center  h-20">
              <div className="h-20 flex items-center px-3 gap-3">
                <Image
                  className="rounded-full"
                  src={`/mine.png`}
                  alt="farm"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-20 pt-2 col-span-2">
                <h2 className="text-2xl font-bold uppercase ">Mines</h2>
                <p className="flex gap-2 items-center">
                  x{buyAmount}
                  <FaCookie className="w-4 h-4 text-yellow-500" />
                  <span
                    className={`${
                      game.canBuyBuilding("mine", buyAmount)
                        ? "text-green-600"
                        : "text-red-400"
                    } font-bold`}
                  >
                    {numbers.format(
                      game.mine.getStructureCost(buyAmount).cookies
                    )}
                  </span>
                </p>
              </div>
              <div className="justify-self-end  text-4xl pr-8 font-bold">
                {" "}
                {game.mine.getStructureAmount()}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          Mines CPS: {numbers.format(game.mine.getBuildingCPS())}
        </HoverCardContent>
      </HoverCard>

      <Image
        className="w-full h-3 "
        src={`/stuff.jpg`}
        alt="grandma"
        width={200}
        height={30}
      />
      <HoverCard>
        <HoverCardTrigger>
          {" "}
          <div
            onClick={() => {
              if (game.canBuyBuilding("factory", buyAmount)) {
                game.buyBuilding("factory", buyAmount);
                setState((prevState) => !prevState);
              }
            }}
            className="flex flex-col border hover:-translate-y-1 active:scale-95 relative h-22"
          >
            <Image
              className=" absolute w-full h-20 "
              src={`/test4.jpg`}
              alt="grandma"
              width={200}
              height={300}
            />
            <div className="z-10  grid grid-cols-4 items-center  h-20">
              <div className="h-20 flex items-center px-3 gap-3">
                <Image
                  className="rounded-full"
                  src={`/factory.jpg`}
                  alt="farm"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-20 pt-2 col-span-2">
                <h2 className="text-2xl font-bold uppercase ">Factory</h2>
                <p className="flex gap-2 items-center">
                  x{buyAmount}
                  <FaCookie className="w-4 h-4 text-yellow-500" />
                  <span
                    className={`${
                      game.canBuyBuilding("factory", buyAmount)
                        ? "text-green-600"
                        : "text-red-400"
                    } font-bold`}
                  >
                    {numbers.format(
                      game.factory.getStructureCost(buyAmount).cookies
                    )}
                  </span>
                </p>
              </div>
              <div className="justify-self-end  text-4xl pr-8 font-bold">
                {" "}
                {game.factory.getStructureAmount()}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          Factory CPS: {numbers.format(game.factory.getBuildingCPS())}
        </HoverCardContent>
      </HoverCard>
      <Image
        className="w-full h-3 "
        src={`/stuff.jpg`}
        alt="grandma"
        width={200}
        height={30}
      />

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
              <div>Wizard Tower: {game.wizardTower.getStructureAmount()}</div>
              {game.wizardTower.getStructureAmount() > 0 && (
                <div>
                  Wizard Tower CPS:{" "}
                  {numbers.format(game.wizardTower.getBuildingCPS())}
                </div>
              )}
              <button
                className=" active:translate-y-1 hover:-translate-y-1 px-3 py-2 rounded-lg bg-pink-300"
                onClick={() => {
                  if (game.wizardTower.canBuyStructure(game.get_resources())) {
                    game.buyBuilding("wizardTower", 1);
                    setState((prevState) => !prevState);
                  }
                }}
              >
                Buy Wizard Tower cost:{" "}
                {numbers.format(game.wizardTower.getStructureCost().cookies)}
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
              <div>Shipment Tower: {game.shipment.getStructureAmount()}</div>
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
              <div>Alchemy Lab : {game.alchemyLab.getStructureAmount()}</div>
              {game.alchemyLab.getStructureAmount() > 0 && (
                <div>
                  Alchemy Lab CPS:{" "}
                  {numbers.format(game.alchemyLab.getBuildingCPS())}
                </div>
              )}
              <button
                className=" active:translate-y-1 hover:-translate-y-1 px-3 py-2 rounded-lg bg-pink-300"
                onClick={() => {
                  if (game.alchemyLab.canBuyStructure(game.get_resources())) {
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
              <div>Time Machine : {game.timeMachine.getStructureAmount()}</div>
              {game.timeMachine.getStructureAmount() > 0 && (
                <div>
                  Time Machine CPS:{" "}
                  {numbers.format(game.timeMachine.getBuildingCPS())}
                </div>
              )}
              <button
                className=" active:translate-y-1 hover:-translate-y-1 px-3 py-2 rounded-lg bg-pink-300"
                onClick={() => {
                  if (game.timeMachine.canBuyStructure(game.get_resources())) {
                    game.buyBuilding("timeMachine", 1);
                    setState((prevState) => !prevState);
                  }
                }}
              >
                Buy Time Machine cost:{" "}
                {numbers.format(game.timeMachine.getStructureCost().cookies)}
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
  );
}
export default Buildings;
