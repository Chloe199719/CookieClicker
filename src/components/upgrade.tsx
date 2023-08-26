import Clicker, { BuildingType } from "@/app/lib/Cliker";
import { GiArrowCursor } from "react-icons/gi";
import { FaCookie } from "react-icons/fa";
import { NumberFormatter } from "../app/lib/NumberFormater";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Image from "next/image";
type Props = {
  game: Clicker;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};
function upgrade({ game, setState }: Props) {
  const numbers = NumberFormatter;
  return (
    <div className="grid grid-cols-6 p-5  gap-1 bg-gray-900 dark:bg-gray-800  place-items-center">
      {game.getPossibleUpgradeList().map((upgrade) => {
        return (
          <TooltipProvider key={upgrade.id}>
            <Tooltip>
              <TooltipTrigger
                onClick={() => {
                  if (game.canBuyStructureUpgrade(upgrade.id, upgrade.type)) {
                    game.buyStructureUpgrade(upgrade.id, upgrade.type);
                    setState((prevState) => !prevState);
                  }
                }}
                className=" p-2 border-4 border-amber-400 hover:border-amber-500 hover:rounded-md cursor-pointer"
              >
                <CookieIcon type={upgrade.type} />
              </TooltipTrigger>
              <TooltipContent className="p-0 border-0">
                <div className="flex flex-col gap-7 w-96 p-4 bg-red-300">
                  <div className="flex justify-between text-xl">
                    <h1>{upgrade.name}</h1>
                    <p>Cost: {numbers.format(upgrade.cost.cookies)}</p>
                  </div>
                  <p className="text-lg">{upgrade.description}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
}
export default upgrade;

type Props2 = {
  type: BuildingType;
};
function CookieIcon({ type }: Props2) {
  switch (type) {
    case "kittens":
      return (
        <Image
          className="w-8 h-8"
          src="/kitten.jpg"
          alt="bank"
          width={32}
          height={32}
        />
      );
    case "flavoredCookies":
      return <FaCookie className="w-8 h-8 text-yellow-500" />;
    case "cursor":
      return <GiArrowCursor className="w-8 h-8 text-yellow-50" />;
    case "clicking":
      return <GiArrowCursor className="w-8 h-8 text-yellow-50" />;
    case "grandma":
      return <Image src="/grandma.png" alt="grandma" width={32} height={32} />;
    case "farm":
      return <Image src="/farm.png" alt="farm" width={32} height={32} />;
    case "mine":
      return <Image src="/mine2.png" alt="mine" width={32} height={32} />;
    case "factory":
      return <Image src="/factory.png" alt="factory" width={32} height={32} />;
    case "bank":
      return (
        <Image src="/bank_icon_129525.png" alt="bank" width={32} height={32} />
      );
    case "temple":
      return <Image src="/temple2.png" alt="temple" width={32} height={32} />;
    case "wizardTower":
      return (
        <Image src="/wizard.png" alt="wizardTower" width={32} height={32} />
      );
    case "shipment":
      return <Image src="/rocket.png" alt="shipment" width={32} height={32} />;
    case "alchemyLab":
      return <Image src="/lab.png" alt="alchemyLab" width={32} height={32} />;
    case "portal":
      return <Image src="/portal2.png" alt="portal" width={32} height={32} />;
    case "timeMachine":
      return (
        <Image src="/machine.png" alt="timeMachine" width={32} height={32} />
      );
    case "antimatterCondenser":
      return (
        <Image
          src="/antimatter.png"
          alt="antimatterCondenser"
          width={32}
          height={32}
        />
      );
    case "prism":
      return <Image src="/prism.png" alt="prism" width={32} height={32} />;
    case "chancemaker":
      return (
        <Image src="/chance.png" alt="ChanceMaker" width={32} height={32} />
      );
    case "fractalEngine":
      return (
        <Image src="/fractal.png" alt="fractalEngine" width={32} height={32} />
      );
    case "javascriptConsole":
      return (
        <Image
          src="/typescript.png"
          alt="Javascript console"
          width={32}
          height={32}
        />
      );
    case "idleverse":
      return (
        <Image src="/idelverse.jpg" alt="Idleverse" width={32} height={32} />
      );
    case "cortexBaker":
      return (
        <Image src="/cortex.png" alt="Cortex Baker" width={32} height={32} />
      );
    case "you":
      return <Image src="/youfemale.jpg" alt="You" width={32} height={32} />;
  }
}
