import Clicker from "@/app/lib/Cliker2";
import { NumberFormatter } from "@/app/lib/NumberFormater";
import Image from "next/image";
import { useState } from "react";
import { FaCookie } from "react-icons/fa";
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
      <div className="flex gap-5 justify-evenly p-1 items-center  text-white bg-gray-800">
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
      <HoverCard>
        <HoverCardTrigger>
          {" "}
          <div
            onClick={() => {
              if (game.canBuyBuilding("bank", buyAmount)) {
                game.buyBuilding("bank", buyAmount);
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
                  src={`/bank.jpg`}
                  alt="farm"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-20 pt-2 col-span-2">
                <h2 className="text-2xl font-bold uppercase ">Bank</h2>
                <p className="flex gap-2 items-center">
                  x{buyAmount}
                  <FaCookie className="w-4 h-4 text-yellow-500" />
                  <span
                    className={`${
                      game.canBuyBuilding("bank", buyAmount)
                        ? "text-green-600"
                        : "text-red-400"
                    } font-bold`}
                  >
                    {numbers.format(
                      game.bank.getStructureCost(buyAmount).cookies
                    )}
                  </span>
                </p>
              </div>
              <div className="justify-self-end  text-4xl pr-8 font-bold">
                {" "}
                {game.bank.getStructureAmount()}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          Bank CPS: {numbers.format(game.bank.getBuildingCPS())}
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
              if (game.canBuyBuilding("temple", buyAmount)) {
                game.buyBuilding("temple", buyAmount);
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
                  src={`/temple.png`}
                  alt="farm"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-20 pt-2 col-span-2">
                <h2 className="text-2xl font-bold uppercase ">Temple</h2>
                <p className="flex gap-2 items-center">
                  x{buyAmount}
                  <FaCookie className="w-4 h-4 text-yellow-500" />
                  <span
                    className={`${
                      game.canBuyBuilding("temple", buyAmount)
                        ? "text-green-600"
                        : "text-red-400"
                    } font-bold`}
                  >
                    {numbers.format(
                      game.temple.getStructureCost(buyAmount).cookies
                    )}
                  </span>
                </p>
              </div>
              <div className="justify-self-end  text-4xl pr-8 font-bold">
                {" "}
                {game.temple.getStructureAmount()}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          Temple CPS: {numbers.format(game.temple.getBuildingCPS())}
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
              if (game.canBuyBuilding("wizardTower", buyAmount)) {
                game.buyBuilding("wizardTower", buyAmount);
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
                  src={`/wizardtower.png`}
                  alt="farm"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-20 pt-2 col-span-2">
                <h2 className="text-2xl font-bold uppercase ">Wizard Tower</h2>
                <p className="flex gap-2 items-center">
                  x{buyAmount}
                  <FaCookie className="w-4 h-4 text-yellow-500" />
                  <span
                    className={`${
                      game.canBuyBuilding("wizardTower", buyAmount)
                        ? "text-green-600"
                        : "text-red-400"
                    } font-bold`}
                  >
                    {numbers.format(
                      game.wizardTower.getStructureCost(buyAmount).cookies
                    )}
                  </span>
                </p>
              </div>
              <div className="justify-self-end  text-4xl pr-8 font-bold">
                {" "}
                {game.wizardTower.getStructureAmount()}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          Wizard Tower CPS: {numbers.format(game.wizardTower.getBuildingCPS())}
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
              if (game.canBuyBuilding("shipment", buyAmount)) {
                game.buyBuilding("shipment", buyAmount);
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
                  src={`/shipment.png`}
                  alt="farm"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-20 pt-2 col-span-2">
                <h2 className="text-2xl font-bold uppercase ">Shipment</h2>
                <p className="flex gap-2 items-center">
                  x{buyAmount}
                  <FaCookie className="w-4 h-4 text-yellow-500" />
                  <span
                    className={`${
                      game.canBuyBuilding("shipment", buyAmount)
                        ? "text-green-600"
                        : "text-red-400"
                    } font-bold`}
                  >
                    {numbers.format(
                      game.shipment.getStructureCost(buyAmount).cookies
                    )}
                  </span>
                </p>
              </div>
              <div className="justify-self-end  text-4xl pr-8 font-bold">
                {" "}
                {game.shipment.getStructureAmount()}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          Shipment CPS: {numbers.format(game.shipment.getBuildingCPS())}
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
              if (game.canBuyBuilding("alchemyLab", buyAmount)) {
                game.buyBuilding("alchemyLab", buyAmount);
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
                  src={`/alchemylab.png`}
                  alt="farm"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-20 pt-2 col-span-2">
                <h2 className="text-2xl font-bold uppercase ">Alchemy Lab</h2>
                <p className="flex gap-2 items-center">
                  x{buyAmount}
                  <FaCookie className="w-4 h-4 text-yellow-500" />
                  <span
                    className={`${
                      game.canBuyBuilding("alchemyLab", buyAmount)
                        ? "text-green-600"
                        : "text-red-400"
                    } font-bold`}
                  >
                    {numbers.format(
                      game.alchemyLab.getStructureCost(buyAmount).cookies
                    )}
                  </span>
                </p>
              </div>
              <div className="justify-self-end  text-4xl pr-8 font-bold">
                {" "}
                {game.alchemyLab.getStructureAmount()}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          Alchemy Lab CPS: {numbers.format(game.alchemyLab.getBuildingCPS())}
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
              if (game.canBuyBuilding("portal", buyAmount)) {
                game.buyBuilding("portal", buyAmount);
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
                  src={`/portal.jpeg`}
                  alt="farm"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-20 pt-2 col-span-2">
                <h2 className="text-2xl font-bold uppercase ">Portal</h2>
                <p className="flex gap-2 items-center">
                  x{buyAmount}
                  <FaCookie className="w-4 h-4 text-yellow-500" />
                  <span
                    className={`${
                      game.canBuyBuilding("portal", buyAmount)
                        ? "text-green-600"
                        : "text-red-400"
                    } font-bold`}
                  >
                    {numbers.format(
                      game.portal.getStructureCost(buyAmount).cookies
                    )}
                  </span>
                </p>
              </div>
              <div className="justify-self-end  text-4xl pr-8 font-bold">
                {" "}
                {game.portal.getStructureAmount()}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          Portal CPS: {numbers.format(game.portal.getBuildingCPS())}
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
              if (game.canBuyBuilding("timeMachine", buyAmount)) {
                game.buyBuilding("timeMachine", buyAmount);
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
                  src={`/timemachine.png`}
                  alt="farm"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-20 pt-2 col-span-2">
                <h2 className="text-2xl font-bold uppercase ">Time Machine</h2>
                <p className="flex gap-2 items-center">
                  x{buyAmount}
                  <FaCookie className="w-4 h-4 text-yellow-500" />
                  <span
                    className={`${
                      game.canBuyBuilding("timeMachine", buyAmount)
                        ? "text-green-600"
                        : "text-red-400"
                    } font-bold`}
                  >
                    {numbers.format(
                      game.timeMachine.getStructureCost(buyAmount).cookies
                    )}
                  </span>
                </p>
              </div>
              <div className="justify-self-end  text-4xl pr-8 font-bold">
                {" "}
                {game.timeMachine.getStructureAmount()}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          Time Machine CPS: {numbers.format(game.timeMachine.getBuildingCPS())}
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
              if (game.canBuyBuilding("antimatterCondenser", buyAmount)) {
                game.buyBuilding("antimatterCondenser", buyAmount);
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
                  src={`/antimatter.png`}
                  alt="farm"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-20 pt-2 col-span-2">
                <h2 className="text-2xl font-bold uppercase ">AntiMatter</h2>
                <p className="flex gap-2 items-center">
                  x{buyAmount}
                  <FaCookie className="w-4 h-4 text-yellow-500" />
                  <span
                    className={`${
                      game.canBuyBuilding("antimatterCondenser", buyAmount)
                        ? "text-green-600"
                        : "text-red-400"
                    } font-bold`}
                  >
                    {numbers.format(
                      game.antimatterCondenser.getStructureCost(buyAmount)
                        .cookies
                    )}
                  </span>
                </p>
              </div>
              <div className="justify-self-end  text-4xl pr-8 font-bold">
                {" "}
                {game.antimatterCondenser.getStructureAmount()}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          AntiMatter CPS:{" "}
          {numbers.format(game.antimatterCondenser.getBuildingCPS())}
        </HoverCardContent>
      </HoverCard>
      <Image
        className="w-full h-3 "
        src={`/stuff.jpg`}
        alt="grandma"
        width={200}
        height={30}
      />
    </div>
  );
}
export default Buildings;
