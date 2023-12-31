import Clicker from "@/app/lib/Cliker";
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
        <HoverCardContent align="start" className="w-fit">
          <div>
            Cursors CPS: {numbers.format(game.autoClicker.getBuildingCPS())} |{" "}
            {(
              (game.autoClicker.getBuildingCPS() /
                game.getPassiveResourceGeneration()) *
              100
            ).toFixed(2)}
            %
          </div>
          <div>
            Cursor CPS:{" "}
            {numbers.format(game.autoClicker.getSingleBuildingCPS())} x1
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
        <HoverCardContent align="start" className="w-fit">
          <div>
            Grandmas CPS: {numbers.format(game.grandma.getBuildingCPS())} |{" "}
            {(
              (game.grandma.getBuildingCPS() /
                game.getPassiveResourceGeneration()) *
              100
            ).toFixed(2)}
            %
          </div>
          <div>
            Grandma CPS: {numbers.format(game.grandma.getSingleBuildingCPS())}{" "}
            x1
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
        <HoverCardContent align="start" className="w-fit">
          <div>
            Farms CPS: {numbers.format(game.farm.getBuildingCPS())} |{" "}
            {(
              (game.farm.getBuildingCPS() /
                game.getPassiveResourceGeneration()) *
              100
            ).toFixed(2)}
            %
          </div>
          <div>
            Farm CPS: {numbers.format(game.farm.getSingleBuildingCPS())} x1
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
        <HoverCardContent align="start" className="w-fit">
          <div>
            Mines CPS: {numbers.format(game.mine.getBuildingCPS())} |{" "}
            {(
              (game.mine.getBuildingCPS() /
                game.getPassiveResourceGeneration()) *
              100
            ).toFixed(2)}
            %
          </div>
          <div>
            Mine CPS: {numbers.format(game.mine.getSingleBuildingCPS())} x1
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
        <HoverCardContent align="start" className="w-fit">
          <div>
            Factorys CPS: {numbers.format(game.factory.getBuildingCPS())} |{" "}
            {(
              (game.factory.getBuildingCPS() /
                game.getPassiveResourceGeneration()) *
              100
            ).toFixed(2)}
            %
          </div>
          <div>
            Factory CPS: {numbers.format(game.factory.getSingleBuildingCPS())}{" "}
            x1
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
        <HoverCardContent align="start" className="w-fit">
          <div>
            Banks CPS: {numbers.format(game.bank.getBuildingCPS())} |{" "}
            {(
              (game.bank.getBuildingCPS() /
                game.getPassiveResourceGeneration()) *
              100
            ).toFixed(2)}
            %
          </div>
          <div>
            bank CPS: {numbers.format(game.bank.getSingleBuildingCPS())} x1
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
        <HoverCardContent align="start" className="w-fit">
          <div>
            Temples CPS: {numbers.format(game.temple.getBuildingCPS())} |{" "}
            {(
              (game.temple.getBuildingCPS() /
                game.getPassiveResourceGeneration()) *
              100
            ).toFixed(2)}
            %
          </div>
          <div>
            Temple CPS: {numbers.format(game.temple.getSingleBuildingCPS())} x1
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
        <HoverCardContent align="start" className="w-fit">
          <div>
            WizardTowers CPS:{" "}
            {numbers.format(game.wizardTower.getBuildingCPS())} |{" "}
            {(
              (game.wizardTower.getBuildingCPS() /
                game.getPassiveResourceGeneration()) *
              100
            ).toFixed(2)}
            %
          </div>
          <div>
            WizardTower CPS:{" "}
            {numbers.format(game.wizardTower.getSingleBuildingCPS())} x1
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
        <HoverCardContent align="start" className="w-fit">
          <div>
            Shipments CPS: {numbers.format(game.shipment.getBuildingCPS())} |{" "}
            {(
              (game.shipment.getBuildingCPS() /
                game.getPassiveResourceGeneration()) *
              100
            ).toFixed(2)}
            %
          </div>
          <div>
            Shipment CPS: {numbers.format(game.shipment.getSingleBuildingCPS())}{" "}
            x1
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
        <HoverCardContent align="start" className="w-fit">
          <div>
            Alchemy Labs CPS: {numbers.format(game.alchemyLab.getBuildingCPS())}{" "}
            |{" "}
            {(
              (game.alchemyLab.getBuildingCPS() /
                game.getPassiveResourceGeneration()) *
              100
            ).toFixed(2)}
            %
          </div>
          <div>
            Alchemy Lab:{" "}
            {numbers.format(game.alchemyLab.getSingleBuildingCPS())} x1
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
        <HoverCardContent align="start" className="w-fit">
          <div>
            Portals CPS: {numbers.format(game.portal.getBuildingCPS())} |{" "}
            {(
              (game.portal.getBuildingCPS() /
                game.getPassiveResourceGeneration()) *
              100
            ).toFixed(2)}
            %
          </div>
          <div>
            Portal: {numbers.format(game.portal.getSingleBuildingCPS())} x1
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
        <HoverCardContent align="start" className="w-fit">
          <div>
            TimeMachines CPS:{" "}
            {numbers.format(game.timeMachine.getBuildingCPS())} |{" "}
            {(
              (game.timeMachine.getBuildingCPS() /
                game.getPassiveResourceGeneration()) *
              100
            ).toFixed(2)}
            %
          </div>
          <div>
            TimeMachine:{" "}
            {numbers.format(game.timeMachine.getSingleBuildingCPS())} x1
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
        <HoverCardContent align="start" className="w-fit">
          <div>
            AntiMatters CPS:{" "}
            {numbers.format(game.antimatterCondenser.getBuildingCPS())} |{" "}
            {(
              (game.antimatterCondenser.getBuildingCPS() /
                game.getPassiveResourceGeneration()) *
              100
            ).toFixed(2)}
            %
          </div>
          <div>
            Antimatter:{" "}
            {numbers.format(game.antimatterCondenser.getSingleBuildingCPS())} x1
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
              if (game.canBuyBuilding("prism", buyAmount)) {
                game.buyBuilding("prism", buyAmount);
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
                  src={`/prism.png`}
                  alt="farm"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-20 pt-2 col-span-2">
                <h2 className="text-2xl font-bold uppercase ">Prism</h2>
                <p className="flex gap-2 items-center">
                  x{buyAmount}
                  <FaCookie className="w-4 h-4 text-yellow-500" />
                  <span
                    className={`${
                      game.canBuyBuilding("prism", buyAmount)
                        ? "text-green-600"
                        : "text-red-400"
                    } font-bold`}
                  >
                    {numbers.format(
                      game.prism.getStructureCost(buyAmount).cookies
                    )}
                  </span>
                </p>
              </div>
              <div className="justify-self-end  text-4xl pr-8 font-bold">
                {" "}
                {game.prism.getStructureAmount()}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-fit">
          <div>
            Prisms CPS: {numbers.format(game.prism.getBuildingCPS())} |{" "}
            {(
              (game.prism.getBuildingCPS() /
                game.getPassiveResourceGeneration()) *
              100
            ).toFixed(2)}
            %
          </div>
          <div>
            Prism: {numbers.format(game.prism.getSingleBuildingCPS())} x1
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
              if (game.canBuyBuilding("chancemaker", buyAmount)) {
                game.buyBuilding("chancemaker", buyAmount);
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
                  src={`/chance.png`}
                  alt="farm"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-20 pt-2 col-span-2">
                <h2 className="text-2xl font-bold uppercase ">ChanceMaker</h2>
                <p className="flex gap-2 items-center">
                  x{buyAmount}
                  <FaCookie className="w-4 h-4 text-yellow-500" />
                  <span
                    className={`${
                      game.canBuyBuilding("chancemaker", buyAmount)
                        ? "text-green-600"
                        : "text-red-400"
                    } font-bold`}
                  >
                    {numbers.format(
                      game.chanceMaker.getStructureCost(buyAmount).cookies
                    )}
                  </span>
                </p>
              </div>
              <div className="justify-self-end  text-4xl pr-8 font-bold">
                {" "}
                {game.chanceMaker.getStructureAmount()}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-fit">
          <div>
            ChanceMakers CPS:{" "}
            {numbers.format(game.chanceMaker.getBuildingCPS())} |{" "}
            {(
              (game.chanceMaker.getBuildingCPS() /
                game.getPassiveResourceGeneration()) *
              100
            ).toFixed(2)}
            %
          </div>
          <div>
            ChanceMaker:{" "}
            {numbers.format(game.chanceMaker.getSingleBuildingCPS())} x1
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
              if (game.canBuyBuilding("fractalEngine", buyAmount)) {
                game.buyBuilding("fractalEngine", buyAmount);
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
                  src={`/fractal.png`}
                  alt="fractal"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-20 pt-2 col-span-2">
                <h2 className="text-2xl font-bold uppercase ">FractalEngine</h2>
                <p className="flex gap-2 items-center">
                  x{buyAmount}
                  <FaCookie className="w-4 h-4 text-yellow-500" />
                  <span
                    className={`${
                      game.canBuyBuilding("fractalEngine", buyAmount)
                        ? "text-green-600"
                        : "text-red-400"
                    } font-bold`}
                  >
                    {numbers.format(
                      game.fractalEngine.getStructureCost(buyAmount).cookies
                    )}
                  </span>
                </p>
              </div>
              <div className="justify-self-end  text-4xl pr-8 font-bold">
                {" "}
                {game.fractalEngine.getStructureAmount()}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-fit">
          <div>
            FractalEngines CPS:{" "}
            {numbers.format(game.fractalEngine.getBuildingCPS())} |{" "}
            {(
              (game.fractalEngine.getBuildingCPS() /
                game.getPassiveResourceGeneration()) *
              100
            ).toFixed(2)}
            %
          </div>
          <div>
            FractalEngine:{" "}
            {numbers.format(game.fractalEngine.getSingleBuildingCPS())} x1
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
              if (game.canBuyBuilding("javascriptConsole", buyAmount)) {
                game.buyBuilding("javascriptConsole", buyAmount);
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
                  src={`/typescript.png`}
                  alt="javascriptConsole"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-20 pt-2 col-span-2">
                <h2 className="text-2xl font-bold uppercase ">
                  JavaScriptCons
                </h2>
                <p className="flex gap-2 items-center">
                  x{buyAmount}
                  <FaCookie className="w-4 h-4 text-yellow-500" />
                  <span
                    className={`${
                      game.canBuyBuilding("javascriptConsole", buyAmount)
                        ? "text-green-600"
                        : "text-red-400"
                    } font-bold`}
                  >
                    {numbers.format(
                      game.javascriptConsole.getStructureCost(buyAmount).cookies
                    )}
                  </span>
                </p>
              </div>
              <div className="justify-self-end  text-4xl pr-8 font-bold">
                {" "}
                {game.javascriptConsole.getStructureAmount()}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-fit">
          <div>
            JavaScriptConsoles CPS:{" "}
            {numbers.format(game.javascriptConsole.getBuildingCPS())} |{" "}
            {(
              (game.javascriptConsole.getBuildingCPS() /
                game.getPassiveResourceGeneration()) *
              100
            ).toFixed(2)}
            %
          </div>
          <div>
            JavaScriptConsole:{" "}
            {numbers.format(game.javascriptConsole.getSingleBuildingCPS())} x1
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
              if (game.canBuyBuilding("idleverse", buyAmount)) {
                game.buyBuilding("idleverse", buyAmount);
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
                  src={`/idelverse.jpg`}
                  alt="idleverse"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-20 pt-2 col-span-2">
                <h2 className="text-2xl font-bold uppercase ">IdleVerse</h2>
                <p className="flex gap-2 items-center">
                  x{buyAmount}
                  <FaCookie className="w-4 h-4 text-yellow-500" />
                  <span
                    className={`${
                      game.canBuyBuilding("idleverse", buyAmount)
                        ? "text-green-600"
                        : "text-red-400"
                    } font-bold`}
                  >
                    {numbers.format(
                      game.idleverse.getStructureCost(buyAmount).cookies
                    )}
                  </span>
                </p>
              </div>
              <div className="justify-self-end  text-4xl pr-8 font-bold">
                {" "}
                {game.idleverse.getStructureAmount()}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-fit">
          <div>
            IdleVerses CPS: {numbers.format(game.idleverse.getBuildingCPS())} |{" "}
            {(
              (game.idleverse.getBuildingCPS() /
                game.getPassiveResourceGeneration()) *
              100
            ).toFixed(2)}
            %
          </div>
          <div>
            IdleVerse: {numbers.format(game.idleverse.getSingleBuildingCPS())}{" "}
            x1
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
              if (game.canBuyBuilding("cortexBaker", buyAmount)) {
                game.buyBuilding("cortexBaker", buyAmount);
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
                  src={`/cortex.png`}
                  alt="cortexBaker"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-20 pt-2 col-span-2">
                <h2 className="text-2xl font-bold uppercase ">CortexBaker</h2>
                <p className="flex gap-2 items-center">
                  x{buyAmount}
                  <FaCookie className="w-4 h-4 text-yellow-500" />
                  <span
                    className={`${
                      game.canBuyBuilding("cortexBaker", buyAmount)
                        ? "text-green-600"
                        : "text-red-400"
                    } font-bold`}
                  >
                    {numbers.format(
                      game.cortexBaker.getStructureCost(buyAmount).cookies
                    )}
                  </span>
                </p>
              </div>
              <div className="justify-self-end  text-4xl pr-8 font-bold">
                {" "}
                {game.cortexBaker.getStructureAmount()}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-fit">
          <div>
            IdleVerses CPS: {numbers.format(game.cortexBaker.getBuildingCPS())}{" "}
            |{" "}
            {(
              (game.cortexBaker.getBuildingCPS() /
                game.getPassiveResourceGeneration()) *
              100
            ).toFixed(2)}
            %
          </div>
          <div>
            IdleVerse: {numbers.format(game.cortexBaker.getSingleBuildingCPS())}{" "}
            x1
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
              if (game.canBuyBuilding("you", buyAmount)) {
                game.buyBuilding("you", buyAmount);
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
                  src={`/youfemale.jpg`}
                  alt="you"
                  width={80}
                  height={80}
                />
              </div>
              <div className="h-20 pt-2 col-span-2">
                <h2 className="text-2xl font-bold uppercase ">You</h2>
                <p className="flex gap-2 items-center">
                  x{buyAmount}
                  <FaCookie className="w-4 h-4 text-yellow-500" />
                  <span
                    className={`${
                      game.canBuyBuilding("you", buyAmount)
                        ? "text-green-600"
                        : "text-red-400"
                    } font-bold`}
                  >
                    {numbers.format(
                      game.you.getStructureCost(buyAmount).cookies
                    )}
                  </span>
                </p>
              </div>
              <div className="justify-self-end  text-4xl pr-8 font-bold">
                {" "}
                {game.you.getStructureAmount()}
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-fit">
          <div>
            Yous CPS: {numbers.format(game.you.getBuildingCPS())} |{" "}
            {(
              (game.you.getBuildingCPS() /
                game.getPassiveResourceGeneration()) *
              100
            ).toFixed(2)}
            %
          </div>
          <div>You: {numbers.format(game.you.getSingleBuildingCPS())} x1</div>
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
