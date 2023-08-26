import Clicker, { AchievementType } from "@/app/lib/Cliker";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import Image from "next/image";
import { NumberFormatter } from "@/app/lib/NumberFormater";
import { FaCookie } from "react-icons/fa";
import { GiArrowCursor } from "react-icons/gi";

type Props = {
  game: Clicker;
};
function Achievements({ game }: Props) {
  const numbers = NumberFormatter;
  return (
    <Sheet>
      <SheetTrigger>
        <div className="text-lg">Achievements</div>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-gray-700 max-h-screen overflow-y-scroll  max-w-none"
      >
        <SheetHeader>
          <SheetTitle className="text-center pb-3">Achievements</SheetTitle>
        </SheetHeader>
        <div className="grid grid-cols-12 gap-2  ">
          {game.getAchievementList().map((achievement) => {
            return (
              <HoverCard key={achievement.id}>
                <HoverCardTrigger
                  className={`${
                    achievement.acquired
                      ? "border-2 border-green-400 bg-lime-100"
                      : "border-2 border-red-700 bg-red-100 "
                  } flex justify-center items-center h-[40px] `}
                >
                  <Icon achievement={achievement} />
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="flex gap-6 flex-col">
                    <div className="flex justify-between">
                      {" "}
                      <span>{achievement.name}</span>{" "}
                      <span
                        className={`${
                          achievement.acquired
                            ? " text-green-400"
                            : "text-red-300"
                        }`}
                      >
                        {achievement.acquired ? "Acquired" : "Not Acquired"}
                      </span>
                    </div>
                    <span>{achievement.description}</span>
                    <span>{numbers.format(achievement.condition)}</span>
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
export default Achievements;

type IconProps = {
  achievement: AchievementType;
};

function Icon({ achievement }: IconProps) {
  if (achievement.type === "cursor") {
    return <Image src={`/cursor.png`} alt="cursor" width={60} height={60} />;
  } else if (achievement.type === "Total") {
    return <FaCookie className="w-8 h-8 text-yellow-500" />;
  } else if (achievement.type === "Click") {
    return <GiArrowCursor className="w-8 h-8 text-black" />;
  } else if (achievement.type === "grandma") {
    return <Image src="/grandma.png" alt="grandma" width={32} height={32} />;
  } else if (achievement.type === "farm") {
    return <Image src="/farm.png" alt="farm" width={32} height={32} />;
  } else if (achievement.type === "mine") {
    return <Image src="/mine2.png" alt="mine" width={32} height={32} />;
  } else if (achievement.type === "factory") {
    return <Image src="/factory.png" alt="factory" width={32} height={32} />;
  } else if (achievement.type === "bank") {
    return (
      <Image src="/bank_icon_129525.png" alt="bank" width={32} height={32} />
    );
  } else if (achievement.type === "temple") {
    return <Image src="/temple2.png" alt="temple" width={32} height={32} />;
  } else if (achievement.type === "wizardTower") {
    return <Image src="/wizard.png" alt="wizardTower" width={32} height={32} />;
  } else if (achievement.type === "shipment") {
    return <Image src="/rocket.png" alt="shipment" width={32} height={32} />;
  } else if (achievement.type === "alchemyLab") {
    return <Image src="/lab.png" alt="alchemyLab" width={32} height={32} />;
  } else if (achievement.type === "portal") {
    return <Image src="/portal2.png" alt="portal" width={32} height={32} />;
  } else if (achievement.type === "timeMachine") {
    return (
      <Image src="/machine.png" alt="timeMachine" width={32} height={32} />
    );
  } else if (achievement.type === "antimatterCondenser") {
    return (
      <Image
        src="/antimatter.png"
        alt="antimatterCondenser"
        width={32}
        height={32}
      />
    );
  } else if (achievement.type === "prism") {
    return <Image src="/prism.png" alt="prism" width={32} height={32} />;
  } else if (achievement.type === "chancemaker") {
    return <Image src="/chance.png" alt="ChanceMaker" width={32} height={32} />;
  } else if (achievement.type === "fractalEngine") {
    return (
      <Image src="/fractal.png" alt="fractalEngine" width={32} height={32} />
    );
  } else if (achievement.type === "javascriptConsole") {
    return (
      <Image
        src="/typescript.png"
        alt="Javascript console"
        width={32}
        height={32}
      />
    );
  } else if (achievement.type === "idleverse") {
    return (
      <Image src="/idelverse.jpg" alt="Idleverse" width={32} height={32} />
    );
  } else if (achievement.type === "cortexBaker") {
    return (
      <Image src="/cortex.png" alt="Cortex Baker" width={32} height={32} />
    );
  } else if (achievement.type === "you") {
    return <Image src="/youfemale.jpg" alt="You" width={32} height={32} />;
  } else if (achievement.type === "Generation") {
    return (
      <Image
        src={`/clock.png`}
        alt="clock"
        width={60}
        height={60}
        className="h-8 w-8"
      />
    );
  } else if (achievement.type === "Purchase Upgrades") {
    return (
      <Image
        src={`/upgrade.png`}
        alt="upgrade"
        width={60}
        height={60}
        className="h-8 w-8"
      />
    );
  } else if (achievement.type === "Owned Buildings") {
    return (
      <Image
        src={`/building.jpeg`}
        alt="Building"
        width={60}
        height={60}
        className="h-8 w-8"
      />
    );
  } else {
    return (
      <Image
        src={`/placeholder.png`}
        alt="placeholder"
        width={60}
        height={60}
      />
    );
  }
}
